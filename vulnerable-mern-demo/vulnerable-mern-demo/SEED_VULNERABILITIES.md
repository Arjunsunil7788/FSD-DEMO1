# Seeded Vulnerabilities — Instructor Answer Key

| # | Vulnerability | Location | OWASP 2025 | Surfaces in |
|---|---|---|---|---|
| 1 | Hardcoded JWT secret | `server/config.js` | Secrets exposure | Day 1 SAST/secrets scanning |
| 2 | Outdated `lodash` (4.17.15, prototype pollution) | `server/package.json` | A03 Software Supply Chain Failures | Day 1 Hands-On 2 (Snyk) |
| 3 | Outdated `axios` (0.21.0, SSRF via redirect) | `client/package.json` | A03 Software Supply Chain Failures | Day 1 Hands-On 2 (Snyk) |
| 4 | `_.merge(note, req.body)` on old lodash — prototype pollution payload | `server/routes/notes.js` (`PATCH /:id`) | A03 Software Supply Chain Failures | Day 2 Top 3 live coding |
| 5 | CORS wide open (`cors()` with no options) | `server/server.js` | A02 Security Misconfiguration | Day 2 Top 3 live coding |
| 6 | Verbose error handler leaks stack trace | `server/server.js` | A02 Security Misconfiguration | Day 2 Top 3 live coding |
| 7 | `DELETE /api/notes/:id` has no `requireAuth` at all | `server/routes/notes.js` | A01 Broken Access Control | Day 2 Top 3 live coding |
| 8 | `GET /api/notes/:id` never checks note ownership (IDOR) | `server/routes/notes.js` | A01 Broken Access Control | Day 2 Top 3 live coding |
| 9 | Password stored in plain text, no hashing | `server/models/User.js`, `server/routes/auth.js` | A04 Cryptographic Failures | Day 2 Identity/Sessions |
| 10 | NoSQL injection — raw `req.body` in `User.findOne(...)` | `server/routes/auth.js` (`POST /login`) | A05 Injection | Day 2 Identity/Sessions |
| 11 | JWT signed with no `expiresIn` | `server/routes/auth.js` | A07 Authentication Failures | Day 2 Identity/Sessions |
| 12 | Token kept in `localStorage`, not an HttpOnly cookie | `client/src/api.js`, `client/src/components/Login.js` | A07 (session-handling trade-off) | Day 2 Identity/Sessions discussion |
| 13 | `dangerouslySetInnerHTML` on unsanitized note body | `client/src/components/NoteView.js` | A05 Injection (XSS) | Day 2 Frontend & Deployment |

**Suggested exploit for #10 (NoSQL injection):** POST to `/api/auth/login`
with `{"username": "<any existing username>", "password": {"$ne": null}}` —
the Mongo query treats `$ne` as an operator, not a literal, and the check
passes without knowing the real password.

**Suggested exploit for #13 (XSS):** create a note whose body is
`<img src=x onerror="alert(document.cookie)">` — it renders and executes on
anyone who views that note.
