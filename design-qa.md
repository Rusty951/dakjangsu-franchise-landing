# Opening composition QA — 2026-10-01

final result: passed

## Target and evidence

- Existing selected target: the approved orange/ink first chapter with the approximately 7,000만원 conditional total, fee-only zero, and original 닭장수 character. This is a scoped refinement of that design, not a new visual direction.
- Source visual truth: `../dakjangsu-7000-review/big-numbers-verified/01-desktop-1280.png`, `02-mobile-390.png`, and this run's `../dakjangsu-7000-review/before-product-design/02-inapp-before.png`.
- Final implementation: `../dakjangsu-7000-review/product-design-final/01-desktop-1280.png`, `02-mobile-390.png`, `03-mobile-375.png`, `05-desktop-1440.png`, `06-tablet-768.png`, `07-inapp-tall.png`, `08-wide-2048.png`, `09-full-inapp-2508.png`, and `04-reduced-mobile-375.png`.
- Full-view comparisons opened together: `product-design-final/compare-desktop.png` and `compare-mobile.png`. Each places the source on the left and the implementation on the right at identical density and viewport.
- Focused comparisons opened: `product-design-final/compare-conditions.png` and `compare-cta-scope.png`. These retain full-size source and implementation text for the calculation, exclusion, CTA and navigation checks.
- Native in-app evidence: `product-design-final/10-inapp-confirmed-v2.png`. The accepted capture shows the actual target URL and updated composition before the final four-percentage-point actor adjustment. `compare-inapp-confirmed-v2.png` places it beside this run's original native capture. A later capture showing a different user conversation was rejected and removed from the deliverables.
- Viewports: 1280×720, 1440×900, 390×844, 375×667, 768×1024, 1280×1480, 2048×1152, 2508×1560, plus reduced-motion mobile. Automated screenshots use 1 pixel per CSS pixel. Native pane captures are 2596×3322 physical pixels at 2× density, with browser chrome; comparisons use the same crop and density.
- State: first chapter, same route/content/theme. Final responsive captures include the broad waving pose around 4.8 seconds. The earlier compact desktop source shows the standing pose, so pose differences are not treated as fidelity drift. The native before/after pair shows the standing first chapter in both.

## Findings and comparison history

- [P2, fixed] Tall-pane composition had a large blank gap between the heading and the amounts. This run's original native capture shows it. Anchoring the amounts below the heading and enlarging the central character fills that gap; the native comparison and final 1280×1480 capture show the corrected composition.
- [P2, fixed] The first implementation left only 6.41px between the compact desktop CTA and chapter navigation. Reduced the price-row top space and grid gaps without shrinking the numeral fonts. Final 1280×720 evidence gives 20.41px; every normal tested layout now gives at least 14px.
- [P2, fixed] The larger character's waving hand was partly hidden behind the zero at 1440×900. The earlier `product-design/05-desktop-1440.png` shows the issue. Moving its desktop center from 55% to 51% exposes the complete hand in `product-design-actor-final/05-desktop-1440.png`, now copied into the final set.
- No remaining actionable P0/P1/P2 issue was found within this first-scene scope.

## Required fidelity surfaces

- Fonts and typography: retained the local Black Han Sans display face and original body font. Large numerals remain the visual priority. The left numeral is more condensed to stay within its half; headline and CTA copy changes are intentional. Conditions remain readable and untruncated in the inspected phone and desktop captures.
- Spacing and layout: preserved the equal split, chapter navigation and fee-first exploration flow. Both amounts stay inside their reading lanes. The desktop actor fits between the amounts; the mobile actor remains in its prior reserved lane. No horizontal overflow, price/condition collision, or CTA/navigation collision was measured in the final set.
- Colors and tokens: retained orange `#d86535`, ink `#241f1b` and cream `#fff8ed`. Small text on orange uses ink; small text on ink uses cream. Draft and assumption labels retain their contrasting surfaces. No new decorative assets or palette were introduced.
- Image quality: retained the canonical greeting and standing raster artwork inside the existing motion component. No replacement illustration, logo, or approximate code drawing was introduced. The inspected larger render has no new clipping; the waving hand is visible after the final correction.
- Copy and content: preserves the 740 + 500 + 1,200 + 4,752 = 7,192만원 example and approximately 7,000만원 display. Monthly sales of 6,000만원 for 24 months are explicitly assumptions, with all eligibility conditions met. HQ confirmation remains pending. The zero is labeled 가맹비·교육비 and explicitly excludes total startup costs, rent and interior.

