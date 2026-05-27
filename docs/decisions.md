# Decisions

## 2026-05-20 - Role Split

- Decision: Antigravity handles frontend design and Codex handles planning, backend, review, debugging, and QA.
- Reason: frontend polish and implementation review are different strengths.
- Impact: keep frontend guidance in `docs/handoff/` and backend/review contracts in `docs/backend/` and `docs/review/`.

## 2026-05-20 - Compact Context

- Decision: keep `AGENT.md` short and route source context through compact docs.
- Reason: save tokens and keep agent performance stable.
- Impact: agents first read `AGENT.md` and `docs/context/brief.md`, then load role-specific docs only as needed.

## 2026-05-27 - Copy Rewrite Standard

- Decision: lock the landing copy rewrite standard in `docs/context/copy-direction.md`.
- Reason: current copy feedback centers on abstract, easy-to-challenge phrases that do not create concrete customer scenes.
- Impact: before changing page copy, propose line-by-line options against the standard, get user approval, then edit.
