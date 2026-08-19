# Study Abroad AI BD

A live-research advisor for Bangladeshi students that turns a profile (result, IELTS,
budget, sponsor readiness, priorities) into a ranked country shortlist — backed by
live web research and a real university directory — plus an **AI CV Assistant** that
reads an uploaded CV and separates it into personal details, education history, and
skills.

## Features

- **Country advisor** — scores and ranks study-abroad destinations against your
  profile (`POST /api/recommend`), pulling in live web search snippets and a public
  universities directory.
- **CV Assistant (new)** — upload a CV (PDF, DOCX, or TXT) or paste CV text, and an
  LLM agent extracts:
  - **Personal details** — name, email, phone, address, date of birth, nationality,
    LinkedIn, portfolio
  - **Education** — institution, degree, field of study, dates, result/GPA, location
    (most recent first)
  - **Skills** — technical, soft, languages, certifications
  - A one-to-two sentence summary of the candidate

  From the results you can click **"Use this to fill the profile form"** to
  auto-populate the Subject / Degree / GPA fields on the advisor form from the CV's
  most recent education entry.

## Project structure

```
src/
  client/          static frontend (index.html, app.js, styles.css)
  server/
    index.mjs      HTTP server, routes, static file serving
    research.mjs    live web research (DuckDuckGo HTML scrape)
    universities.mjs  public universities directory lookup + caching
    cvAgent.mjs     CV text extraction (PDF/DOCX/TXT) + LLM parsing agent
  shared/
    advisor.mjs     scoring/recommendation logic (shared by server + tests)
tests/              node:test suite for advisor, research, universities, cvAgent
```

## Getting started

```bash
npm install
```

The CV Assistant calls the Anthropic API, so set an API key before starting the
server:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
npm run dev
```

The app runs at `http://127.0.0.1:8787` (override with `PORT=xxxx npm run dev`).

Without `ANTHROPIC_API_KEY` set, the rest of the app (country advisor) still works
normally — only `POST /api/parse-cv` will return a
`"ANTHROPIC_API_KEY is not configured on the server"` error until you set it.

### Optional environment variables

| Variable              | Default              | Purpose                                  |
|------------------------|-----------------------|-------------------------------------------|
| `PORT`                 | `8787`                | HTTP server port                          |
| `ANTHROPIC_API_KEY`    | *(required for CV Assistant)* | Auth for the Claude Messages API |
| `CV_AGENT_MODEL`       | `claude-sonnet-4-6`   | Override the model used for CV parsing    |

## Running tests

```bash
npm test
```

Runs the full `node:test` suite (advisor scoring, live-research parsing,
universities shaping/caching, and the CV agent's extraction/JSON-shaping/error
handling). CV agent tests mock the Anthropic API call, so they run without a real
API key.

## API reference

### `POST /api/recommend`
Body: a student profile object (see `src/client/app.js` for the exact fields:
`subject`, `degree`, `gpa`, `ielts`, `budgetBdt`, `priority`,
`hasBankStatement`, `hasSponsorDocs`, `wantsPrPathway`).
Returns ranked country recommendations, a visa checklist, and research sources.

### `POST /api/parse-cv`
Body — **either**:
- `{ "cvText": "raw pasted CV text..." }`, or
- `{ "fileName": "resume.pdf", "fileBase64": "<base64-encoded file bytes>" }`
  (supported extensions: `.pdf`, `.docx`, `.txt`)

Response:
```json
{
  "personalDetails": {
    "fullName": "...", "email": "...", "phone": "...", "address": "...",
    "dateOfBirth": "...", "nationality": "...", "linkedin": "...", "portfolio": "..."
  },
  "education": [
    {
      "institution": "...", "degree": "...", "fieldOfStudy": "...",
      "startDate": "...", "endDate": "...", "gpaOrResult": "...", "location": "..."
    }
  ],
  "skills": {
    "technical": ["..."], "soft": ["..."], "languages": ["..."], "certifications": ["..."]
  },
  "summary": "..."
}
```
Any field with no supporting evidence in the CV is returned as `null` (or `[]` for
lists) rather than guessed.

### `GET /healthz`
Basic liveness check, returns `{ "ok": true }`.

## Notes on the CV Assistant implementation

- File uploads are read client-side as base64 and sent as JSON — no multipart
  parsing library needed, keeping the server dependency-light.
- Text extraction uses `pdf-parse` (PDF) and `mammoth` (DOCX); plain `.txt` is read
  as-is.
- The agent prompt instructs the model to return **only** raw JSON; the server also
  strips markdown code fences and recovers embedded JSON defensively in case the
  model adds any commentary.
- CV text is truncated to ~20k characters before being sent to the model to keep
  requests small and predictable in cost.
- Extracted results are re-shaped/validated on the server before being sent to the
  client, the same defensive pattern already used for the public universities API in
  `universities.mjs`.
