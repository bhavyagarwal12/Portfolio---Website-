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
from datetime import datetime, timezone
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


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info("Bhavy Agarwal Portfolio API started")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