## Interaction and validation

- The primary exploration button reaches existing chapter 1 (가맹비) in all eight normal responsive cases; no inquiry is submitted.
- Static reduced-motion mobile remains readable in normal document flow. Its CTA was not exercised in this final run.
- Browser console/error events: zero in the isolated Chrome responsive runs. In-app automation was unavailable; native captures verify its visible rendering, not its console.
- ESLint, client build, SSR build, prerender and whitespace checks passed. There is no project check/test script.
- Frontend files: `src/frontend/src/components/RebrandHeroOffer.jsx` and `RebrandHeroOffer.css`. Earlier working-tree changes and the original checkout remain preserved.

## Limits and follow-up

- This pass covers the first scene and its exploration action. Forms, backend delivery, real conversion, performance and full accessibility compliance were not tested.
- Public benefit amounts and eligibility wording still require HQ confirmation; this remains a local review draft.
- No source commit, push, inquiry submission or deployment was performed.

Implementation checklist: complete. Keep the local preview available for review.

## Latest iteration — larger character

The user's following request enlarges 닭장수 substantially on desktop and mobile. Latest evidence, fixes and the passed QA result are recorded in [design-qa-big-character.md](design-qa-big-character.md). Prior evidence above remains the source for this scoped size refinement.


## Latest iteration — Page 2 settle and mobile portrait

final result: passed

### Target and comparison evidence

The user accepted the Product Design size review: preserve the large introduction, reduce the desktop rest size by 10% and move slightly aside, and use a larger waist-up phone portrait. Scope is page 2 only. Earlier first-scene QA sections remain historical evidence, not a rerun of that scope.

