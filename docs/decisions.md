# Decisions

## 2026-07-29 - Karrot Conversion Event Mapping

- Decision: keep the existing franchise landing as the single paid-media conversion point and map its canonical events to Karrot Pixel as `ViewPage`, `Lead`, and `SubmitApplication`.
- Reason: the Karrot native lead-form recommendation would split the consultation flow and bypass the landing's existing attribution, privacy, and email-delivery contract.
- Impact: Karrot conversion campaigns must use tracker ID `1785301238064995001`; production deployment and live collection verification must complete before campaign creation or activation.

## 2026-07-17 - Consent-Aware Meta Lead Deduplication

- Decision: send the successful form `Lead` through browser Pixel and server CAPI only when the separate optional Meta measurement consent is selected, using one shared `event_id`.
- Reason: preserve the required consultation flow and email delivery while making the hashed phone and overseas Meta transfer optional and clearly disclosed.
- Impact: a declined Meta consent never blocks `POST /api/leads`; a Meta outage never changes an emailed inquiry from success to failure; production CAPI requires server-only environment variables and a post-deploy Test Events check.

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
