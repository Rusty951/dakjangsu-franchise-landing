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