- Source visual truth: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/2026-10-01_닭장수_크기검토/01-current.jpg` (1280x720 desktop) and `02-mobile.jpg` (390x844 phone), both the settled fee chapter before this edit.
- Matched final implementation: `03-desktop-after.jpg` and `04-mobile-after.jpg` in the same folder, same route, theme, chapter, content and settled pose. CSS sizes and pixels match 1:1; no density normalization or browser-chrome crop was needed.
- Full-view source-left / implementation-right comparisons were created without rescaling and actually inspected together: `05-desktop-comparison.png` (2584x720) and `06-mobile-comparison.png` (804x844), with a 24px gap. The desktop preview may be display-scaled by the image viewer; full-size single viewport captures were also inspected for details.
- Compact phone comparison history: initial candidate `08-small-mobile-rest.jpg` versus fixed `10-small-mobile-final-rest.jpg`, both 375x667; inspected together in `11-small-mobile-comparison.png` (774x667). Final main-gesture evidence is `09-small-mobile-final-press.jpg`. Final 360x740 evidence is `13-narrow-mobile-final.jpg`.
- Separate focused crops were unnecessary for this scoped size edit: full-size phone pairs make the face, hands, logo and every changed line readable, while the desktop single capture preserves legible copy at its original 1280x720 pixels.

### Findings and iteration history

- [P2, fixed] The first 375x667 portrait remained too small below the copy, so face and hand motion were hard to distinguish. Replaced this short-phone arrangement with facts on the left and a 210px portrait lane on the right, constrained by heading and menu positions. Final paired evidence shows the larger face and preserved fee labels, amounts and note.
- The same compact treatment applies through 780px phone height; the final 360x740 image shows the larger portrait, full condition note and reachable navigation without horizontal overflow.
- Desktop scale .9 and 26px retreat are intentional. Phone crop excludes the lower body; the lowered resting hand may meet that waist crop. The meaningful downward press remains fully visible. No actionable P0/P1/P2 finding remains within this scope.

### Required fidelity surfaces

- Fonts and typography: retained existing families, fallbacks, sizes, weights, digit treatment and color. Desktop wrapping is unchanged. Short-phone facts and conditions intentionally wrap in a narrower column and remain untruncated.
- Spacing and layout rhythm: desktop motion retains the large presentation and settles gently to .9 scale. Normal phones move the fee copy upward modestly to reserve a portrait lane. Short phones use a side-by-side facts/portrait layout; header, 440 emphasis and chapter navigation remain readable.
- Colors and tokens: retained cream, dark ink and the existing temporary warm-ink accent; settled comparisons have the same source palette. No new decorative drawing or visual token.
- Image quality and asset fidelity: reused all four existing transparent raster poses with unchanged face, clothing, logo and proportions. Mobile uses a viewport crop with a top allowance for the hat and moving hands; no new image generation or substitute illustration.
- Copy and content: fee 275만원 plus training 165만원 equals 440만원; VAT wording and the unconfirmed proposal/conditions remain exactly the existing content. No public claim was added.

### Interaction, validation and limits

Native in-app captures verify settled desktop scale matrix(.9,0,0,.9,26,0), readable phone crops, the downward hand gesture, and no horizontal overflow. Pointer replay and Enter-key replay work; the latter changes the fee host from settled to playing. Browser warnings/errors: none. ESLint, client build, SSR build, prerender and Git whitespace checks pass. Reduced-motion phone cropping was reviewed in source; preference emulation, full accessibility, real inquiries and production performance were not tested. No deployment, commit or push.

Implementation checklist: complete for this scoped page-2 adjustment.


## Latest iteration — Page 3 opening-support presentation

final result: passed

### Target and evidence

The user requested page 3 from the agreed action map: a left-side host presents the three existing support items, connects them to 740만원 상당, and finishes at full size. New cards and reference-guided poses are intentional changes to this existing scene; other chapters are outside the comparison scope.

- Source visual truth: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/2026-10-01_닭장수_3페이지_오픈지원/연결검수/01-desktop-before.jpg` (1280x720) and `02-mobile-before.jpg` (390x844), both chapter 3 with the number settled and the old host standing.
- Final implementation: `05-desktop-rest.jpg` and `07-mobile-rest.jpg` at exactly the same viewport, theme, route and settled chapter. Pose/scale and card treatment differ intentionally under the user's request.
- Inspected source-left / implementation-right pixel comparisons: `12-desktop-comparison.png` (2584x720) and `13-mobile-comparison.png` (804x844), created with a 24px gap, no rescaling and no browser chrome. CSS viewport and image pixels are 1:1. The desktop overview may be display-scaled by the viewer; full-size single captures were also inspected for text.
- Timed evidence: `03-desktop-first-card.jpg`, `04-desktop-all-cards.jpg` and `06-mobile-present.jpg`. Read-only inspection confirmed the early sequence's first two cards had reached full opacity while the third remained at .55, then all three became fully visible, followed by the neutral finish.
- Additional states: `08-small-mobile-present.jpg` (375x667), `09-wide-desktop-rest.jpg` (1440x900), `10-tablet-rest.jpg` (768x1024), and `11-narrow-mobile-rest.jpg` (360x740). Normal final widths equal viewport widths. The narrow phone finishes with identity transform, without end shrink.
- Separate focused crops were unnecessary: the original-size phone pair makes the face, presenting hand, complete card labels/values and note readable. Desktop note and card detail were inspected in the single 1280x720 capture.

### Findings and fixes

