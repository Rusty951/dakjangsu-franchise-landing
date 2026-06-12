# Worklog

## 2026-06-12 - Lead Email API

- Added a Vercel-compatible `/api/leads` endpoint that validates landing form submissions and sends Resend email notifications.
- Wired the Vite dev server to the same lead handler so local `/api/leads` requests exercise the backend path.
- Set the local test recipient to the provided email address in ignored `.env.local`; Resend API credentials still need to be supplied outside git.

## 2026-06-12 - Privacy Consent Alignment

- Added a landing-specific privacy policy dialog to the lead form, aligned with the official site's franchise inquiry consent structure.
- Narrowed the displayed collection scope to the landing form's actual consultation fields and tracking fields.
- Kept the consent interaction inside the final CTA form so applicants can review the policy before submitting.
- Cross-role note: Codex touched final CTA frontend because the work was tied to privacy consent, lead capture, and launch readiness.

## 2026-06-11 - Gopdoritang Photo Correction

- Replaced the incorrect 곱도리탕 photo in the menu showcase thumbnail and regenerated the composed popular menu board assets.

## 2026-06-09 - Lead Form Validation/API Wiring

- Added a secondary lead form to the final consultation section with required name, phone, region, and privacy consent fields.
- Wired client-side validation, `/api/leads` submission, UTM/path/referrer tracking fields, and lead form tracking events.
- Added frontend environment placeholders for Kakao consultation URL and lead API endpoint in `src/frontend/.env.example`.
- Hid the fixed quick-action menus while the final lead section is in view so they do not cover the form.
- Cross-role note: Codex touched the final CTA frontend because the work was tied to lead form validation, tracking, and API handoff.

## 2026-05-27 - Assertive Copy Tone Reference

- Added `docs/context/assertive-copy-tone.md` to lock the next copy direction without changing the landing structure.
- Captured the agreed tone: short, blunt, poster-like, low on `합니다/입니다`, and safe from unsupported revenue or success claims.
- Kept Kakao as the single CTA direction.

## 2026-05-27 - Founder Support Red Board Pass

- Reworked the founder support page into a red-board support timeline under `오픈하고 끝? 닭장수는 끝까지`.
- Organized support content into `4무`, `첫날 지원`, and `끝까지 관리` blocks with a consultation-condition note.
- Kept the open-event photo as proof context while replacing the previous empty support placeholders.

## 2026-05-27 - Cream Board Menu Showcase Draft

- Copied seven menu images from the desktop 닭장수후라이드 homepage asset folder into `src/frontend/public/images`.
- Added a cream-board `MenuShowcase` section below the founder support page.
- Built the first draft as a large headline plus menu-image grid without copying the competitor layout directly.

## 2026-05-27 - Final CTA Consultation Graph

- Reworked the final CTA into a red-board two-column section with a Kakao-only CTA.
- Added a rising consultation-check graph for `상권`, `포장 수요`, `운영 구조`, and `본사 지원`.
- Avoided revenue or success claims while borrowing the visual rhythm of a graph-led closing CTA.

## 2026-05-26 - Brand-Specific Repurchase Pivot

- Reframed the compact brief from generic chicken-founder anxiety toward the brand-specific question: why 닭장수후라이드 gets bought again.
- Changed the main landing copy so the first screen leads with `동네에서 다시 찾는 프라이드` instead of delivery-app risk.
- Reworked the hook, answer, menu proof, local-fit, founder-fit, consultation, and alternate hero concept copy around 특제 파우더, 얇은 튀김, 깨끗한 기름 관리, 포장 동선, and repeat-purchase scenes.
- Kept unsupported hard claims out of the page and left local-store operation claims framed as 상담/확인 language.
- Ran `npm run lint` and `npm run build` successfully.

## 2026-05-26 - Large Board Texture Assets

- Saved the red large-board texture as `src/frontend/public/images/dakjangsu-board-red-texture.png`.
- Saved the cream large-board texture as `src/frontend/public/images/dakjangsu-board-cream-texture.png`.
- Recorded the intended production order in the compact brief: red first, cream next.

## 2026-05-26 - Black Han Sans Font Asset

- Downloaded Black Han Sans / 검은고딕 from the official ZESSTYPE GitHub repository.
- Stored the available single regular display weight as `src/frontend/public/fonts/black-han-sans/BlackHanSans-Regular.ttf` and `BlackHanSans-Regular.otf`.
- Stored the upstream `OFL.txt` license and added a local README with source, license, and CSS usage notes.
- Updated the compact brief so future site work uses Black Han Sans for strong display typography.

## 2026-05-26 - First Page Red Board Hero

