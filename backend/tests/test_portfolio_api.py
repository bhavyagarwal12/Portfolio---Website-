"""Backend tests for Bhavy Agarwal portfolio API."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/") or "https://portfolio-showcase-3588.preview.emergentagent.com"
API = f"{BASE_URL}/api"
INSIGHTS_CODE = "bhavy2026"


# ---------- Health ----------
def test_root_health():
    r = requests.get(f"{API}/", timeout=30)
    assert r.status_code == 200
    body = r.json()
    assert "message" in body
    assert "Bhavy" in body["message"] or "Portfolio" in body["message"]


# ---------- Contact POST valid ----------
def test_create_contact_valid_and_persists():
    payload = {
        "name": "TEST_User Playwright",
        "email": "test_user@example.com",
        "message": "TEST_message: automated backend test - please ignore.",
    }
    r = requests.post(f"{API}/contact", json=payload, timeout=60)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("status") == "success"
    assert isinstance(data.get("id"), str) and len(data["id"]) > 0
    assert "email_id" in data  # may be None if email fails, but key must exist

    # Verify persistence via GET
    g = requests.get(f"{API}/contact", timeout=30)
    assert g.status_code == 200
    items = g.json()
    assert isinstance(items, list)
    match = [x for x in items if x.get("id") == data["id"]]
    assert len(match) == 1
    saved = match[0]
    assert saved["name"] == payload["name"]
    assert saved["email"] == payload["email"]
    assert saved["message"] == payload["message"]
    assert "created_at" in saved
    assert "_id" not in saved  # ObjectId excluded


# ---------- Contact POST validation ----------
def test_create_contact_invalid_email():
    r = requests.post(f"{API}/contact", json={
        "name": "TEST_x", "email": "not-an-email", "message": "hello"
    }, timeout=30)
    assert r.status_code == 422


def test_create_contact_missing_fields():
    r = requests.post(f"{API}/contact", json={"name": "TEST_x"}, timeout=30)
    assert r.status_code == 422


def test_create_contact_empty_name():
    r = requests.post(f"{API}/contact", json={
        "name": "", "email": "a@b.com", "message": "hi"
    }, timeout=30)
    assert r.status_code == 422


# ---------- Resume PDF served ----------
def test_resume_pdf_served():
    r = requests.get(f"{BASE_URL}/Bhavy_Agarwal_Resume.pdf", timeout=30)
    assert r.status_code == 200
    assert len(r.content) > 500  # non-empty


# ---------- Track events ----------
def test_track_page_view_ok():
    r = requests.post(f"{API}/track", json={"type": "page_view"}, timeout=30)
    assert r.status_code == 200, r.text
    assert r.json().get("status") == "ok"


def test_track_resume_download_ok():
    r = requests.post(f"{API}/track", json={"type": "resume_download", "meta": "TEST_meta"}, timeout=30)
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


def test_track_invalid_type_422():
    r = requests.post(f"{API}/track", json={"type": "bogus_event"}, timeout=30)
    assert r.status_code == 422


# ---------- Insights ----------
def test_insights_wrong_code_401():
    r = requests.get(f"{API}/insights", params={"code": "wrong"}, timeout=30)
    assert r.status_code == 401


def test_insights_missing_code_422():
    r = requests.get(f"{API}/insights", timeout=30)
    assert r.status_code == 422


def test_insights_valid_returns_totals_and_recents():
    # Ensure at least one event exists first
    requests.post(f"{API}/track", json={"type": "page_view"}, timeout=30)
    r = requests.get(f"{API}/insights", params={"code": INSIGHTS_CODE}, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "totals" in data
    totals = data["totals"]
    for k in ("page_views", "resume_downloads", "contact_submissions"):
        assert k in totals
        assert isinstance(totals[k], int)
    assert isinstance(data.get("recent_messages"), list)
    assert isinstance(data.get("recent_events"), list)
    # page_views > 0 since we just posted one
    assert totals["page_views"] >= 1
    # ObjectId excluded
    for ev in data["recent_events"]:
        assert "_id" not in ev
    for m in data["recent_messages"]:
        assert "_id" not in m


# ---------- Digest & Weekly email endpoints ----------
def test_digest_send_wrong_code_401():
    r = requests.post(f"{API}/digest/send", params={"code": "wrong", "force": "true"}, timeout=60)
    assert r.status_code == 401


def test_digest_send_valid_returns_sent():
    r = requests.post(f"{API}/digest/send", params={"code": INSIGHTS_CODE, "force": "true"}, timeout=90)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("status") == "sent"


def test_weekly_send_wrong_code_401():
    r = requests.post(f"{API}/weekly/send", params={"code": "wrong", "force": "true"}, timeout=60)
    assert r.status_code == 401


def test_weekly_send_valid_returns_sent():
    r = requests.post(f"{API}/weekly/send", params={"code": INSIGHTS_CODE, "force": "true"}, timeout=90)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("status") == "sent"

