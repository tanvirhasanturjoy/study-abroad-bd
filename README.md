# Study Abroad AI BD + AuthCore (merged)

This is the `study-abroad-ai-bd` app (the good-looking one) with AuthCore's
account features — register with OTP verification, log in, and create/edit a
profile — added as a new **Account** tab in the same UI, restyled to match.

The existing **Advisor** tab (country matching + CV Assistant upload) is
unchanged and still works exactly as before.

## What changed

- `study-abroad-ai-bd/src/client/index.html` — added a top navbar with
  **Advisor** / **Account** tabs, and a new Account view: Login, multi-step
  Register (send OTP → verify OTP → set password), and a Profile
  create/edit form (institution, CGPA, bio, avatar, etc.).
- `study-abroad-ai-bd/src/client/auth.js` — new file, all the logic for the
  above. Talks to the AuthCore API. Also adds an **"Import from analyzed
  CV"** button on the profile form that pulls institution/department/CGPA
  out of whatever the CV Assistant (in the Advisor tab) already parsed.
- `study-abroad-ai-bd/src/client/app.js` — one-line change: exposes the last
  CV analysis on `window.__lastCvResult` so `auth.js` can read it.
- `study-abroad-ai-bd/src/client/styles.css` — appended new styles for the
  navbar, tabs, auth forms, OTP stepper, and profile form, reusing the
  existing color/spacing tokens (dark navy background, cyan/blue/green
  accents, glass panels, 8px radius) so it looks like one product.
- `authcore-backend/` — copied as-is with a few fixes (see below), still a
  separate Express + MySQL service. It was not merged into the Node/HTTP
  study-abroad server because the two use very different stacks (Express +
  MySQL callbacks vs. a raw ESM `http` server) — running them side by side
  is far less risky than rewriting one to fit the other.
- `study-abroad-ai-bd/src/server/sopAgent.mjs` — new. Generates a
  Statement of Purpose draft from the CV Assistant's parsed output. See
  "SOP Writer" below.

### Database connection + OTP email (fixed)

The account/login code itself was already correct — the actual blocker was
that `database/schema.sql` never created the `authcore` database, only its
tables, so a fresh setup had nothing to connect to ("Unknown database
'authcore'"). Fixed, plus some diagnostics so future setup problems are
obvious instead of a bare MySQL/SMTP error:

- `database/schema.sql` now creates the database itself
  (`CREATE DATABASE IF NOT EXISTS authcore`), not just the tables.
- New `npm run setup-db` (inside `authcore-backend/`) creates the database
  and runs the schema in one command — no `mysql` CLI needed, just correct
  `DB_HOST`/`DB_USER`/`DB_PASSWORD` in `.env`.
- `server.js` now checks the DB connection and email (Gmail) login once at
  startup and prints a plain-English reason if either fails, instead of
  only surfacing as a confusing 500 later.
- `services/emailService.js` verifies the Gmail login at startup
  (`transporter.verify()`) and specifically flags the #1 real-world cause
  of OTP failures: `EMAIL_PASSWORD` must be a 16-character **Gmail App
  Password** (Google Account → Security → 2-Step Verification → App
  passwords), not your normal Gmail password.
- `npm run check-email` (was `emailTest.js`) now verifies the login first
  and optionally sends a real test OTP: `npm run check-email you@example.com`.
- If Gmail isn't configured yet, OTPs are logged to the server console
  instead of silently blocking registration (dev-mode only — set
  `NODE_ENV=production` to disable this and fail loudly instead).

Run `npm run setup-db` once, then `npm run dev`, both inside
`authcore-backend/`, after filling in `.env`.

### SOP Writer (new feature)

A new panel under the CV Assistant on the Advisor tab. After analyzing a
CV, fill in (optional) target country/university/program and any extra
points to include, then generate a first-draft Statement of Purpose —
grounded only in facts already present in the parsed CV (it won't invent
achievements). Uses the same Groq setup as the CV Assistant
(`GROQ_API_KEY` in `study-abroad-ai-bd/.env`), via a new
`POST /api/generate-sop` endpoint. Output can be copied or downloaded as a
`.txt` file.

### Bugs fixed in AuthCore while merging

- `profileController.js` referenced an undefined `db` variable in
  `getProfileController`/`updateProfileController` — every profile fetch or
  update would have thrown. Fixed to use the existing MySQL pool.
- Profile routes (`/api/profile/*`) had **no auth check** — anyone could read
  or overwrite any user's profile by guessing a `user_id`. They're now
  behind the existing `verifyToken` middleware, and the controllers use the
  logged-in user's id from the token rather than trusting the request.
- Added `GET /api/auth/me` (protected) so the frontend can fetch the
  logged-in user's name/email/phone without decoding the JWT by hand.
- Added `database/schema.sql` — the `users` / `otp` / `profiles` tables
  were never included in the project, so there was nothing to connect to.
- `update-profile` now also accepts `profile_picture` and `id_number`
  (it silently dropped them before).

## Running it

You need two things running at once: the AuthCore API (port 5000) and the
Study Abroad app (port 8787). They're independent servers; the frontend
calls both.

### 1. AuthCore backend (accounts, OTP, profile)

```bash
cd authcore-backend
npm install
mysql -u root -p < database/schema.sql   # creates the users/otp/profiles tables
cp .env .env.local                        # or just edit .env directly
# fill in DB_HOST / DB_USER / DB_PASSWORD / DB_NAME / JWT_SECRET / EMAIL / EMAIL_PASSWORD
npm run dev
```

`EMAIL` / `EMAIL_PASSWORD` are used to send the OTP email (see
`services/emailService.js` / `sendOTP.js`) — a Gmail address with an
[app password](https://support.google.com/accounts/answer/185833) works.

### 2. Study Abroad app (advisor + UI)

```bash
cd study-abroad-ai-bd
npm install
npm run dev
```

Then open **http://localhost:8787**. The Account tab talks to AuthCore at
`http://<same-host>:5000/api` by default — if you deploy AuthCore somewhere
else, set `window.AUTHCORE_API_BASE` before `auth.js` loads (e.g. add a
`<script>window.AUTHCORE_API_BASE = "https://your-api.example.com/api";</script>`
line in `index.html` above the `auth.js` tag).

## Known limitations / things to revisit

- `profile_picture` is stored as a base64 data URL directly in the
  `profiles` table (`LONGTEXT`) rather than a real file upload — AuthCore's
  `multer` dependency was never wired to an endpoint, so this was the
  simplest working option. The UI warns above ~150KB. For production, swap
  this for real object storage (S3, etc.) and store a URL instead.
- OTP email delivery depends on `EMAIL`/`EMAIL_PASSWORD` being a working
  Gmail account; there's no fallback provider.
- No "forgot password" flow — AuthCore's backend doesn't have one yet.