- Reworked the main hero as the first page of the landing: red large-board texture background, Black Han Sans display headline, and existing product-box image.
- Changed the first-screen structure to lead with `배달앱에서 한 번보다 / 동네에서 다시 찾는 프라이드`.
- Kept the CTA visible in the desktop first viewport and preserved the Kakao consultation flow.

## 2026-05-26 - Second Page Cream Board

- Reworked the second section into a cream large-board page using `dakjangsu-board-cream-texture.png`.
- Added the message `왜 다시 찾을까요` with three repeat-purchase reasons: 얇은 튀김옷, 특제 파우더, 깨끗한 기름.
- Hid floating quick actions during the board-style draft so the pages read as clean presentation boards.

## 2026-05-20 - Project Folder Created

- Created project folder at `/Users/bananabk/Documents/Projects/dakjangsu-franchise-landing`.
- Added compact agent entry files for Codex and Antigravity.
- Added source PDFs under `references/source-pdfs/`.
- Added compact project brief, source map, Antigravity handoff, backend API contract, and review checklist.
- Initialized local Git repository. No initial commit yet.

## 2026-05-21 - Frontend Directional Prototype and Client Preview

- Built the current React/Vite frontend landing prototype in `src/frontend`.
- Reworked the page from a template-like franchise landing into a brand-led editorial landing.
- Applied the 닭장수 brand guide colors, extracted logo asset, wider whitespace, stronger typography, and simplified CTA structure.
- Added scene-led persuasion sections for repeat customers, local-fit checks, owner interview, founder fit, HQ support, and Kakao consultation.
- Changed the final consultation CTA to Kakao-first and separated the footer visually from the 7th consultation section.
- Exported client-review JPGs by section under `exports/client-jpg-sections/`.
- Recreated the ZIP for client sharing at `exports/dakjangsu-franchise-landing-client-jpg-sections.zip`.
- Added full work summary and remaining action items in `docs/handoff/design-progress-summary-2026-05-21.md`.

## 2026-05-21 - Tone Lock Pass

- Reduced section background variation so the main content uses a consistent cream editorial canvas before the final navy consultation block.
- Unified primary Kakao CTA copy to `카카오톡으로 내 지역 확인하기`.
- Removed the extra navy transition box in the HQ support section so only the final consultation area acts as the primary conversion block.
- Softened image filters toward a more consistent navy/gold editorial tone.
- Kept `내 동네 가능성 보기` as the only softer mid-page CTA.
- Updated `docs/handoff/design-progress-summary-2026-05-21.md` so a new chat can continue development without this conversation history.

## 2026-05-21 - Length and Readability Pass

- Removed the standalone `HQSupport` render from the landing flow to reduce page length.
- Folded the support role into the final consultation block through `오픈 준비 흐름`.
- Changed the final consultation label from `07 / 상담` to `06 / 상담`.
- Increased global body, list, CTA, and mobile fixed CTA sizing for a 40+ target audience.
- Strengthened muted text contrast, especially on navy sections, so mobile scanning is easier.

## 2026-05-21 - Client Preview Copy Cleanup

- Kept the current landing structure and avoided broad section rewrites.
- Removed internal production wording from the owner interview area.
- Softened temporary owner quote attribution so it does not read like confirmed real testimony.
- Adjusted the final consultation copy toward what gets organized through 상담.

## 2026-05-21 - 4050 Readability and Practicality Pass

- Changed the hero headline to directly address the concern that 배달앱 alone does not build repeat customers.
- Tightened the repeat-customer scene section for shorter mobile scanning.
- Shortened the menu proof section and removed the extra mid-page Kakao CTA there.
- Reframed the local-fit section around practical 상담 checks: 포장 동선, 반복 구매 장면, and 운영 가능성.
- Added a founder-fit caution that the brand is better suited to founders who want packaging demand and neighborhood regulars, not only delivery sales.

## 2026-05-21 - Text Density Trim

- Removed repeated support lines and secondary descriptions across the hero, scene, menu, local-fit, founder-fit, and final consultation sections.
- Kept headings and practical check items so the mobile page scans faster for 40-50s prospective founders.
- Reduced the 390px mobile page height from about 8,169px to about 7,453px after trimming copy.

## 2026-05-21 - Color Rhythm and Mid CTA Pass

- Changed the menu proof section from navy to the cream editorial background to reduce heavy color switching.
- Kept navy as the strongest conversion color mainly for the hero overlay and final consultation block.
- Upgraded the local-fit section CTA to a yellow Kakao-style primary button so mid-page consultation intent has a clear action.

## 2026-05-21 - Section Type Weight Pass