- [P2, fixed before integration] Initial generated preparation/intermediate poses barely differed from the full extension and shifted the character. Rejected those two candidates, edited them from the full-presentation pose to create an apron-reaching hand and a distinct short offering hand, then inspected the three adopted PNGs. Kept the existing canonical neutral PNG for the finish and applied a small pose-registration offset in the UI. No further generation after the five-call batch including repairs.
- Compact desktop cards use smaller padding/minimum height to protect the explanatory note and navigation. In final captures, note clearance to the menu is about 34px at 1280x720, 42px at 1440x900, 145px at 768x1024, 173px at 390x844, 53px at 375x667 and 64px at 360x740.
- No actionable P0/P1/P2 visual issue remains within page 3. Discrete raster-pose changes are an expected property of the selected four-pose technique, not continuous anatomical interpolation.

### Required fidelity surfaces

- Typography: retained the existing display heading, 740 numeral and unit hierarchy. Cards keep the existing information; phone labels use 12px and values 16px to fit the narrow right column, with intentional wrapping and no truncation.
- Layout: desktop host is larger on the left, with three readable support cards on the right. Phone host uses a left waist-up viewport while cards and the complete note remain on the right. Full-size rest is deliberate; the final transform is identity.
- Colors/tokens: retained dark ink, cream and warm numeric accent. Cream cards with dark text are an intentional semantic UI treatment in the existing palette, not substitute illustration assets.
- Imagery: three adopted transparent reference-guided poses plus the previously selected neutral pose, all 1122x1402 RGBA with genuine transparent corners. Original artwork remains intact; no mirroring of the Korean logo or approximate SVG/div mascot. Photo-pose generation and its repairs are recorded in the job's 생성프롬프트.txt.
- Copy/content: existing fee/training waiver 440만원, 200 chickens valued at 100만원 상당 and opening marketing 200만원 상당 are unchanged. Total remains 740만원 상당, explicitly including the preceding 440만원 and representing waiver, in-kind and marketing support rather than cash. This remains the existing review proposal.

### Interaction and limits

Pointer replay and Enter-key replay restart both number and host. The shared 4.6-second clock coordinates three offering gestures, sequential card emphasis and the total pulse, then becomes still. Browser warnings/errors: none. ESLint, client build, SSR build, prerender and whitespace checks pass. Reduced-motion static cards/portrait were reviewed in source; preference emulation, full accessibility, production performance, API delivery and real inquiry submission are outside this pass. No deployment, commit or push.

Implementation checklist: complete for page 3.


## Latest iteration — Page 4 kitchen support

final result: passed

Target: the agreed right-side host alternately presents the refrigerator and fryer, emphasizes their 500만원 상당 total, then rests at full size. New cream cards and larger reference mascot are intentional changes.

