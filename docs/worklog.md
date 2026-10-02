# Worklog

## 2026-09-29 - Product Design Refinement

- User explicitly requested Product Design review and refinement of the existing approved rebrand. Applied audit/get-context guidance to the running page, then refined the existing implementation in place. Frontend changes follow that explicit request.
- Established shared type, spacing and control rules: Pretendard body, display headings, quieter labels, consistent reading sizes, clear chapter selection, 16px form inputs and visible focus states.
- Changed the detail section to cream with one 740 package summary and its 440/100/200 breakdown. Removed the repeated opening-support card; kitchen, royalty and logistics now use aligned comparison rows on desktop and stacked blocks on phones. Preserved all existing eligibility text and draft status.
- Refined menu image layout, mobile menu rows, space selector/crop, FAQ typography and consultation styling. Preserved the orange hero, canonical logo/assets, one-benefit-per-screen flow, mascot travel, gestures and numeric reels.
- Applied Copywrite and client Voice to the limited removal of repeated copy; no new benefit or performance claims. Current implementation evidence and limits are in design-qa.md.
- Verified at 1280px desktop, 390px mobile and 320x568 short mobile. Terms/FAQ expand, space switches, CTA navigates, 16px/52px inputs and no horizontal overflow observed. Build/lint passed. No form sent or external deployment.

## 2026-09-29 - Traveling Host and Slot Number Motion

- Implemented the user's explicit frontend motion request: alternating left/right mascot positions with an eased lower crossing path, arrival tilt and existing wrist gestures.
- Added per-digit vertical reels to the five benefit amounts. Two full numeric cycles decelerate into the final digit in 1.6 seconds plus 0.22 seconds per subsequent digit, followed by a small settling bounce. Re-entry restarts the effect. Screen readers receive the final number only.
- Browser QA at 1280x800, 390x844 and 320x568: observed moving reel transforms and exact final 440/740/500, no horizontal overflow on tested phones. Fixed observed character overlap during intermediate desktop scroll by lowering the crossing path and placing benefit text above the character.
- Paused motion offscreen/when hidden, retained static reduced-motion fallback. Reduced-motion source reviewed, OS setting not toggled. Build/lint passed; no lead submission or deployment.

## 2026-09-29 - Multi-perspective Review and Readability Fixes

- Applied requested devil's advocate, reframing and content review alongside Product Design screen/accessibility criteria. Findings and limits are recorded in design-qa.md; this is self-review, not independent customer validation.
- Found a real intermediate-scroll defect: current/next panels simultaneously rendered at 0.227/0.073 opacity. Replaced continuous text opacity with one opaque active panel, retaining continuous character position and a short chapter entrance.
- Fixed 320x568 viewport clipping, enlarged chapter hit areas from as little as 16.56px width to roughly 38.57x44px, and improved qualification type size. Retested native scroll before and after a chapter boundary.
- Added semantic required states for four existing mandatory form fields and associated consent errors. Consultation navigation and DOM semantics verified; no lead submitted.
- Build/lint/diff checks passed. Full saved-screenshot audit, real-user comprehension, conversion outcomes and promotion activation remain unverified.

## 2026-09-29 - One Benefit per Scroll Screen

- User clarified during implementation that each scroll screen should feature one benefit. Replaced the temporary timed three-card entrance with native scroll chapters: brand introduction, fee exemption 440만원, opening package 740만원, kitchen 500만원, royalty exemption 2 years, monthly logistics credit up to 100만원, consultation.
- Product and space storytelling moved out of the sticky story; their ordinary detail sections remain after the benefits sequence. Each benefit now has a large numeric heading, explanation and local qualification. The 740만원 scene explicitly includes the earlier 440만원, preventing double counting.
- Character moves with scrolling and retains wrist gestures. Greeting pose follows the first and final scene explicitly, instead of assuming the old scene count. No timed carousel, scroll interception or auto advance. Reduced-motion fallback stacks static chapters.
- QA: mobile 390x844 fee/opening/kitchen scenes, actual native scroll advances fee to opening, desktop 1280x800 royalty/growth scenes. Seven panels total, one active panel at rest, no horizontal overflow. Build/lint/diff checks passed. No form submission, paid generation or deployment.

## 2026-09-29 - Benefit-first Landing

- User requested maximum emphasis on franchise benefits. Applied Copywrite and existing Korean Style QA/Voice guidance to the revised preview copy.
- Hero now leads with the conditional 440만원 fee exemption and first-two-years royalty exemption. Moved the 740만원 opening package scene directly after the hero and moved detailed benefits before menu/space.
- Enlarged the 740만원 package total and showed its 440 + 100 + 200 composition. Retained draft status, cash/non-cash distinction, kitchen eligibility and sales thresholds. Did not combine conditional kitchen/royalty/growth amounts into a universal total.
- Added a benefit-specific consultation CTA and aligned the rebrand consultation heading. Original landing copy remains unchanged when rebrandCopy is false. Existing character gestures preserved.
- Browser QA: 1280x720 hero/package breakdown, 390x844 hero/second scene/benefit detail, one active scene, no horizontal overflow. Detail section ordering and consultation anchor verified. No form submitted or deployment performed.
- Build, lint and git diff --check passed. Screenshot evidence inspected inline.

## 2026-09-29 - Articulated Character Gestures

- User requested hands moving and additional character motion. Added a layered 2D SVG puppet with independent wrist rotation and gentle body lean, connected to the existing scroll scenes. This is not a skeletal 3D rig.
- Welcome and invitation use a new waving pose. Intermediate chapters use the canonical resting pose with small wrist gestures. Each scene plays a 3.6-second gesture, then rests. Loading, offscreen and hidden-tab states pause animation; reduced-motion CSS disables it.
- Built-in ImageGen edited `src/frontend/public/rebrand/character-cutout.png` into the sibling `src/frontend/public/rebrand/character-wave.png` (1122x1402, transparent). Original assets preserved. Generated source: `exec-9e880e2e-3bf5-4414-bfe6-3e5beee52ddf.png`. The output raised the opposite hand from the requested side; accepted after visual review because the gesture fits the layout and preserves recognizable identity.
- Generation prompt: "Edit target: the attached canonical full-body Korean chicken shop mascot. Create ONE full-body waving pose on true transparent alpha background, portrait canvas. Preserve exactly this character's identity, huge black gat, facial features, moustache and beard, cream hanbok, black apron, shoes, proportions, soft studio lighting and premium 3D render style. Keep head torso legs and left-on-image hand on hip unchanged. Change ONLY the arm on the RIGHT side of the image: raise that arm with elbow bent to 90 degrees, forearm pointing vertically upward beside the head, palm facing camera, five natural fingers gently separated for a friendly hello. Crucial for animation: leave a visible transparent gap between raised forearm/hand and the face/hat; elbow sits well outside torso on the right, roughly waist/chest height. The upper arm extends outward to that elbow. Entire hat feet and raised fingers visible with generous transparent padding. One character only, no text, no shadows on background, no props. A faithful alternate pose for a layered 2D web animation, not a character redesign."
- Browser review at 1280x720 and 390x844: greeting, menu, support and invitation inspected. Hand transform changed during playback and returned to identity after the finite gesture. Shifted intermediate mobile character positions inward to expose the moving hand. No horizontal page overflow. Image-load readiness observed as true.
- Build, lint and diff checks passed. Reduced-motion behavior source reviewed, not OS toggled. Local preview only; no deployment or form submission. Frontend work follows the user's explicit request.

## 2026-09-29 - Scroll-linked Jangsu Story

