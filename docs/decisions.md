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

## 2026-06-22 - Tracking and Attribution Contract

- Decision: use direct GA4 and Meta Pixel tracking with one explicit `page_view`, canonical conversion events (`click_kakao`, `click_phone`, `submit_lead`), supporting social click events, and clean public attribution paths such as `/instagram`.
- Reason: paid media needs reliable event names, while public profile links should not expose long UTM strings.
- Impact: future landing/profile/ad link changes must preserve the event contract and attribution mapping. The Instagram profile URL is `https://www.dakjangsu-franchise.com/instagram`, and explicit query parameters can still override inferred attribution.

## 2026-06-23 - Clean Organic Channel Paths

- Decision: keep organic channel links short in public surfaces: `/instagram`, `/youtube`, `/blog`, and `/threads`.
- Reason: channel profiles and descriptions should look clean while still preserving source attribution in GA4 and lead payloads.
- Impact: use the short URLs in Instagram, YouTube, Naver Blog, and Threads; the landing app infers the UTM fields from the path, and explicit query parameters still override inferred values.

## 2026-06-23 - Consultation Action Reporting

- Decision: treat `submit_lead`, `click_kakao`, and `click_phone` as equal core consultation actions.
- Reason: all three indicate franchise consultation intent on this landing; ranking one above the others would understate phone and Kakao behavior.
- Impact: mark all three as GA4 key events. Report the sum as `consultation actions`, then break it out into `confirmed inquiries` (`submit_lead`) and `consultation clicks` (`click_kakao` + `click_phone`).