Evidence folder: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/2026-10-01_닭장수_4페이지_주방지원/`.
- Source: before-desktop.jpg (1280x720), before-mobile.jpg (390x844), settled chapter 4, same route and theme.
- Implementation: after-desktop.jpg and after-mobile.jpg at matching viewport and settled state. Inspected comparison-desktop.png (2584x720) and comparison-mobile.png (804x844): original pixels, 24px gap, no rescaling in files. Desktop pair viewer resized both sides equally; original-size singles were also inspected.
- Timed: desktop-fridge.jpg first pose, first card opacity 1 and second .55; mobile-fryer.jpg second pose; preview-fryer.jpg fully readable 500 and both cards. Exactly one pose layer visible. No face crossfade.
- Additional inspected rest captures: 1440x900, 768x1024, 375x667, 360x740. All document widths equal viewport widths. Note clearance to menu: 45px at 375x667, 17px at 360x740, 178px at 768x1024, 108px at 1440x900. Final actor transform matrix(1,0,0,1,0,0).

Fidelity surfaces:
- Typography: preserved heading, 500 numeral and unit hierarchy. Mobile cards intentionally stack 13px labels and 18px values, without truncation.
- Layout: larger right host on desktop, waist-up right portrait and left cards on phones; long conditions full-width beneath the portrait row. Source-to-result relocation is intentional. No text or footer occlusion in observed states.
- Colors/tokens: existing orange, dark ink and cream. Card surfaces intentionally improve separation and match chapter 3 treatment.
- Imagery: two new arm gestures retain canonical face/clothing/logo, no mirrored Korean lettering, plus exact neutral reuse. RGBA/corner-alpha validated; no equipment imagery represented as a factual supplied product.
- Copy: unchanged refrigerator 300만원 상당 and fryer 200만원 상당, totaling 500만원 상당. Retained conditional first-five-store eligibility, minimum 15평, commercial-area condition, full new interior and HQ review, 24-month operation. This remains the existing proposal wording.

No actionable P0/P1/P2 issue remains in this scoped pass. Discrete pose switches remain a limit of the user's chosen raster-pose method. The small body dip communicates a nod without independently articulating the head.

Pointer and Enter replay verified. Decode-before-playback and visibility/reduced-motion handling inspected in code; reduced-motion preference emulation unavailable in this browser. No full accessibility, live form delivery or production-performance certification. Browser warnings/errors none. ESLint, client build, SSR build, prerender and whitespace checks pass. Implementation checklist complete for page 4. No deployment, commit or push.


## Latest iteration — Page 5 royalty zero-push

final result: passed

Target: the agreed left host pushes the large zero into place, introduces the first-two-year waiver proposal, and finishes with an open palm at full size. Larger host, smaller unit and cream normal-rate card are intentional changes to this chapter.

Evidence folder: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/2026-10-01_닭장수_5페이지_로열티/`.
- Source: before-desktop.jpg (1280x720), before-mobile.jpg (390x844), settled chapter 5, identical route/theme.
- Final: after-desktop.jpg and after-mobile.jpg, same viewport and settled state. Inspected source-left/implementation-right comparison-desktop.png (2584x720) and comparison-mobile.png (804x844), 24px gap, original pixels/no file rescaling. Desktop overview displayed smaller by viewer; full-size originals inspected too.
- Timed: desktop-push.jpg and mobile-push.jpg. Read-only DOM confirmed one visible push pose and the zero's in-progress native transform at about 2 seconds, then final open-palm pose only, identity actor/zero transform and settled phase after 4.2 seconds.
- Additional full-size rest captures: 1440x900, 768x1024, 375x667, 360x740. No horizontal overflow, identity final actor at all sizes. Final note-to-menu clearance about 22px at 1280x720, 71px at 1440x900, 294px at tablet, 87px at 375x667 and 89px at 360x740.

Findings fixed:
- [P2] Phone push hand was cut by portrait overflow. Replaced horizontal clipping with a clip-path that retains vertical waist crop and permits lateral arm movement. Final mobile-push.jpg shows complete palm and fingers.
- [P2] Tall-tablet auto-centered copy placed the title behind the presenting hand. Scoped positioning at 36% gives the hand/text separate lanes; final rest-768x1024.jpg inspected after rebuild.
- No actionable P0/P1/P2 issue remains within this pass. The selected four-raster-pose method uses discrete arm changes, with smooth whole-body and number transforms; it is not continuous skeletal animation.

Fidelity surfaces:
- Typography: preserved existing Korean display family, period/title wording and large zero. The unit is deliberately smaller to prioritize the numeral. Phone zero is sized for the side-by-side host; title stays full-width below.
- Layout: larger left host beside zero on both desktop and phone. One readable cream card for the normal rate, full-width eligibility note on phones. Scoped tall-tablet placement prevents hand/title collision.
- Colors/tokens: existing dark ink background, cream lettering and cream card. Kept the settled dark palette during replay rather than flashing back to cream.
- Imagery: two generated cutouts plus two existing reference poses. Canonical face/hat/clothing/logo retained, Korean text never mirrored. All 1122x1402 RGBA with transparent corner alpha 0. Small pose-registration offset aligns the push/presentation images; no final shrink.
- Copy: original 매달 내는 로열티, 0원, 첫 2년 전액 면제안, 정상 로열티 월 매출액 3.3% unchanged. Note still specifies first contract 2 years and unconfirmed draft/HQ conditions.

Pointer and same-chapter Enter replay verified. Browser warnings/errors none. Decode-before-play, visibility pause and reduced-motion fallback inspected in source; reduced-motion preference emulation unavailable. No full accessibility/performance/live form certification. ESLint, client build, SSR build, prerender and whitespace checks pass. Implementation checklist complete for page 5. No deployment, commit or push.