- Implemented the user-approved five-scene direction: welcome, fried chicken, space, support and neighborhood consultation. One character changes horizontal position and size with native scroll progress; the same motion reverses when scrolling up.
- Replaced the hero and all repeated portrait/speech cards with a sticky narrative stage and large direct headlines. Removed unused hero/guide CSS. Kept detailed menu, space, conditional support, FAQ and live form in ordinary document flow.
- Added chapter navigation, requestAnimationFrame scheduling, event cleanup, inactive-panel inert/ARIA handling and a static prefers-reduced-motion fallback. No new library, generated asset or actual skeletal character animation.
- Browser QA: desktop 1280x900 all five chapters; mobile 390x844 welcome/menu/support/invite, forward/back native scrolling, chapter buttons and consultation link. Fixed a final CTA stacking issue; one traveler, zero speech cards, no horizontal overflow verified.
- Build, lint and diff checks passed. OS reduced-motion fallback was implemented and reviewed in source, not exercised by changing the user's system setting. No inquiry submitted and no deployment.


## 2026-09-29 - Orange Stage and Character Narration

- User changed the selected hero direction to orange, with larger black BI and character. Applied the canonical orange #d86535 on the hero and enlarged the existing transparent character.
- Added a first-person welcome speech bubble plus five recurring character guides in menu, space, benefits, consultation preparation and FAQ. Reused the canonical character without new image generation.
- Applied existing Copywrite and client Voice guidance to short explanatory lines. Preserved all commercial draft conditions.
- Browser review: desktop 1280x900 hero/menu and mobile 390x844 hero/menu. Five guide components present and no mobile horizontal overflow. Build, lint and diff checks passed. Local preview only.


## 2026-09-29 - Franchise Decision Flow Upgrade

- User explicitly requested a full design upgrade with devil's advocate, reframing and content review. Frontend changes performed in that authorized scope despite the usual Antigravity ownership split.
- Rebuilt preview styles around the cream/black character composition; added sticky navigation, chapter links, actual product photos, selectable space concepts and franchise FAQ.
- Reordered menu, space, benefits and consultation; replaced zero emphasis with named fee exemption and removed illustrative average-revenue savings. Preserved draft/eligibility limitations.
- Reused existing approved project assets. No new paid generation, deployment or form submission.
- Verified desktop, tablet and mobile views, images, overflow, space selection, FAQ and consultation navigation. Build/lint passed; details and capture limitation in design-qa.md.


## 2026-09-29 - Cream Character Hero and Franchise Benefits

- Applied the user-selected reference composition with the canonical black BI, cream canvas and foreground character; generated a transparent derivative while preserving the original asset.
- Added the August 12 franchise benefits draft: fee exemption, opening support, conditional kitchen support, royalty exemption and growth logistics credits. Draft status, eligibility and non-cash conditions remain visible; no combined guaranteed savings headline.
- Source: https://drive.google.com/file/d/1NlKLMi1tsOst-ef33Q-2auqXquXdr5Eh/view
- Verified desktop 1280x900 and mobile 390x844 in the in-app browser, loaded images, no mobile horizontal overflow, benefit anchor and condition disclosure. Build, lint and diff checks passed.
- Local preview only. No deployment or inquiry submission.


## 2026-09-29 - Rebrand Franchise Concept Preview

- Added a local `?concept=rebrand` preview for franchise prospects using the approved Warm Ink BI and pilot interior concept images.
- Labeled the space images as visualizations and left store dimensions, seating, materials, and construction costs subject to site review.
- Reused the existing lead form, privacy dialog, and footer. The default landing view and copy remain in place.
- Routed preview consultation links to the inquiry form because the currently configured Kakao open-chat link displays a deleted-link notice.
- Revised the first screen around the approved BI and canonical 3D 닭장수 character, with a short upward entrance motion and a responsive mobile composition.
- Cross-role note: Codex built the frontend preview to make the requested space and landing direction concrete for review. It has not been deployed.

## 2026-06-26 - Meta Pixel Account Switch

- Created a new Meta Pixel dataset for the `dakjangsu / dakjangsu_official_` Meta Business Suite account.
- Pixel ID: `1976009553081377`.
- Updated `VITE_META_PIXEL_ID` in the frontend env example and Vercel production env so the landing can send events to the new Meta account on the next production build.
- Opened the Meta Business Suite home screen with Korean locale for handoff.

## 2026-06-23 - Clean Organic Channel Attribution URLs

- Added clean public landing paths for YouTube, Naver Blog, and Threads so channel descriptions do not expose long UTM query strings.
- Preserved the existing Instagram `/instagram` and `/ig` behavior.
- Mapped the public paths to inferred attribution:

| Public path | Inferred attribution |
| --- | --- |
| `/instagram` | `utm_source=instagram`, `utm_medium=profile`, `utm_campaign=franchise_launch_2606`, `utm_content=bio_link` |
| `/youtube` | `utm_source=youtube`, `utm_medium=social`, `utm_campaign=franchise_launch_2606`, `utm_content=video_description` |
| `/blog` | `utm_source=naver_blog`, `utm_medium=blog`, `utm_campaign=franchise_launch_2606`, `utm_content=post_cta` |
| `/threads` | `utm_source=threads`, `utm_medium=social`, `utm_campaign=franchise_launch_2606`, `utm_content=profile_link` |

- Added Vercel rewrites for `/youtube`, `/blog`, `/threads`, and their trailing-slash variants.

## 2026-06-23 - Consultation Action Reporting Standard

- Updated the reporting standard so `submit_lead`, `click_kakao`, and `click_phone` are interpreted as equal core consultation actions.
- Kept the event names unchanged to preserve the existing GA4/Meta contract.
- Reporting breakout:

| Metric | Events |
| --- | --- |
| Consultation actions | `submit_lead` + `click_kakao` + `click_phone` |
| Confirmed inquiries | `submit_lead` |
| Consultation clicks | `click_kakao` + `click_phone` |

## 2026-06-23 - Mobile Phone CTA Fit

- Tightened the mobile fixed phone CTA so `1588-2287` no longer clips on 360px/390px widths.
- Switched the phone number in that bar to the numeric-friendly sans font, fixed the mobile sizing, and hid the short label only on very narrow screens while preserving an accessible label.
- Cross-role note: Codex touched the floating action frontend because the issue was a launch-readiness/mobile QA bug.

## 2026-06-22 - Short Instagram Attribution URL

- Added clean Instagram profile entry paths `/instagram` and `/ig` so the public profile link can stay short.
- Added `src/frontend/src/utils/attribution.js` to infer Instagram profile UTM fields from those paths while still allowing explicit query parameters to override defaults.
- Connected inferred attribution to both `page_view` tracking and lead form payloads.
- Added Meta dynamic URL parameter IDs to the lead API email payload for future ad-level separation.
- Added Vercel rewrites so `/instagram`, `/instagram/`, `/ig`, and `/ig/` serve the landing app.

## 2026-06-22 - Conversion Event Contract

- Standardized the paid-media event contract to `page_view`, `click_kakao`, `click_phone`, `submit_lead`, `click_instagram`, and `click_youtube`.
- Switched GA4 page view collection from automatic config firing to one explicit `page_view` tracking call so the landing has a single canonical visit event.
- Switched Meta Pixel `PageView` firing to the same explicit `page_view` tracking call and kept `Contact` for Kakao/phone/email and `Lead` for successful lead form submission.
- Added footer social tracking for Instagram, YouTube, and Blog clicks as supporting events.
- Kept legacy event aliases for previous `cta_*` and `lead_form_success` names so older call sites still resolve to the new reporting names.

## 2026-06-22 - Meta Pixel Install

- Created the Meta Pixel/data set `닭장수후라이드 가맹 랜딩` in the existing `닭장수이야기` business portfolio.
- Pixel ID: `1687894755772370`.
- Added a lightweight Meta Pixel loader in `src/frontend/src/utils/metaPixel.js` and exposed `VITE_META_PIXEL_ID` in the frontend env example.
- Mapped landing events to Meta browser events: `PageView`, `Contact` for consultation clicks, and `Lead` for successful form submissions.
- Left automatic advanced matching disabled because it can use customer email/phone matching.
- Added `VITE_META_PIXEL_ID` to Vercel production env, redeployed production, and verified the live bundle includes the Pixel ID and `fbevents.js`.
- Verified Meta Events Manager test events: `PageView` and `문의` were received and processed through browser/direct setup.

## 2026-06-22 - GA4 Tracking Install

