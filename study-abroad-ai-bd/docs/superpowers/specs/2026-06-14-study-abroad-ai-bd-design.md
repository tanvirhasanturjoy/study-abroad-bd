# Study Abroad AI BD Design

## Goal

Build a basic local website for Bangladeshi students that recommends study-abroad countries and university directions from result, budget, IELTS, subject, and visa readiness inputs.

## MVP

- Modern one-page React UI.
- Local Node API for recommendations.
- Live web research snippets from DuckDuckGo HTML search.
- Heuristic AI-style advisor that scores countries by budget fit, academic fit, English fit, visa readiness, and stated priority.
- Source links and warnings that final requirements must be verified on official university/immigration pages.

## Architecture

The browser submits a student profile to `/api/recommend`. The API gathers current web snippets for study, tuition, visa, and proof-of-funds queries, then passes the profile plus snippets into a deterministic advisor engine. The frontend renders ranked country cards, university suggestions, reasons, gaps, visa checklist, and source links.

## Scope

No paid LLM key is required. This is intentionally low-cost and local. The advisor behaves like a guided AI recommender through structured scoring and live research summaries, not expensive generation.