## Latest iteration — Page 7 consultation invitation

final result: passed

Target: right-side host welcomes the visitor, guides the consultation CTA and rests large and calm. Existing copy and consultation topics stay intact. The CTA/form connection is intentionally restored in story-only preview as part of the final chapter.

Evidence directory: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/2026-10-01_닭장수_7페이지_상담/`.
- Source: before-desktop.jpg (1280x720), before-mobile.jpg (390x844), settled chapter 7, same route/theme. The source phone had no visible host because its action anchor was hidden and the actor's measured available height collapsed.
- Final: after-desktop.jpg and after-mobile.jpg at the same viewport/state, neutral pointer. Inspected exact-size source-left/result-right comparison-desktop.png (2584x720) and comparison-mobile.png (804x844), 24px gap, no rescaling in files. Desktop pair is viewer-scaled equally; full-size singles inspected too.
- Timed desktop-guide.jpg and mobile-guide.jpg: guide pose at about 2.5 seconds, button scale/lift/glow on the same clock. Read-only DOM confirmed only guide pose visible, then only rest pose and identity actor transform after 4.2 seconds. No idle looping or final shrink.
- Inspected rest-375x667.jpg, rest-360x740.jpg, rest-768x1024.jpg and rest-1440x900.jpg. Final stage top is 66px on phones, 80px on desktop/tablet, without heading cropping. No horizontal overflow at any size. Three-topic list/menu clearance: 11px on phones, 58px at 1280x720, 110px at 1440x900, 189px at tablet. Additional reset-view screenshot preview-final.jpg is 1282x1566 with all content/host/CTA visible.
- CTA interaction evidence: consultation-form-mobile.jpg and consultation-form-desktop.jpg show the existing empty form after anchor selection. Browser Back removes the fragment and restores the story-only scene. No personal data entered or inquiry submitted.

Findings fixed:
- [P2] Existing preview hid CTA and all form content. Removed CTA hiding and added a scoped :target rule for the existing form; confirmed actual scroll to it on desktop/phone.
- [P2] Later generic CSS reduced phone host width, showing too much full body. Increased selector specificity for the intentional 78vw waist-up crop; face and active palm remain visible, outer right silhouette may meet the viewport edge by design.
- [P2] Last-chapter replay returned early after resizing, leaving the stage partly above the header. Replay now also aligns chapter 7; all final matched viewport captures show complete headings and correctly positioned menu.
- No actionable P0/P1/P2 remains in this scope. Four raster poses still switch discretely, accompanied by smooth whole-body/button transforms.

Fidelity surfaces:
- Typography: preserved existing Korean display heading and support text, CTA label and three consultation topics. No claim or new marketing copy added.
- Layout: desktop large right host plus left content/button; phone larger right portrait sits above the full-width CTA. Original headline moves higher on desktop because the previously hidden action now occupies real space. Intentional, without overlap.
- Colors/tokens: existing orange/ink/cream, dark CTA with its existing cream hover. Soft one-time border emphasis accompanies the guide gesture.
- Imagery: exact approved neutral plus two reference-guided invitation/lower-guide poses; invitation reused as rest. Same character, hat, clothing and Korean apron logo, no mirroring or vector substitute. All RGBA, corner alpha 0, source originals intact.
- Copy/content: unchanged 내 점포에는 어떤 혜택이?, point of contact for visitors with/without a store, 희망 지역, 점포 조건 and 적용 혜택. Existing consultation form revealed locally; handler and destination unchanged.

Pointer replay, same-chapter Enter replay, anchor navigation and Back restoration verified. Console warnings/errors none. Decode, offscreen/document pause and reduced-motion static behavior inspected in source; preference emulation unavailable. No full accessibility/performance/live-delivery certification. Lint, client build, SSR build, prerender and Git whitespace checks pass. Implementation checklist complete for page 7. No deployment, commit or push.