- Created the GA4 account/property/web stream for the franchise landing and set the measurement ID to `G-GH9NP6WFVN`.
- Added a lightweight Google tag loader in `src/frontend/src/utils/analytics.js` and exposed `VITE_GA_MEASUREMENT_ID` in the frontend env example.
- Connected the existing landing tracking events to GA4 through `gtag('event', ...)` while keeping the existing `dataLayer` and custom browser events.
- Added `VITE_GA_MEASUREMENT_ID` to Vercel production env, redeployed production, and verified the live bundle includes the Google tag script and measurement ID.
- Google Analytics' install test detected the tag successfully. A real lead-submission test remains a separate launch check.

## 2026-06-22 - Managed Channel Link Update

- Updated the footer social link defaults from the old YouTube/Naver Blog channels to the newly managed channels.
- Updated `src/frontend/.env.example` and `docs/context/source-map.md` so future deployments and handoffs use `https://www.youtube.com/@dakjangsu_official` and `https://blog.naver.com/dakjangsu_official`.

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

## 2026-06-15 - Vercel Deployment Wiring Pass

- Added root Vercel deployment config and a root `/api/leads` entrypoint so the lead form can run as a production Vercel Function.
- Kept the existing frontend dev API middleware intact for local Vite development.
- Required `LEAD_FROM_EMAIL` instead of falling back to Resend's test sender, and documented the lead recipient in `.env.example`.
- Added optional `LEAD_REPLY_TO_EMAIL` support for routing replies to the client's Gmail account while keeping the sender on a verified domain.
- Connected the owner interview video card to an inline YouTube embed using the confirmed interview URL.
- Extracted the privacy policy dialog so the same policy can open from both the lead form and footer.
- Ran `npm run vercel-build`, `npm run lint`, and a root API handler import check successfully.

## 2026-06-26 - Meta Domain Verification

- Added the `facebook-domain-verification` meta tag issued by Meta Business Suite for `dakjangsu-franchise.com`.
- Kept the verification tag in the static HTML head so Meta can read it before the React app loads.
- Deployed the tag to production and confirmed the domain status changed to `Verified` in Meta Business Suite.


## 2026-09-29 - Oversized royalty payoff

- User requested a much larger benefit presentation. Applied the directly requested frontend adjustment to the existing rebrand page.
- Changed the royalty chapter from a large 2-year duration to an oversized 0원, retaining the first-contract two-year proposal and confirmation conditions.
- Added a delayed term reveal after the 1.6-second slot reel, synchronized the existing hand gesture, and kept reduced-motion content immediate.
- Checked desktop 1440x900 and 1280x720, plus mobile 390x844 and 375x667 in the in-app browser. No horizontal overflow; conditions remain readable and clear of the chapter navigation.
- Validation: frontend lint and production build passed. No publication or external deployment.


## 2026-09-29 - Benefit impact and scroll overlap repair

- Implemented the user's approved design-audit recommendations in the existing frontend: sequential hero benefit previews, a stronger exemption stamp, and a dark-background royalty payoff after the slot reel actually completes.
- Added an optional completion callback to SlotNumber. Stage feedback now follows the last reel's animation end instead of a separate timing guess. Re-entry resets the stage payoff.
- Reserved fixed left/right lanes for the host during benefit chapters, capped desktop character width, and bounded mobile character height by the space remaining beneath copy. Changed the rebrand body's horizontal overflow to clip so it does not create a competing sticky scroll ancestor.
- Kept the proposal status, royalty term, equipment conditions, and package non-stacking explanation. Reduced-motion mode keeps the final state readable and preview buttons navigate to the corresponding static section.
- Browser checks: 1440-wide desktop, 390-wide mobile, and 375-wide short mobile. Actual content viewport heights reported by the in-app browser were 852, 796, and 619 pixels. Checked an intermediate desktop royalty scroll position: stage top equals header bottom at 80px, no mascot/copy rectangle intersection, no horizontal overflow. Mobile royalty copy also ends above its mascot and navigation.
- Captured updated hero and royalty screens in the existing draft audit folder. Lint and production build passed. No external deployment.


## 2026-09-29 - Oversized monthly growth support

- Enlarged the growth chapter's 100만원 into the dominant visual, retaining the visible monthly maximum, sales thresholds, logistics-credit wording, and non-cash conditions.
- Added a single orange background reveal and stronger number settling motion tied to the existing final-reel completion state. Reduced-motion mode shows the final orange state without animation.
- Verified desktop content viewport 1440x852 and short mobile 375x619: final amount visible, conditions above navigation, no horizontal overflow. Saved the desktop result alongside the prior audit screenshots.
- Lint, production build, and diff whitespace checks passed. No external deployment.

## 2026-09-29 - Character lift prototype for monthly support

- Implemented the user's approved 100만원 prototype in the existing frontend. Created preparation, intermediate, and overhead poses with built-in ImageGen from the existing character. Stored transparent WebP assets and complete prompts in `docs/rebrand-lift-motion.md`.
- Added a 4.2-second character performance with a synchronized amount lift, delayed slot start, final-reel background reveal, and a move to a reserved reading position. Readable terms appear after the actor's animation completes. Kept the monthly maximum and all benefit terms unchanged.
- Measured the number's untransformed layout to align palms with its lower edge. Added a mobile note lane so the final character stays 120px tall on the checked short phone, and kept the character above the chapter navigation.
- Added decoded-image gating, existing-character fallback on image failure, re-entry and same-chapter replay, reduced-motion static presentation, and shared offscreen/hidden animation pausing.
- Browser checks: actual 1440x852 and 375x619 content viewports, all three poses, final reel event and orange transition, final reading state, keyboard replay, and scroll exit/re-entry. No horizontal overflow. Desktop conditions end at 728px above navigation at 779px. Mobile conditions end at 500px above navigation at 552px; the character occupies the reserved right-hand lane.
- Reduced-motion and load-failure branches were reviewed in code, without changing OS settings or injecting network failure. Lint, production build, and diff whitespace checks passed. Saved browser evidence in the draft output folder. No external deployment.

## 2026-09-29 - Restore the original pose after shrinking

- Applied the user's requested return to the original character pose as the lift actor shrinks. Reused the intermediate and preparation poses in reverse during the exit, then switched to the existing original cutout for the final reading state.
- Included the original cutout in the decode gate. Kept the existing size, reading lanes, and 4.2-second timing.
- Verified the return sequence and final original image in the actual 1345x1566 browser viewport. Saved the resulting screenshot. Lint and production build passed.

## 2026-09-29 - Readable benefit titles and conditions

- Implemented the user's approved typography and spacing review in the existing frontend. The growth title reaches 96px on tall desktop screens, with supporting text up to 26px and notes up to 18px. Other benefit chapters use the same hierarchy. Tall screens center the content block and give the three-digit amounts more space.
- Split the existing growth thresholds into two semantic definition-list rows and retained the original sales amounts, credit amounts, application period, proposal status, evidence requirement, and non-cash wording. Data remains in the benefit record.
- Aligned the growth actor's final position with the copy, and raised the other desktop characters beside their explanations. Preserved lift timing, pose return, replay, and reduced-motion handling. Compact desktop and mobile styles keep the amount and all conditions within the chapter.
- Verified 1688x1566 desktop screenshots for growth and opening, plus a 375x667 mobile screenshot. DOM geometry checks covered all five benefit copy blocks at 1440x900, 1280x720, 375x667, and 375x619. No horizontal overflow; the shortest measured remaining space above navigation was about 50px at 1280x720. On the 375x619 phone, the growth text has about 56px of remaining space.
- Captured the before and after views under the existing draft typography audit folder. Console error check was empty. Lint, production build, and diff whitespace checks passed. No external deployment.

## 2026-09-29 - Extend the visual hierarchy across the full journey

