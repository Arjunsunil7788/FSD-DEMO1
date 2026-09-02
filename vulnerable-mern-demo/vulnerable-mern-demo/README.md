# Vulnerable MERN Demo — FSD Batch Cybersecurity Training

A small, deliberately insecure MERN app (Express + MongoDB API, React frontend)
built for the *FSD Batch — Cybersecurity Introduction* course. Every
participant pushes this same repo to their own GitHub, scans it, breaks it,
then fixes it — see [`SEED_VULNERABILITIES.md`](./SEED_VULNERABILITIES.md)
for the full list mapped to OWASP Top 10:2025 categories.

> ⚠️ **Training use only.** This app contains an intentionally hardcoded
> secret, a NoSQL-injectable login, an IDOR, a missing auth check, and other
> planted bugs. Never deploy it publicly, never point it at real user data,
> and never reuse `server/config.js` as a template for a real project.

## Quick start

```bash
# 1. Start MongoDB
docker compose up -d

# 2. Start the API (default: http://localhost:4000)
cd server
npm install
npm start

# 3. In a new terminal, start the frontend (default: http://localhost:3000)
cd client
npm install
npm start
```

No Docker? Point `MONGO_URI` in `server/config.js` at any local or Atlas
MongoDB instance instead.

## Repo layout

```
server/   Express API — auth, notes, the planted backend vulnerabilities
client/   React frontend — the planted frontend vulnerabilities
.github/workflows/security-scan.yml   Starter SAST + SCA pipeline (Day 1)
SEED_VULNERABILITIES.md               Answer key: what's broken, where, why
```

## How this maps to the two days

**Day 1 — push it, scan it, automate it.** Push this repo to your own
GitHub, connect SonarCloud and Snyk, run both scans, then wire up
`.github/workflows/security-scan.yml` (add `SONAR_TOKEN` and `SNYK_TOKEN` as
repo secrets first). Take three real findings into the AI-triage exercise.

**Day 2 — fix it, live, against the OWASP Top 10:2025.** The three
highest-value fixes are in `server/server.js` (CORS, error handler) and
`server/routes/notes.js` (the missing `requireAuth` on `DELETE`, the IDOR on
`GET /:id`). Identity/session fixes live in `server/routes/auth.js` and
`server/models/User.js`. The XSS demo is `client/src/components/NoteView.js`.
