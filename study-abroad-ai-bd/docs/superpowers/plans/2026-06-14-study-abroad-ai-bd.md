# Study Abroad AI BD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local AI-guided study abroad recommendation website for Bangladeshi students.

**Architecture:** A Vite React frontend posts profiles to an Express API. The API fetches live web snippets and uses a deterministic advisor engine to produce ranked country/university recommendations.

**Tech Stack:** React, TypeScript, Vite, Express, Vitest, native fetch.

---

### Task 1: Advisor Engine

**Files:**
- Create: `src/shared/advisor.ts`
- Test: `tests/advisor.test.ts`

- [ ] Write failing tests for country ranking, budget gap, and visa checklist.
- [ ] Implement deterministic scoring and recommendation output.
- [ ] Run `npm test`.

### Task 2: Research Service

**Files:**
- Create: `src/server/research.ts`
- Test: `tests/research.test.ts`

- [ ] Write failing tests for query building and HTML result parsing.
- [ ] Implement DuckDuckGo HTML search parsing with graceful fallback.
- [ ] Run `npm test`.

### Task 3: API and UI

**Files:**
- Create: `src/server/index.ts`
- Create: `src/client/App.tsx`
- Create: `src/client/main.tsx`
- Create: `src/client/styles.css`

- [ ] Add Express `/api/recommend`.
- [ ] Add modern responsive UI with form, results, sources, and loading/error states.
- [ ] Run `npm test` and `npm run build`.