- Applied the user's direct request to carry the approved scale and readability from the growth chapter through all seven story chapters and the consultation form. Enlarged the hero headline and benefit previews while keeping the orange background, oversized logo, and greeting character.
- Converted the fee, opening, kitchen, and royalty explanations into semantic definition rows. Retained the original amounts, VAT explanation, package inclusion, proposal status, equipment eligibility, royalty term, and non-cash wording. The growth thresholds and lift sequence remain intact.
- Rebuilt the final invitation around one large question, readable guidance, a prominent consultation link, and the three consultation topics. The character now stands beside the content; mobile sizing reserves the space between the heading and action. The form continues the ink, cream, and orange palette with larger labels and an existing character asset. Form submission and validation behavior are unchanged.
- Verified the story at desktop content sizes 1688x1566, 1440x900, 1440x852, 1280x720, and 1280x672, plus mobile 375x667 and 375x619. All five benefit copy blocks end above chapter navigation with no horizontal overflow. Added extra compact-screen amount sizing after the short desktop check. Confirmed the invitation link reaches the form, mobile fields fit their container, and the growth actor still reaches its parked state after the reel settles.
- Reviewed reduced-motion layout in source without changing OS preferences. Saved usable hero, invitation, and form screenshots in the draft output folder. Lint, production build, and diff whitespace checks passed. No form was submitted and no external deployment was performed.

## 2026-09-29 — First-scene Omni motion sample
- User explicitly requested inserting the downloaded Google Flow sample into the existing frontend.
- Added the original 6-second 360x640 MP4 (497 KB) and a first-scene-only canvas renderer. Green dominance keying removes the background without cropping the source or intentionally removing its watermark. Audio is muted.
- One playback per entry, then crossfade to original character. Reduced motion, visibility pause, load/play failure fallback and unmount cleanup included. Other scenes unchanged.
- Desktop browser capture confirms hand raised over orange background; end state data-playing=false confirmed. This remains a low-resolution sample with slight green edge spill, not a final production motion asset.
- Validation: lint and build passed; browser preview verified. No external deployment or additional generation.

## 2026-09-30 — Client story preview
- Client-facing Vercel copy uses `VITE_STORY_ONLY=true` to show the seven opening scroll chapters, from 닭장수 through 상담. The full local landing remains available without this flag.
- Hidden follow-on benefits, menu, space, FAQ and lead form on the shared preview. Hid links that would target those hidden sections; skip link now targets the story.
- Verified the final story chapter reaches the page bottom, with no later sections visible. Lint and flagged build passed.


## 2026-10-01 — Review-only 7,000만원 first scene
- Implemented the user's direct frontend request on an isolated local branch, preserving the original checkout and the other six chapters. This direct request authorizes the frontend role exception for this draft.
- Replaced the welcome scene with an orange/cream/ink comparison: approximate 7,000만원 in conditional benefit value, existing character, and 0원 specifically for franchise and training fees.
- Kept assumptions beside the headline: 6,000만원 monthly sales maintained for 24 months and all offer conditions met. Calculation is 740 + 500 + 1,200 + 4,752 = 7,192만원; display rounds to approximately 7,000만원. Display is explicitly a review draft awaiting HQ confirmation, not a verified result or cash payment.
- Explained next to 0원 that rent, interior and other startup costs are separate. Equipment eligibility and first-year logistics limits remain visible. No form/API behavior changed.
- Verified first scene at 1280x720, 390x844 and 375x667 in the in-app browser: no horizontal overflow, no CTA/navigation overlap (23px and 3px measured clearance at compact desktop and phone). CTA navigates to the existing fee chapter. Browser error log empty.
- ESLint, Vite client build, SSR build and prerender passed. No check/test script exists. Used native config loading and a temporary Vite cache to keep the existing checkout/dependencies untouched. No push, public deployment or inquiry submission.


## 2026-10-01 — Refine the review-only opening scene
- Followed the user's request to continue the first-scene design. Direct user authorization covers this frontend role exception. Preserved the earlier JSX/CSS in the review folder and kept the original checkout and other chapters unchanged.
- Made the two amounts' meanings explicit: a conditional two-year support-value calculation on the left, and a 440만원 franchise/training-fee waiver proposal on the right. Kept the 6,000만원 monthly-sales / 24-month scenario, HQ-review status and separate startup costs close to the amounts.
- Enlarged the existing character, moved mobile prices closer to the heading, simplified repeated fee details, and changed the exploration CTA to 어떤 혜택인지 하나씩 보기. Scoped paragraph line-height rules prevent the page-wide paragraph style from crowding the first scene.
- Validated local Chrome at 1280x720, 1440x900, 390x844 and 375x667: no horizontal overflow, CTA reaches the existing fee chapter, and CTA/navigation gaps are 23px, 15px, 25px and 19px respectively. Checked the static reduced-motion mobile layout. Browser errors: zero.
- ESLint, client build, SSR build, prerender and diff whitespace checks passed. No check/test script exists. No form submission, push or deployment.


## 2026-10-01 — Split poster opening scene
- Implemented the user's approved orange/ink split direction on the existing local review branch. Direct user instruction authorizes the frontend role exception. Preserved the previous hero files in before-split/ and kept the original checkout unchanged.
- Enlarged the cream-colored benefit amount and fee-waiver zero, changed the headline to 사장님, 이 혜택은 챙기셔야죠., and changed the exploration CTA to 무슨 혜택인지 확인하기. No new benefit amounts or revenue claims were added. Scenario assumptions, draft status and the startup-cost exclusion remain adjacent and readable.
- Reused the existing greeting character pose, mirrored toward the fee-waiver side, with the existing one-time hand motion. Kept the prior video sample asset/component available. Other six chapters retain their source and motion.
- Scoped the split background to the active first scene; reduced-motion mode paints only the static welcome panel. Mobile conditions have an ink reading surface, and the CTA uses cream against ink.
- Verified local Chrome at 1280x720, 1440x900, 390x844 and 375x667, plus static reduced-motion mobile: no horizontal overflow, no CTA/navigation overlap, and the CTA reaches the existing fee chapter. Browser errors: zero. Inspected final desktop/mobile captures.
- ESLint, client build, SSR build, prerender and diff whitespace checks passed. No check/test script exists. Preview responds locally at port 8874. No inquiry submission, commit, push or external deployment.


## 2026-10-01 — Varied first-scene character motion
- Implemented the user's direct request for more character motion in the opening scene. Direct authorization covers the frontend role exception. Preserved the prior scene in before-motion/ and kept the original checkout and other six chapters unchanged.
- Reused the original greeting and standing cutouts in one 7.2-second act: entrance, short greeting, bowed head, alternating body/hand presentation toward the two amounts, another greeting and a calm standing finish. Head and hand layers use the same existing artwork; no new benefit claims or asset generation.
- Decode both images before starting the native CSS timeline. A static original greeting remains available when decoding fails. Pause with the existing offscreen/visibility state, replay on chapter reentry, and retain the static reduced-motion layout. No timers advance motion frames.
- Reduced mobile actor width and offset it slightly left after checking the widest greeting frame, reserving the reading lane beside 440만원 면제안 and the startup-cost scope.
- Verified five points of the actual animation at 1280x720, 390x844 and 375x667, plus the existing static reduced-motion mobile layout. Final desktop/mobile screenshots are in motion-final/; reduced-motion evidence is in motion/. Confirmed one visible pose, pause/resume, replay on reentry, stillness after completion, no horizontal overflow and the exploration CTA reaching the fee chapter. Browser errors: zero.
- ESLint, client build, SSR build, prerender and whitespace checks passed. No check/test script exists. Local preview stays at port 8874. No inquiry submission, commit, push or external deployment.


