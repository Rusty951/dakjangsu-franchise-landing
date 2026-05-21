# Dakjangsu Franchise Landing Agent Guide

Purpose: build a franchise lead landing page for 닭장수후라이드 with Antigravity handling frontend design and Codex handling planning, backend, review, debugging, and QA.

## First Read

1. `AGENT.md`
2. `docs/context/brief.md`

Read other files only when needed:
- Frontend handoff: `docs/handoff/antigravity-frontend-brief.md`
- Backend/API: `docs/backend/api-contract.md`
- Review/debug: `docs/review/checklist.md`
- Source locations: `docs/context/source-map.md`
- Decisions/worklog: `docs/decisions.md`, `docs/worklog.md`

## Roles

- Antigravity owns frontend UI, responsive layout, motion, visual polish, and component styling.
- Codex owns information architecture, backend/API, lead form validation, tracking, code review, debugging, and final QA.
- If a task crosses roles, preserve the existing role boundary and leave a short note in `docs/worklog.md`.

## Product Direction

- Goal: make a prospective franchise owner feel, "내 동네에서도 가능한지 상담받아봐야겠다."
- Flow: `손님 문제 -> 닭장수의 답 -> 팔릴 메뉴 -> 내 동네 가능성 -> 맞는 창업자 -> 본사 지원 -> 상담`
- Primary CTA: KakaoTalk franchise consultation.
- Secondary CTA: lead form.
- Phone number is supporting contact text, not the main button.

## Safety

- Do not expose sales/profit guarantees, average revenue, closure rate, store count, or hard startup-cost claims unless the client confirms exact public wording.
- Do not commit secrets. Use `.env.local` for API keys, webhook URLs, Sheets credentials, and analytics IDs.
- Keep root docs compact. Do not paste large PDFs or long copied source text into agent instruction files.
- Prefer focused files and narrow edits. Do not refactor unrelated areas while reviewing.

## Validation

When code exists, run the project checks before handoff. Prefer:

```bash
npm run check
```

If no check script exists yet, run the closest available build, lint, typecheck, and test commands and record gaps in `docs/worklog.md`.