- Increased section headline size and weight so lower sections feel closer to the hero's visual strength.
- Strengthened key checklist and proof item titles for easier 40-50s mobile scanning.
- Kept body copy mostly unchanged to avoid making the page text-heavy again.
- Slightly reduced the final consultation headline on mobile after review so it does not overpower the CTA block.

## 2026-05-21 - Label Readability Pass

- Increased small section labels such as `01 / 닭장수후라이드 가맹` so they are readable for older mobile users.
- Reduced label letter spacing and increased weight so labels do not feel thin or decorative.
- Added a little extra spacing below the hero label after increasing its size.

## 2026-05-21 - CTA Readability Pass

- Removed the decorative dash from primary CTA buttons.
- Increased primary CTA text size and weight.
- Centered CTA text more plainly and widened the hero CTA for better desktop readability.

## 2026-05-21 - External Feedback: More Hook Needed

- Received feedback that the landing is polished but the structure and tone feel too safe and conventional.
- Next iteration should add stronger hook elements without turning the page into a cheap franchise template.
- Candidate directions:
  - Add a compact hook bar or sharp problem statement immediately after the hero.
  - Make the local-fit section feel more like a self-diagnosis/checklist.
  - Add one short declaration block around the middle of the page, such as a strong statement about repeat customers or local demand.
- Keep safety constraints: avoid revenue, profit, startup-cost, closure-rate, or unsupported numerical claims.
- Added detailed interpretation and next-pass direction in `docs/handoff/client-feedback-hook-direction-2026-05-21.md`.

## 2026-05-21 - Impact Direction First Pass

- Created `hook/impact-v1` direction planning in `docs/handoff/impact-redesign-plan-2026-05-21.md`.
- Added a new `ShockHook` section immediately after the hero to create a stronger advertising-style stop point.
- Reworked the hero with louder visual stickers, stronger contrast, a diagnostic badge, and a larger CTA treatment.
- Converted the problem section from editorial explanation into larger message-board cards.
- Strengthened scene, menu, local-fit, founder-fit, and lead-capture sections with higher contrast, heavier borders, yellow/red/mint accents, and larger message blocks.
- Ran `npm run build` successfully after the redesign pass.

## 2026-05-21 - Red Product Campaign Hero Concept

- Built a separate `?concept=popart` hero concept focused on a premium red food-campaign visual rather than comic-style pop art.
- Generated and added `src/frontend/public/images/dakjangsu-red-hand-hero-16x9.png`, showing a hand emerging through red paper with a fried chicken box.
- Reworked the concept hero so the image is a full-bleed background, removing the previous square-image compositing feel.
- Changed the concept headline toward franchise intent: `배달만 기다리지 않는 치킨집`.
- Added stronger consultation context with CTA and three check items: 포장 동선, 재방문 장면, 운영 구조.
- Verified desktop and 390px mobile concept views, and ran `npm run build` successfully.

## 2026-05-21 - Popart Concept Landing Connection QA

- Connected the `?concept=popart` route to the full landing flow after the red campaign hero so it is no longer a one-screen concept only.
- Adjusted the concept headline to `배달앱만 켜놓으면 손님이 쌓일까요?` to make the founder anxiety more explicit.
- Aligned the concept CTA and check items with the main consultation path: 카카오톡, 포장 동선, 재방문 장면, 운영 가능 구조.
- Hid the mobile fixed Kakao bar on the popart concept route so the first-view concept does not show duplicate CTAs.
- Ran `npm run build` and `npm run lint` successfully after the connection pass.

## 2026-06-12 - Contact And Social Link Wiring

- Wired the floating email action to a configurable `VITE_CONTACT_EMAIL`, with `money8881@hanmail.net` as the current default.
- Added configurable footer links for the official video gallery, Naver Blog, and Instagram channels.
- Pointed the YouTube footer action to the likely official unsuffixed brand channel after comparing public channel metadata; Gmail ownership still requires YouTube Studio/account verification.
- Updated the footer Instagram URL to the client-provided `dakjangsu_official_` address.

## 2026-05-27 - Final CTA Graph Styling Pass

- Reworked the final consultation CTA from a plain text block into a red-board section with a cream chart sheet.
- Kept the CTA focused on KakaoTalk and `내 지역에서도 잘 맞을지 먼저 확인`.
- Used an abstract 상담 체크 graph for `상권`, `포장`, `운영`, and `지원` without presenting it as verified revenue or performance data.
- Matched the menu-board visual rhythm while keeping the final CTA distinct from the reference site.
- Ran `npm run build` successfully after the CTA graph update.

## 2026-05-27 - Board Background Consistency Pass