## 2026-10-01 — Larger opening amounts
- Implemented the user's direct request to make the two opening numbers much larger and fill more of the screen. Direct authorization covers the frontend role exception. Preserved the preceding hero JSX/CSS in before-big-numbers/ and retained all earlier work.
- Replaced the three-column pricing row with two equal halves. At 1280x720 the total's numeral font grew from 180px to 309.6px and the fee-waiver zero from 187.2px to 374.4px. Mobile numerals grow from 74.1/113.1px to 118.95/175.5px at 390px width, with responsive condensed digits keeping the total within the left half.
- Moved the approximate marker next to the calculation label and the existing 440만원 proposal into the fee label, allowing more space for both numbers. Kept the same amounts, monthly-sales/term scenario, HQ-draft status and startup-cost exclusion. Desktop scope sits beside the zero; mobile scope stays below it.
- Reduced the character's reserved size while preserving its motion component and all other chapters. Compact-screen spacing leaves the CTA above chapter navigation without reducing the numeral sizes.
- Verified Chrome renders at 1280x720, 1440x900, 390x844, 375x667, 768x1024 and static reduced-motion mobile. The total fits within the left half, no horizontal overflow or offer/condition overlap, and the CTA reaches the fee chapter. CTA/navigation gaps are at least 14px on the tested normal layouts. Final combined evidence is in big-numbers-verified/; browser errors: zero.
- ESLint, client build, SSR build, prerender and whitespace checks passed. No check/test script exists. Opened the current local preview on port 8874. No inquiry submission, commit, push or external deployment.

## 2026-10-01 — Product Design opening composition
- Applied the user's explicit Product Design refinement request to the existing approved orange/ink, two-amount hero. Scope remains the first scene; the original checkout and earlier working-tree changes are preserved. This direct request covers the frontend role exception.
- Anchored the amounts below the heading instead of centering them in the remaining viewport height. This removes the very large blank gap visible in the tall in-app pane. Condensed the left amount to keep it in its own half; removed desktop font caps so wider panes also retain the intended large-number emphasis.
- Enlarged and placed the original character in the central gap, retaining its existing 7.2-second motion. Moved it slightly left after the 1440px capture showed the waving hand hidden behind the zero. Mobile character sizing remains unchanged to preserve the reading lanes.
- Updated heading to “사장님, 시작부터 크게 챙기세요.”, made the total label explicitly a conditional calculation example, and clarified the exploration CTA as “혜택과 적용 조건 보기”. The same 7,192만원 scenario, monthly sales/24-month assumptions, HQ-draft status, fee-only zero and startup-cost exclusions remain next to the relevant content.
- In-app Browser automation was not exposed and its local skill directory was empty. Used the actual native in-app surface for visual confirmation and an isolated temporary Chrome profile for responsive and CTA checks. No user browser profile, login, form submission or external deployment was used.
- Final evidence: nine viewport/motion-preference cases, zero overflow/condition overlap/browser errors, and the fee chapter reached by every normal CTA. The minimum CTA/navigation gap is 14.44px. The actual in-app capture confirms the updated composition before the final small actor-position correction; a later capture of a different user conversation was rejected and removed. Final desktop/mobile comparisons and conditions/CTA crops were inspected; `design-qa.md` records a passed result and remaining limits.
- ESLint, client build, SSR build, prerender and whitespace checks passed. Source remains on local branch `codex/hero-7000-preview`, baseline `a1f78d7`, with no commits, push, inquiry submission or deployment. Preview remains available at port 8874.

## 2026-10-01 — Larger first-scene character
- Implemented the user's direct request for a much larger 닭장수. The frontend role exception remains directly authorized. Preserved the prior CSS and existing QA draft in before-big-character/, and retained all other working-tree changes.
- Enlarged the first actor from 48% to 70% stage height; tall desktop panes use 80%. Mobile width grows from 28vw to 52vw. Repositioned the desktop zero and phone actor to reserve reading lanes; short phones use an upper-body crop at the existing benefit card. Enlarged the static reduced-motion artwork too.
- Kept the original raster assets, motion logic, all numerals, copy, benefit assumptions and other chapters. No new benefit claim or asset generation.
- Inspected final desktop/mobile source comparisons, nine responsive/reduced-motion cases, and five mobile motion samples per size. Fixed the first mobile hand/scope collision and compact-screen lower-body fragment. Final browser checks have no overflow, CTA/condition collision or browser errors; the CTA reaches the fee chapter. QA passes in design-qa-big-character.md.
- ESLint, client build, SSR build, prerender and whitespace checks passed. Local preview remains at port 8874. No commit, push, inquiry submission or deployment.


## 2026-10-01 — Four-pose opening presentation trial
- Connected the four reference-preserving transparent PNGs made in this chat: neutral, preparation, halfway open, and full presentation. Their originals and pre-change component backups remain in the Desktop review folder 2026-10-01_닭장수_첫화면_4포즈. Project assets live under public/rebrand/poses/hero-presentation-v1/.
- Replaced first-scene texture deformation with a shared 4.2-second native animation clock. Exactly one pose is visible, both benefit amounts react during the opening gesture, and the actor returns to a still neutral finish. Asset decoding precedes motion; failure keeps the neutral image. Visibility and motion-preference guards pause or disable motion. No new generation in this implementation turn.
- First-chapter navigation replays the gesture; chapter reentry also starts it again. Updated the heading to the planned 창업 혜택부터 짚어드릴게요 wording. Other chapters and benefit amounts/assumptions retain their existing contracts.
- Adjusted desktop actor center to keep the open left hand outside the 7,000 numeral; moved the phone actor below the condition copy and reserved its upper-body crop on compact phones. Direct user request authorizes this local frontend change.
- Inspected actual timed neutral, ready, open, and settled states in the in-app browser. Checked 1440x900, 768x1024, 390x844, 375x667 and 360x740, with no horizontal overflow. Confirmed the exploration CTA reaches the fee chapter and replay returns to the opening gesture. Console warnings/errors: none. Screenshots are in the Desktop review folder's 연결검수 directory.
- Configured root check script is absent. Used frontend ESLint, native-config client build, SSR build and prerender. Reduced-motion behavior was reviewed in source, not emulated in this browser; full accessibility and production performance are outside this trial. Four images produce distinct pose changes, not continuous anatomical interpolation. No deployment, inquiry submission, commit or push.


## 2026-10-01 — Independent smooth hover on opening numerals
- Added a numeral class to 7,000 and 0 and scoped hover transitions to each glyph block. The total grows 8%, the zero grows 10%, with a 6px lift and subtle shadow. Entry uses a 700ms ease-out curve; exit uses a 950ms return curve. The original condensed total width is preserved, including the phone variant.
- Hover transforms are on the inner numerals, while the existing one-time presentation animates their outer amount containers, avoiding transform ownership collisions. Fine-pointer hover only; reduced-motion preference disables the hover transformation. No new content, generated image, or dependency.
- In-app Browser verified each hover separately and cursor transfer: 7,000 reached matrix(.7992,0,0,1.08,0,-6) while 0 stayed unchanged; moving to 0 restored the total and reached scale 1.1 on zero. Leaving both restored the exact original transforms. Current 1282px viewport had no horizontal overflow. Inspected both hover screenshots in the Desktop review folder under 연결검수/숫자호버.
- Frontend ESLint, client build, SSR build and prerender passed. Full accessibility and browser preference emulation were not performed for this decorative pointer interaction. No deployment, commit or push.


## 2026-10-01 — Page 2 fee-waiver gesture
- Implemented the user's request to proceed with page 2 from the agreed seven-chapter action plan. Direct instruction authorizes the local frontend role exception. Added JangsuFeeMotion and four reference-preserving full-body poses: introduction, palm-down preparation, downward emphasis, and hand-on-hip finish. Built-in image generation made four outputs using the first page's neutral mascot as the exact reference; no API billing or external publication. All PNGs are 1122x1402 RGBA with transparent corners.
- Review images, generation prompts and before-change source backups are in the Desktop review folder 2026-10-01_닭장수_2페이지_면제동작. Project consumers use public/rebrand/poses/fee-waiver-v1/. Source reference SHA-256: 61a5f1e493a34f7333e4ef8c0b74f4ebb750b3732e6e14f4ab6ac6525ffec643.
- One 4-second native timeline shows the number, raises the hand, presses downward after the existing 440 digit roll, and settles at rest. The same clock compresses and restores 전액 면제안 with a brief warm-ink accent. Disabled the fee title's earlier generic CSS stamp so it cannot compete with the hand-controlled timing. Amounts, VAT explanation and unconfirmed proposal wording are unchanged.
- Page 2 navigation replays both the number and gesture; returning from page 3 restarts the action. Decoding precedes playback, offscreen/document visibility pauses the clock, and reduced-motion mode retains a static finish. Preference behavior was inspected in source, not emulated in the available browser.
- Expanded the mobile actor's allowed lane, constrained by the actual copy bottom and menu top. Confirmed about 12px of menu clearance on 375x667 and no horizontal overflow. Inspected desktop introduction, preparation, press and final rest plus 1440x900, 768x1024, 390x844, 375x667 and 360x740 views. The active preview uses built output; rebuilt and refreshed it after layout changes. Final fee title CSS animation is none and the native timeline owns its transform. Browser warnings/errors: none. Screenshots are in the review folder's 연결검수 directory.
- Frontend ESLint, client build, SSR build, prerender and Git whitespace checks passed. No root check script exists in this preview checkout. No live inquiry submission, deployment, commit or push. Other chapter implementations and prior working-tree changes were preserved.


