from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import html as html_lib
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Annotated
from datetime import datetime, timezone, timedelta
from zoneinfo import ZoneInfo
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import uuid


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Emergent managed email proxy (constant — never read from env)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]
INSIGHTS_PASSCODE = os.environ.get("INSIGHTS_PASSCODE", "bhavy2026")
DIGEST_TZ = ZoneInfo("Asia/Kolkata")

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------- Models ----------
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=4000)


ALLOWED_EVENTS = {"page_view", "resume_download"}


class TrackEvent(BaseModel):
    type: str
    meta: Optional[str] = Field(default=None, max_length=200)


# ---------- Helpers ----------
async def _send_owner_email(payload_msg: ContactMessage):
    safe_name = html_lib.escape(payload_msg.name)
    safe_email = html_lib.escape(payload_msg.email)
    safe_message = html_lib.escape(payload_msg.message)
    html_content = f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0F;padding:24px;font-family:Arial,Helvetica,sans-serif;">
      <tr><td>
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#111116;border-radius:16px;border:1px solid rgba(124,92,252,0.25);overflow:hidden;">
          <tr><td style="padding:28px 28px 8px 28px;">
            <p style="margin:0;color:#8B7CF6;font-size:12px;letter-spacing:2px;text-transform:uppercase;">New Portfolio Message</p>
            <h1 style="margin:8px 0 0 0;color:#F5F5F7;font-size:22px;">You've got a new inquiry</h1>
          </td></tr>
          <tr><td style="padding:16px 28px;">
            <p style="margin:0 0 6px 0;color:#9A9AA5;font-size:13px;">FROM</p>
            <p style="margin:0 0 16px 0;color:#F5F5F7;font-size:16px;">{safe_name} &lt;{safe_email}&gt;</p>
            <p style="margin:0 0 6px 0;color:#9A9AA5;font-size:13px;">MESSAGE</p>
            <p style="margin:0;color:#F5F5F7;font-size:15px;line-height:1.6;white-space:pre-wrap;">{safe_message}</p>
          </td></tr>
          <tr><td style="padding:20px 28px 28px 28px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;color:#6C6C7A;font-size:12px;">Sent {payload_msg.created_at} • Bhavy Agarwal Portfolio</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """
    payload = {
        "to": [OWNER_EMAIL],
        "subject": f"New portfolio message from {payload_msg.name}",
        "html": html_content,
        "from_name": EMAIL_FROM_NAME,
        "contact_email": payload_msg.email,
    }
    async with httpx.AsyncClient(timeout=30) as http_client:
        resp = await http_client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


async def _post_email(subject: str, html_content: str):
    payload = {
        "to": [OWNER_EMAIL],
        "subject": subject,
        "html": html_content,
        "from_name": EMAIL_FROM_NAME,
    }
    async with httpx.AsyncClient(timeout=30) as http_client:
        resp = await http_client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


async def build_and_send_digest(force: bool = False):
    """Summarize yesterday's activity (IST day) and email the owner."""
    now_ist = datetime.now(DIGEST_TZ)
    y_start_ist = (now_ist - timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)
    y_end_ist = now_ist.replace(hour=0, minute=0, second=0, microsecond=0)
    start_utc = y_start_ist.astimezone(timezone.utc).isoformat()
    end_utc = y_end_ist.astimezone(timezone.utc).isoformat()
    window = {"created_at": {"$gte": start_utc, "$lt": end_utc}}

    page_views = await db.events.count_documents({**window, "type": "page_view"})
    downloads = await db.events.count_documents({**window, "type": "resume_download"})
    messages = await db.contact_messages.find({**window}, {"_id": 0}).sort("created_at", -1).to_list(50)

    if not force and page_views == 0 and downloads == 0 and len(messages) == 0:
        return {"status": "skipped", "reason": "no activity", "date": y_start_ist.strftime("%Y-%m-%d")}

    day_label = y_start_ist.strftime("%A, %b %d, %Y")

    def stat_cell(value, label):
        return f"""<td width="33%" align="center" style="padding:8px;">
            <div style="background:#0f0f16;border:1px solid rgba(124,92,252,0.25);border-radius:14px;padding:18px 8px;">
              <div style="color:#F5F5F7;font-size:30px;font-weight:700;">{value}</div>
              <div style="color:#9A9AA5;font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-top:4px;">{label}</div>
            </div></td>"""

    if messages:
        msg_rows = "".join(
            f"""<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                <div style="color:#F5F5F7;font-size:14px;font-weight:600;">{html_lib.escape(m['name'])}
                  <span style="color:#8B7CF6;font-weight:400;">&lt;{html_lib.escape(m['email'])}&gt;</span></div>
                <div style="color:#9A9AA5;font-size:13px;line-height:1.5;margin-top:4px;">{html_lib.escape(m['message'][:220])}</div>
              </td></tr>"""
            for m in messages
        )
        messages_block = f"""
          <tr><td style="padding:20px 28px 6px 28px;">
            <p style="margin:0;color:#8B7CF6;font-size:12px;letter-spacing:2px;text-transform:uppercase;">New Messages ({len(messages)})</p>
          </td></tr>
          <tr><td style="padding:0 28px 12px 28px;"><table width="100%" cellpadding="0" cellspacing="0">{msg_rows}</table></td></tr>
        """
    else:
        messages_block = """
          <tr><td style="padding:16px 28px;">
            <p style="margin:0;color:#6C6C7A;font-size:13px;">No new messages yesterday.</p>
          </td></tr>
        """

    html_content = f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0F;padding:24px;font-family:Arial,Helvetica,sans-serif;">
      <tr><td>
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#111116;border-radius:16px;border:1px solid rgba(124,92,252,0.25);overflow:hidden;">
          <tr><td style="padding:28px 28px 4px 28px;">
            <p style="margin:0;color:#8B7CF6;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Daily Digest</p>
            <h1 style="margin:8px 0 0 0;color:#F5F5F7;font-size:22px;">Your portfolio yesterday</h1>
            <p style="margin:6px 0 0 0;color:#9A9AA5;font-size:13px;">{day_label}</p>
          </td></tr>
          <tr><td style="padding:18px 20px 6px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              {stat_cell(page_views, "Page Views")}
              {stat_cell(downloads, "Resume Downloads")}
              {stat_cell(len(messages), "New Messages")}
            </tr></table>
          </td></tr>
          {messages_block}
          <tr><td style="padding:16px 28px 28px 28px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;color:#6C6C7A;font-size:12px;">Bhavy Agarwal Portfolio • automated morning digest</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """

    email_id = await _post_email(f"Portfolio digest — {y_start_ist.strftime('%b %d')}", html_content)
    return {
        "status": "sent",
        "date": y_start_ist.strftime("%Y-%m-%d"),
        "totals": {"page_views": page_views, "resume_downloads": downloads, "new_messages": len(messages)},
        "email_id": email_id,
    }


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Bhavy Agarwal Portfolio API"}


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contact_messages.insert_one(msg.model_dump())

    email_id = None
    try:
        email_id = await _send_owner_email(msg)
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")

    return {"status": "success", "id": msg.id, "email_id": email_id}


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.post("/track")
async def track_event(payload: TrackEvent):
    if payload.type not in ALLOWED_EVENTS:
        raise HTTPException(status_code=422, detail="Invalid event type")
    doc = {
        "id": str(uuid.uuid4()),
        "type": payload.type,
        "meta": payload.meta,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.events.insert_one(doc)
    return {"status": "ok"}


@api_router.get("/insights")
async def get_insights(code: str):
    if code != INSIGHTS_PASSCODE:
        raise HTTPException(status_code=401, detail="Invalid passcode")

    page_views = await db.events.count_documents({"type": "page_view"})
    resume_downloads = await db.events.count_documents({"type": "resume_download"})
    contact_submissions = await db.contact_messages.count_documents({})

    recent_messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(20)
    recent_events = await db.events.find({}, {"_id": 0}).sort("created_at", -1).to_list(30)

    return {
        "totals": {
            "page_views": page_views,
            "resume_downloads": resume_downloads,
            "contact_submissions": contact_submissions,
        },
        "recent_messages": recent_messages,
        "recent_events": recent_events,
    }


@api_router.post("/digest/send")
async def send_digest(code: str, force: bool = True):
    if code != INSIGHTS_PASSCODE:
        raise HTTPException(status_code=401, detail="Invalid passcode")
    try:
        result = await build_and_send_digest(force=force)
        return result
    except httpx.HTTPStatusError as e:
        logger.error(f"Digest email failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send digest")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info("Bhavy Agarwal Portfolio API started")

scheduler = AsyncIOScheduler(timezone=DIGEST_TZ)


@app.on_event("startup")
async def start_scheduler():
    scheduler.add_job(
        build_and_send_digest,
        "cron",
        hour=8,
        minute=0,
        id="daily_digest",
        replace_existing=True,
    )
    scheduler.start()
    logger.info("Daily digest scheduler started (08:00 Asia/Kolkata)")


@app.on_event("shutdown")
async def shutdown_db_client():
    if scheduler.running:
        scheduler.shutdown(wait=False)
    client.close()
