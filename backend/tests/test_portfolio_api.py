"""Backend tests for Bhavy Agarwal portfolio API."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/") or "https://portfolio-showcase-3588.preview.emergentagent.com"
API = f"{BASE_URL}/api"


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
