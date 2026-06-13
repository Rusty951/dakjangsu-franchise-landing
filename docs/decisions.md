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

## 2026-06-13 - 로컬 메모리는 DECISIONS에 미러링해 영속화한다

- 결정: 로컬 메모리에 새 운영·findings·피드백 항목을 남기면 같은 요지를 이 문서에 날짜 항목(결정/이유/영향)으로 함께 기록한다. 순수 사용자 신원 사실은 제외한다.
- 이유: 클로드 로컬 메모리는 기기/설치에 묶여 다른 컴퓨터에서 참조 불가, 포맷 시 소실. git DECISIONS는 clone/pull로 어느 기기에서나 따라온다.
- 영향: 메모리는 복기용, 영속 원본은 DECISIONS. 참조는 /decisions. 미러 항목은 3줄로 짧게.