## 2026-10-01 — Larger fee host and stronger entrance
- Responded to the user's feedback that page 2's mascot needs more presence and a more dynamic arrival. Expanded its desktop lane from 27vw to 35vw and its allowed stage height from 68% to 78%, and shifted the center from 85% to 82% toward the content. Actual large-screen scale is about 30% greater; compact panes remain height-constrained. Updated the measured foot anchor for the enlarged image. Other chapter positions are unchanged.
- Reused all four existing fee poses. Added a rightward entrance from 96px (34px on phones), fade/scale from .82, restrained overshoot, settle, upward anticipation, downward press, and damped recoil. The title uses a stronger synchronized press/rebound on the same four-second clock. End state is still and full-size. Loading does not flash a pre-animation pose; the static fallback remains on decode failure. No new image generation.
- Verified timed entrance, presentation, press and finished states in the in-app browser, plus 1440x900, 1280x720, 768x1024, 390x844 and 375x667. Inspected text/actor separation and menu clearance; no horizontal overflow and no browser warning/error. Mobile motion remains inside the measured reading lane. Evidence is in the page-2 Desktop review folder under 연결검수/크기와등장; pre-edit sources are in 크기와동작_수정전.
- ESLint, client build, SSR build, prerender and Git whitespace checks pass. No amounts, copy, claims or original images changed. No deployment, commit or push.


## 2026-10-01 — Accepted Product Design size refinement
- Applied the user's accepted review: desktop presentation stays large, then the native timeline retreats 26px and settles at 90% scale. Phone views use larger waist-up crops with unchanged source PNGs.
- Normal phones reserve a larger portrait lane below copy. Compact phones up to 780px high place fee facts/conditions on the left and a 210px portrait lane on the right, keeping the key hand gesture and chapter menu visible. No copy, offer, asset identity, dependency or other chapter changed.
- Compared source and final captures at identical 1280x720 and 390x844 sizes; inspected combined desktop and phone comparisons. Fixed the initially undersized compact portrait and rechecked its full press/rest states at 375x667 plus final 360x740. The existing design-qa.md now includes a scoped passed page-2 report while preserving prior first-scene sections.
- Screenshot comparisons and the pre-edit backup are in the established Desktop review folders. Native Enter-key replay, pointer replay, no horizontal overflow and no console warnings/errors were verified. Lint, client/SSR build, prerender and whitespace checks pass. No image generation, inquiry, deployment, commit or push.


## 2026-10-01 — Page 3 opening package
- Implemented the user's explicit page-3 request from the agreed action map. Direct request authorizes this local frontend work. Added JangsuOpeningMotion and three support cards using the existing factual labels/values. Number and host replay on the opening chapter's button.
- Built-in generation made three new poses, then two targeted repairs after the initial prepare/offer frames were too similar and shifted. Adopted the repaired apron-reaching and short-offering poses with the full presentation; reused the canonical neutral for the fourth state. All adopted files are transparent 1122x1402 PNGs. Originals/prompts/backups are in Desktop 99_최종아님_삭제대기/2026-10-01_닭장수_3페이지_오픈지원; project sources use public/rebrand/poses/opening-package-v1/. Reference SHA-256: 61a5f1e493a34f7333e4ef8c0b74f4ebb750b3732e6e14f4ab6ac6525ffec643.
- A shared 4.6-second clock coordinates three offering gestures, cream-card emphasis in order and a 740 total pulse. The host finishes at identity scale and keeps the larger presence, reflecting the latest feedback; no late shrink was added. Mobile reserves a left portrait and right card/note column. Compact desktop padding protects note/menu clearance.
- Preserved the explicit 740 total's inclusion of prior 440 and its waiver/in-kind/marketing nature. Page 2's existing implementation and other chapters remain unchanged in this turn.
- Inspected actual timed and settled states, pixel-matched before/after comparisons, five responsive sizes and narrow-phone keyboard replay. No horizontal overflow or console warnings/errors; notes and navigation remain readable. Existing design-qa.md contains a scoped passed page-3 report. Lint, client/SSR build, prerender and whitespace checks pass. No public deployment, real inquiry, commit or push.


## 2026-10-01 — Page 4 kitchen-support presentation
- Implemented the directly requested local frontend scope exception for page 4. Added JangsuKitchenMotion, two new transparent reference-guided poses and reused the approved neutral as ready/rest. New Image Gen calls: 2, no repairs or external API. All four consumer files are 1122x1402 RGBA with transparent corner alpha 0. Reference SHA-256: 61a5f1e493a34f7333e4ef8c0b74f4ebb750b3732e6e14f4ab6ac6525ffec643. Originals preserved.
- Four-frame 4.6-second native timeline: arrive from right, high palm for fridge, alternate low palm for fryer, 500 pulse, gentle body nod and identity-scale rest. Both cards share the animation clock. No late shrink. Re-clicking 주방 or Enter replays number and actor. Decode, visibility pause and reduced-motion static fallback follow the existing chapter pattern.
- Enlarged this chapter's desktop lane to 35vw and 78% height; mobile uses a right portrait, left cards and full-width conditions beneath. The existing 300만원 상당, 200만원 상당, total 500만원 상당 and all eligibility conditions are unchanged. No fabricated equipment illustration or cash-payment claim.
- Poses, prompts, before-source backup and actual browser screenshots remain under Desktop review folder 2026-10-01_닭장수_4페이지_주방지원. Local assets live in public/rebrand/poses/kitchen-support-v1/. Existing page 2 final scale and all other chapters preserved.
- Inspected six viewport sizes, timed pose/card synchronization, exact-size before/after comparisons and keyboard/pointer replay. Final actor transform identity at every size, no horizontal overflow, note/menu clearance at least 17px. Console warnings/errors none. Frontend ESLint, client/SSR build, prerender and Git whitespace checks passed. Root has no check script. No deployment, form submission, commit or push.


## 2026-10-01 — Page 5 royalty zero-push
- Direct user request authorizes local frontend implementation for page 5 under the existing scope exception. Added JangsuRoyaltyMotion and public/rebrand/poses/royalty-zero-v1/. Built-in Image Gen produced 2 new poses, bent-palm preparation and extended push. Reused canonical neutral and the page-3 open-palm presentation. All four files are 1122x1402 RGBA with corner alpha 0; no new paid API or external publication. Original reference hash: 61a5f1e493a34f7333e4ef8c0b74f4ebb750b3732e6e14f4ab6ac6525ffec643.
- Shared 4.2-second native clock: left entrance, anticipation, push in sync with the zero's short slide/overshoot/damping, reveal of the existing waiver-period title, open palm and identity-scale rest. No late shrink. Pointer and Enter replay reset both actor and number. Image decode, offscreen/document pause and reduced-motion static fallback match existing chapter behavior.
- Larger desktop host at 35vw and 78% stage-height limit. Phone portrait sits beside the zero; period, normal rate and note follow full-width below. Reduced unit size gives 0 clear hierarchy. Dark settled palette stays stable during this chapter's replay. Existing 0원, first contract 2 years, normal monthly sales 3.3% and HQ-confirmation wording are unchanged. Other chapters and prior work remain intact.
- Fixed phone hand clipping with vertical portrait clipping plus lateral room. Fixed tall-tablet hand/title overlap by reserving the 36% content start. Inspected 1280x720, 1440x900, 768x1024, 390x844, 375x667, 360x740, timed push/final states, same-size screenshot pairs and keyboard replay. Console warnings/errors none, no horizontal overflow. Lint, client/SSR build, prerender and whitespace checks passed. No root check script. No form submission, deployment, commit or push.
- Before-source backup, adopted assets, prompts and screenshot evidence remain in Desktop review folder 2026-10-01_닭장수_5페이지_로열티. Final scoped review appended to design-qa.md.