- Standardized cream board sections to the menu-board style: `#fffdf7`, cream texture, 42px grid, and matching grid opacity.
- Standardized red board sections to the final CTA style: `#e20a0a`, red texture, 46px grid, and matching red overlay.
- Applied the cream board system to the problem and owner interview sections.
- Applied the red board system to the menu proof and founder support sections.
- Verified the default landing flow visually and ran `npm run build` successfully.
- Follow-up: aligned every red and cream board grid to the same 42px spacing so the board system reads as one family.

## 2026-05-27 - Opening Landing Section Pass

- Finalized the first three opening pages around the hook, delivery-platform cost calculator, and local customer service answer.
- Reworked the fourth red-board page into overlapping order tickets for takeout, dine-in, and repeat-visit ordering.
- Kept risky revenue/profit guarantees out of the revised copy and ran `npm run build` successfully.

## 2026-05-29 - Debug QA Pass

- Checked the in-app browser page for console errors, missing images, and horizontal overflow; no runtime issue was found.
- Removed unconfirmed founder-support numbers from the live frontend copy and replaced them with 상담 확인형 support wording.
- Fixed the first-page hero menu animation so offscreen image shadows do not appear as a moving black strip on the left edge.
- Added a first-page-only `?font=round` sample using Jua on the hero title/subcopy, with the rest of the page staying on the original font system.
- Painted the hero section and visual slot directly with the red board background so the first-page left edge cannot show a black transparent gutter.
- Replaced the first and third hero food images with the provided `1.png` and `3.png` assets, resized them for the hero, and balanced their desktop scale against the center image.
- Reduced the hero food strip width, image basis, overlap, and side-image scales so the first and third food images stay inside the viewport without edge clipping.
- Ran `npm run lint` and `npm run build` successfully. There is still no `npm run check`, typecheck, or test script configured.

## 2026-06-04 - Lead Capture Final CTA Motion Pass

- Hid the floating quick-action bars while the final consultation section is visible so they do not cover the checklist or CTA.
- Moved the final consultation content higher on desktop and added scroll-triggered headline, checklist, stamp, and CTA entrance motion.
- Added a subtle repeating shine/sparkle treatment to the Kakao CTA button and verified desktop plus 390px mobile views for overflow.

## 2026-06-04 - Full Landing Debug Pass

- Re-ran `npm run lint` and `npm run build`, checked browser console logs, image loading, and desktop/mobile horizontal overflow on `5174`.
- Extended floating quick-action hiding to the founder support and menu showcase sections because the fixed panel covered right-side content at desktop widths.
- Replaced unconfirmed founder-support numeric claims with 상담 확인형 wording so the page stays within the approved safety direction.

## 2026-06-04 - Late Flow Focus And Mobile QA

- Reduced late-section background and chip idle motion so founder support, menu showcase, and final CTA read in a clearer sequence.
- Kept only subtle menu-board float and Kakao CTA sparkle as ongoing motion in the closing flow.
- Ran 390px mobile QA across the full landing; no horizontal overflow or final CTA overlap was found.

## 2026-06-04 - Founder Support Message Restore

- Restored the founder support section's original high-density `5무`, opening marketing support, chicken support, and headquarters support messaging.
- Kept a consultation confirmation note under the support timeline so support conditions and promotional scope remain reviewable before public use.
- Ran `npm run lint` and `npm run build` successfully after the copy restore.

## 2026-06-04 - Hero Delivery-Only Accent Revision

- Replaced the first-page `배달만` hand-mark and red border treatment with a simpler dark text-outline treatment that reads more like designed emphasis.
- Verified the hero on desktop and 390px mobile with no horizontal overflow.
- Ran `npm run lint` and `npm run build` successfully after the accent revision.

## 2026-06-04 - Menu Proof Background Repeat Fix

- Fixed the fourth-page illustration background so tall mobile viewports do not show the image as three repeated panels.
- Kept the poster pan motion by sizing the illustration to always cover the viewport height before animating position.
- Ran `npm run lint` and `npm run build` successfully after the background sizing fix.

## 2026-06-04 - Menu Proof iPhone Motion Stabilization

- Disabled fourth-page background pan, grid drift, and decorative loop animations on narrow mobile screens to prevent the red overlay from appearing to slide out of alignment on iPhone.
- Kept the copy entrance motion active while making the mobile illustration layer stable.
- Ran `npm run lint` and `npm run build` successfully after the mobile motion stabilization.

## 2026-06-04 - Menu Proof Mobile Right Edge Fix

- Disabled the remaining mobile overlay sweep animation and expanded the overlay by 1px so the right edge cannot expose a shifting red panel on iPhone.
- Ran `npm run lint` and `npm run build` successfully after the right-edge fix.
