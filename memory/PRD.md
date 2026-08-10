# Bhavy Agarwal — Portfolio Website (PRD & Build Log)

## Original Problem Statement
Build a personal portfolio website for Bhavy Agarwal (Data & Analytics Engineer) based on the provided PRD, resume, and "Alex Marex" design inspiration. Dark, futuristic, minimal, AI/tech-forward single-page scroll site.

## User Choices
- Hero: photo **placeholder** (user adds own photo later) — no stock person photo.
- Contact: **working form** that saves to MongoDB AND emails bhavyagarwal85@gmail.com (Emergent-managed Resend).
- Resume: user's uploaded PDF is the downloadable file.

## Architecture
- **Frontend:** React 19 + Tailwind, framer-motion (scroll reveals, masked hero reveal, parallax), lenis (smooth scroll), react-icons, sonner toasts. Fonts: Clash Display (headings) + General Sans (body) via Fontshare.
- **Backend:** FastAPI + MongoDB (motor). Endpoints: `GET /api/`, `POST /api/contact` (persist + email via Emergent Resend proxy), `GET /api/contact`.
- **Email:** Emergent-managed Resend (`EMERGENT_EMAIL_KEY`, `EMAIL_FROM_NAME`, `OWNER_EMAIL` in backend/.env). HTML escaped.

## User Personas
- Recruiters / hiring managers (Data Analyst / Analytics Engineer roles).
- Startup founders needing freelance data/BI work.
- Peers/collaborators (GitHub, LinkedIn).

## Core Requirements (static)
Single-page 8-section scroll: Hero, Trust marquee, About+Education, Experience timeline, Projects (3 cards → GitHub), Skills (4 groups), Certifications, Contact form + footer. Floating pill navbar w/ active highlight + smooth scroll. Resume download. Responsive, WCAG-AA contrast, purple-on-black dark theme.

## Implemented (2026-08-10)
- All 8 sections built per PRD with exact palette (#0A0A0F base, #7C5CFC accent, spotlight glow).
- Hero: live local time, OPEN TO WORK pulsing badge, masked line-by-line wordmark reveal, parallax glow + photo placeholder, resume download.
- Trust marquee (tool logos), About + Education card, Experience glowing timeline, Projects clipped-frame cards w/ grayscale→color hover, Skills + Certifications, Contact form + link cards + footer.
- Working contact API (MongoDB persist + Resend email, HTML-escaped).
- Tested end-to-end: backend 100% (6 pytest cases), frontend 100% (nav, form success/error toasts, resume 200, project links).

## Backlog / Remaining
- P1: User uploads real hero photo (placeholder in place).
- P2: Replace GitHub links with per-project repos (currently all → github.com/bhavyagarwal12).
- P2: Optional case-study detail pages.
- P2: Analytics (scroll depth, resume downloads) per PRD success metrics.

## Files
- Backend: `/app/backend/server.py`, `/app/backend/.env`
- Frontend: `/app/frontend/src/App.js`, `/app/frontend/src/data.js`, `/app/frontend/src/components/site/*`
- Resume: `/app/frontend/public/Bhavy_Agarwal_Resume.pdf`
- Tests: `/app/backend/tests/test_portfolio_api.py`