## 2026-10-01 — Page 7 consultation invitation
- Direct request authorizes this local frontend scope exception. Added JangsuInviteMotion and consultation-invite-v1 poses. Built-in Image Gen calls: 2, no repairs. Reused approved neutral and the invitation pose for final rest. Four consumer files are 1122x1402 RGBA with transparent corner alpha 0. Reference hash 61a5f1e493a34f7333e4ef8c0b74f4ebb750b3732e6e14f4ab6ac6525ffec643. Native generated originals preserved.
- Shared 4.2-second clock: small forward arrival, open-palm welcome, lower-left consultation guidance, button emphasis, calm open-palm rest at identity scale. Three existing consultation topics emphasize in sequence. No late shrink or idle loop. Same-chapter pointer/Enter replay, decode-before-play, visibility pause and reduced-motion static fallback retain existing contracts.
- Restored the existing consultation CTA in story-only preview. Existing #lead-capture form remains hidden until selected as the URL fragment; :target reveals it. Confirmed desktop and phone anchor navigation and browser Back restoration, without entering data or submitting. Production form handlers and copy unchanged.
- Phone host is a larger waist-up portrait above the CTA, with its gesture visible and a 280px stage-height cap. Fixed stylesheet-order conflict that kept its width at 60vw; scoped rule now applies 78vw. Fixed same-chapter replay returning before alignment after viewport resize: chapter-7 button now also aligns the scroll destination. Other chapters and prior changes preserved.
- Six matching viewport checks plus actual reset viewport 1282x1566 passed: no horizontal overflow, title/button/three topics unobscured, final transform identity. Button, Enter replay and before/after screenshot comparisons inspected. Console warnings/errors none. Lint, client/SSR build, prerender and whitespace checks pass. No root check script. No lead submission, deployment, commit or push.
- Poses, generation prompts, before-source backups and browser evidence remain under Desktop review folder 2026-10-01_닭장수_7페이지_상담. Scoped QA appended below prior reports in design-qa.md.


## 2026-10-01 — Client sample Preview deployment
- User requested a client-shareable sample and explicitly clarified that the live site must remain separate. Deployed source commit d6ea80be9861f4ff5358705392cb4079668d79d2 to Vercel Preview only, with VITE_STORY_ONLY=true, under the existing dakjangsu account/project. Deployment dpl_CGvqw7voNfgS6B1kGuucvBAffSVs is READY. Base URL: https://dakjangsu-franchise-landing-main-final-b2qrundng.vercel.app/; selected page requires concept=rebrand.
- Initial build failed because sparse checkout included docs and frontend but omitted the tracked root api/leads.js entry point referenced by vercel.json. Restored the exact committed file and added api to the local sparse-checkout selection. No application-source change. Preview client build, SSR build, prerender and function packaging then succeeded.
- Verified production remains deployment dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8, commit 647e8462e2487db05d0884542e653e671bfc0849 from July 17. No production promotion or domain reassignment.
- User explicitly approved replacing the older Vercel shareable link after the Hobby-plan warning. New deployment's Anyone with the link access was generated. Shared URL includes _vercel_share and concept=rebrand; bearer-style share value is deliberately omitted from Git. Anonymous session verified HTTP 200 for the page and mascot PNG. Authenticated browser reviewed hero, royalty and consultation, loaded all royalty poses, no overflow and no console warnings/errors. No inquiry submitted. Client communication remains with the user, as requested.
- Browser evidence saved under Desktop draft folder 2026-10-01_닭장수_샘플배포. Shared sample is also open in the in-app browser. No paid upgrade or broader project protection change.


## 2026-10-01 — Public client sample URL
- User requested a plain public URL requiring no Vercel login. Created separate Hobby project dakjangsu-client-sample under dakjangsu-s-projects and deployed the same story with VITE_STORY_ONLY=true. Public sample: https://dakjangsu-client-sample.vercel.app/?concept=rebrand. Deployment dpl_7BhroxUgoZZ1bnPiuyyCT6NED3j7 is READY.
- Used the public/production slot of this dedicated sample project only. The existing main project remains on production deployment dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8, verified through the API. Future public sample updates should target dakjangsu-client-sample, preserving the separate main project and official domain.
- Fresh anonymous requests returned HTTP 200 for the page and mascot PNG with no cookies, bypass token or login redirect. Browser confirmed the rebrand hero and seven-chapter navigation. Evidence: Desktop draft sample-deployment folder, 04-public-no-login.jpg. No inquiry submitted or paid upgrade. Source code unchanged; deployment used the already committed code and documentation state.


## 2026-10-01 — Connect the full landing below the seven chapters
- Direct user request authorizes the local frontend scope exception and integration of all existing lower sections. Removed the rebrand story-only gate and its hiding/:target CSS. The seven existing animated chapters now lead naturally into support detail, menus, space concepts, franchise fit, FAQ, lead form and footer. Existing section anchors and header navigation are restored. Skip link still targets the start of the main story.
- Preserved existing photos, product data, conditional draft benefits, equipment conditions, FAQ and privacy copy. No new copy, artwork, tracking or lead recipient settings. Existing first-seven motions remain, with a compact-height kitchen portrait adjustment to reserve room for the restored detail link.
- Browser validation: native scroll from chapter 7 to support detail; desktop header links; support conditions/FAQ expand/collapse; both space presets; form anchors; inline and footer privacy open/close. Inspected 1280x720 desktop, 768x1024 tablet, 390x844 phone, 375x667 and 360x740 compact chapters. No horizontal overflow, broken completed images or console warnings/errors. Narrow kitchen detail link/menu clearance 8px; compact 375 layout also remains clear. No form submitted.
- Frontend ESLint, client build, SSR build, prerender and whitespace checks pass. No root check script. Source backups and screenshots are in Desktop review folder 2026-10-01_닭장수_전체랜딩연결. Public rollout targets dedicated dakjangsu-client-sample only, preserving the official main project.

- Public full-page rollout complete: dedicated sample deployment dpl_EsFS5Dn9WbWzPygYapS2muvrrafw is READY at the unchanged sample address, from source commit da9a662. Cloud client/SSR build, prerender and function packaging succeeded. Story-only hiding has been retired in the source; the full page is the default rebrand view.
- Anonymous HTTP 200 confirmed the new JS/CSS fingerprints. Public browser confirms all seven main sections visible, menu cards and franchise-fit content readable, no broken completed images/overflow/console warnings. Main-site production remains dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8. No real inquiry submitted.


## 2026-10-01/02 — Full Product Design audit and Korean copy correction
- Direct user request authorizes frontend fixes across the current rebrand sample. Product Design audit, get-context and design QA used the existing URL/code/visual target, without new template initialization. Copywrite, client Voice.md and Korean Style QA used for natural, concrete Korean. Financial values, August proposal status, assumptions, VAT, equipment/operation conditions and company/legal details preserved.
- Captured and inspected every current-run desktop (1440x900) and phone (390x844) step, 01–15: hero, five benefits, invitation, support detail, menu, space, franchise fit, FAQ, form entry, invalid form and footer. Baselines and revised evidence are in Desktop review folder 2026-10-01_닭장수_전체디자인문구검수. Sixteen before/after pixel pairs and a focused assumptions crop were inspected, plus compact phone, narrow phone, short desktop and tablet checks. Final scoped design-qa.md result passed.
- Fixed space image's 900px height override, added accessible mobile section menu, improved secondary text contrast/size, retained fee host size at rest and made its phone portrait consistent, enlarged bounded phone parked growth host, shortened duplicate consultation intro, focused first missing input, and made supplied phone number clickable. Original assets and seven-scene motions retained.
- Replaced vague narration and repeated generic phrases with concrete information. English section filler replaced with Korean labels. Already-natural copy retained where appropriate; no new revenue/testimonial/guarantee or availability claim introduced.
- Added VITE_REVIEW_ONLY=true sample form mode: clear local-only review notice, local required-field validation and explicit not-received confirmation, with return before building/sending a lead payload. Default false retains normal API behavior. False/absent behavior was inspected in source; no real inquiry/call sent. Example env documents the flag. Dedicated public sample deployments must pass VITE_REVIEW_ONLY=true.
- Port 8874 is an existing Vite dev server, whose initial env does not reflect one-off build flags. Used a controlled compiled preview on 8876 for review-mode verification, leaving the existing server intact. Frontend ESLint, client/SSR build, prerender, meaningful browser interactions and whitespace checks pass. Main production remains separate; public rollout targets only dakjangsu-client-sample.

- Final public rollout complete: source c50442e deployed to dedicated sample dpl_6HMWFew7xqxRdrwrjZiCjw16V4Y9 with VITE_REVIEW_ONLY=true. Cloud client/SSR build, prerender and function packaging succeeded. Same public URL requires no login; fresh anonymous HTTP 200 confirms current JS/CSS fingerprints. Public browser verifies support conditions, review-only form notice, privacy dialog and retained hero hover, with no console warnings/errors. Main project API confirms unchanged live deployment dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8. No real inquiry/call or client message sent.


## 2026-10-02 — Portrait composition correction
- Direct user request authorizes frontend correction after the mobile composition review. Portrait at widths up to 700px now uses real vertical chapter heights, centered 260–340px upper-body hosts, full-width details and a sticky chapter menu. Desktop and landscape keep the existing stage. Mobile hero has one orange background; 7,000 and its assumptions remain above the large host, with the 440/0 waiver card and full calculation/conditions below. Existing copy, numbers and raster assets retained.
- Growth keeps the original lift keys and duration, centers both palms within the screen and parks at the full portrait size. Preserves the current reading chapter when changing orientation within the story. Keyboard Explore moves focus to the target heading; all native chapters are readable without inert/aria-hidden gates. No new media execution, source form delivery or backend changes.
- Product Design QA caught and fixed inherited pale nav labels, dark growth-number contrast, compact hero face placement, invitation CTA overlap and orientation scroll loss. Before/after pairs, focused desktop conditions crop and all seven final portrait captures inspected. Evidence: Desktop review folder 2026-10-02_닭장수_세로화면개선. Latest design-qa.md result passed.
- Verified 390x844 chapters, 375x667 hero/invite, 360x740 hero/all-panel bounds, 1440x900 desktop comparison and chapter preservation through 844x390 rotation. Menu, Enter/Explore focus, chapter replay, invitation form anchor and review notice work. Console warnings/errors and horizontal overflow none. ESLint, client/SSR build, prerender and whitespace pass. No real inquiry/call or client message. Public update targets only dakjangsu-client-sample with VITE_REVIEW_ONLY=true.

- Public portrait update complete: source 8a50afd, dedicated sample deployment dpl_6LgachWRNdBPKNoGYAQmZ32MdqsH READY. VITE_REVIEW_ONLY=true preserved. Anonymous HTTP 200/current bundle hashes and public 390x844 hero/growth-rest screenshots confirm the result. Split removed, host remains large, no overflow/console warnings; review-only form notice present. Main production remains dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8 through independent project API verification. Viewport reset; no client communication or real inquiry/call.


## 2026-10-02 — Mobile number and character balance
- Continued mobile feedback correction with a number-led hierarchy. Centered amounts/headings with the host, enlarged hero 7,000 and three-digit amounts, gave the single royalty 0 its own optical size, and reduced hero/benefit portrait slots from 260–340px to 230–280px. Invitation slot remains unchanged. All existing words, conditional amounts, original artwork and desktop layout preserved. Optional preference question remained unanswered; no implied user selection recorded.
- Growth park width now derives from the PNG and lift-canvas aspect ratios to match other portrait actors. Same lift performance and duration remain. Product Design comparisons inspected: four current-run 390x844 pairs and one 1440x900 desktop pair. Also checked compact hero, narrow full unit, kitchen, lift replay/mid/end, no overflow and no console warnings/errors. Evidence: Desktop review folder 2026-10-02_닭장수_숫자캐릭터균형; latest design-qa.md result passed.
- ESLint, client/SSR build, prerender and whitespace pass. No media generation, backend change, real inquiry/call or client communication. Public sample update targets dakjangsu-client-sample with VITE_REVIEW_ONLY=true, preserving the official main project.

- Public balance update complete: source 3687759, sample dpl_2VZAcxviCXi7nzx58QyADC4VJh3f READY with VITE_REVIEW_ONLY=true. Anonymous HTTP 200/current bundle hashes and public hero/royalty screenshots confirm the revision. No overflow/console warnings, review-only notice retained. Official main production remains dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8. Existing user-visible sample tab refreshed; viewport reset. No real inquiry/call or client message.


## 2026-10-02 — Mobile hat foreground layer
- Direct request authorizes this frontend visual correction. Enlarged numeric-scene portrait slots to 270–330px and placed the original host directly after the amount, with the hat slightly covering the lower glyph edge. Titles follow the portrait. Kept heading text/animation selectors and used an aria-hidden phrasing span for the decorative image. Native host and parked growth layer paint in front; desktop and invitation composition retained.
- Used per-scene negative margins to account for font/pose whitespace, with a small royalty-specific adjustment. Moved the existing explicit non-cash qualification above the hero amount so it remains visible on compact phones, with the full calculation below the portrait. All amounts, assumptions, terms and artwork preserved; no generated asset or backend/form change.
- Product Design QA inspected five matched source/after inputs plus a focused hat/amount crop, compact hero, narrow long unit, growth replay/mid/end, invitation CTA and form anchor. No overflow/console warnings; Explore focuses H2, review-only notice retained. Evidence: Desktop review folder 2026-10-02_닭장수_갓레이어. Latest design-qa.md result passed. ESLint, client/SSR build, prerender and whitespace pass. No real inquiry/call or client message. Public rollout targets only dakjangsu-client-sample with VITE_REVIEW_ONLY=true.

- Public hat-layer update complete: source 24482b4, sample deployment dpl_E5AXToxcHpUSyY1tRj6bwKfcE2SH READY with VITE_REVIEW_ONLY=true. Anonymous HTTP 200/current JS/CSS hashes and public 390x844 hero screenshot confirm the larger host, slight numeral overlap and visible non-cash qualification. No overflow/console warnings; review-only notice retained. Main production remains dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8. Existing public tab refreshed; viewport reset. No real inquiry/call or client message.


## 2026-10-02 — Initial 3,000만원 support example
- User clarified the large first amount, rather than the monthly-sales input. Set a coherent review example: monthly sales assumption 2,500만원, opening740 + kitchen500 + credit0 + royalty1,980 = 3,220만원, displayed as approximately3,000만원. First headline now derives from the total instead of a hardcoded7,000. Original benefit rates/conditions elsewhere are unchanged; credit uses the existing sales thresholds and its exclusion is explicit. No result/guarantee or confirmed-offer claim.
- Verified actual component calculations at2,500/3,000/4,000/6,000, mobile/desktop matched screenshots and focused calculation crop. Split the mobile assumption into meaningful lines. Original mascot/hat layer, palette and design preserved. Latest design-qa.md result passed. ESLint, client/SSR build, prerender and whitespace pass. No real inquiry/call/client message. Sample rollout retains VITE_REVIEW_ONLY=true and targets dakjangsu-client-sample only.
