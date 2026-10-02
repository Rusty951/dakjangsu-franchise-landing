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


## Latest iteration — Full lower landing integration

final result: passed (local integration)

User requested all existing content beneath the seven chapters. The scope is restoring a continuous page and checking directly affected layout/interactions, without redesigning or changing commercial claims.

Evidence: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/2026-10-01_닭장수_전체랜딩연결/`. Screenshots include desktop story end/transition, support detail, menu, wide space, open FAQ, form; compact fee/opening/kitchen scenes; phone menu, narrow space, FAQ, form/footer; tablet space.

- Native scrolling from scene 7 reaches the support section. All seven main sections and footer have visible computed display values without fragment selection. Header and chapter-detail links reach their existing targets. Desktop header remains 80px, phone 66px.
- Existing support detail and FAQ expand/collapse, space presets switch the actual image, form anchor reaches the existing empty form, and both privacy controls open/close. No inquiry or external message sent.
- [P2, fixed] Restoring the kitchen detail link put its bottom too close to the short-phone menu and over it on 360x740. Reduced reserved detail-row height at compact heights and adjusted the portrait crop to preserve visible face/gesture size. Final 375 and 360 screenshots inspected; narrow copy/menu clearance is about 8px.
- Typography/content: existing heading hierarchy, values, terms and draft qualifiers retained. Full content is intentional. No new facts or claims.
- Layout/colors: retained chapter orange/ink, cream support detail, light menu/FAQ and dark space/form. Header navigation and footer reappear under the full-page request. Main content order matches the existing code.
- Imagery: reused existing real menu imagery and labeled space concepts, plus the previously adopted mascot poses. Broken completed images: none. Phone portrait retains its visible face and left-side content remains readable.
- Checked desktop, tablet and phone/compact sizes. No horizontal overflow or console warnings/errors. Existing source matches captured interactions; unrelated chapters remain unchanged.

ESLint, client/SSR build, prerender and whitespace checks pass. Backend delivery, real form submission, full accessibility/performance certification and legal copy review are outside this integration pass. Public update is limited to the dedicated sample project; main site is preserved.

Public rollout verification: passed. Same sample URL now serves source da9a662 in deployment dpl_EsFS5Dn9WbWzPygYapS2muvrrafw. Anonymous 200/new bundle fingerprints, public main-section display and menu/fit screenshots (18-public-menu.jpg, 19-public-menu-cards.jpg, 20-public-fit.jpg) confirm the integrated result. Main production unchanged.


## Latest iteration — Full Product Design and Korean copy audit

final result: passed

Compact-height verification, matched comparisons and public rollout are complete. Existing seven-chapter visual target, orange/cream/ink palette, mascot poses, real product photos and labeled space concepts are retained. User requested full desktop/mobile critique and correction, including natural Korean copy.

Evidence root: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/2026-10-01_닭장수_전체디자인문구검수/`. Current-run source captures are in before/, revised captures in after/. Desktop 1440x900 and phone 390x844, actual browser screenshots, 1:1 image/CSS pixels. Extra 375x667, 360x740, 768x1024 and 1280x720 checks follow.

Initial findings and adopted fixes:
- [P1] before/10-mobile-space.jpg and read-only geometry show a 350px-wide space image with fixed 900px height, despite a declared aspect ratio. It cropped the layout into a ceiling strip. Set height:auto, preserve full image with contain and 14/9 viewport. after/10-mobile-space.jpg now measures 350x225 and reveals tables/kitchen, with readable conceptual-image disclosure. Both presets inspected.
- [P2] before/01-mobile-hero.jpg has no section navigation; only the consultation CTA is visible. Added a text-based 44px menu disclosure with six links, Escape focus return and close-on-link. after/16-mobile-menu-open.jpg accepted; Enter/Escape/navigation behavior verified.
- [P2] Fee host is small below the phone copy, and desktop finish shrinks by 10%. before/02 captures document both. Reserve a phone portrait beside the facts/note at all heights and remove late shrink. after/02 captures preserve identity and show the larger finish. Growth's phone parked host also gets a larger bounded allowance while its lift remains unchanged.
- [P2] Supporting prose is small and muted, while editorial copy repeats vague phrases and decorative English. Made primary body 16–17px, notes 12–13px with full opacity, darker secondary ink, and Korean section labels. Source Voice.md and Korean Style QA applied. Actual benefit values, dates, VAT, assumptions and eligibility clauses preserved, not converted into confirmed offers.
- [P2] before/13-mobile-form.jpg shows a long duplicate introduction before the first field. Shortened to two-line intro and direct form heading; removed redundant mobile mascot block. after/13-mobile-form.jpg shows all three required fields within/at the first viewport.
- [P2] Blank submission leaves the first missing field at -459px and focus on the submit button in before/14-mobile-form-errors.jpg. Added focus and center scroll to the first missing field. after/14 shows lead-name focused at about 396px, all four errors still available. No source validation rule weakened.
- [P2] Public sample's form looks like a real submission path. Explicit VITE_REVIEW_ONLY mode labels it and checks sample input without constructing/sending a lead payload. after/18 confirms the clear not-received message using fabricated test values. Real API path remains when this flag is absent/false. No real inquiry sent.
- [P3] Footer phone is static and text excessively heavy. Made the supplied number a tel link, adjusted weight/size and contact-row alignment. Phone href inspected without initiating a call; company/legal details unchanged.

Flow coverage: 1 hero, 2 fee, 3 opening, 4 kitchen, 5 royalty, 6 growth, 7 invitation, 8 support details, 9 menu, 10 space, 11 franchise fit, 12 FAQ, 13 form entry, 14 validation, 15 footer. Source screenshots for every step accepted in this run; later report records final state.

### Final comparison and verification

- Full-view same-size comparisons inspected in after/compare-*.png: hero desktop/phone, fee desktop/phone, opening/kitchen/royalty/growth/invitation phone, menu desktop/phone, space desktop/phone, form desktop/phone and phone errors. Desktop pairs are 2904x900 (1440x900 each plus 24px); phone pairs are 804x844 (390x844 each plus 24px). No rescaling in files. Viewer downscales large desktop pairs equally; original single captures also inspected.
- Focused after/focus-desktop-assumptions.png compares the same x35/y680/w650/h135 region at 1:1, preserving the 7,192 calculation, item sum and conditional/non-cash wording. Phone pairs remain 1:1 and cover dense dates/conditions/fields without needing extra crops. Before/after form-error scroll positions intentionally differ because correcting focus/scroll is the fix.
- Before/08-mobile-benefits.jpg and before fit/FAQ captures include adjacent sections from minimal heading scrolling, whereas final mobile anchors land at their sections. These are flow evidence, not pixel-alignment evidence; no false layout-drift finding is based on that difference.
- Matched screenshots confirm the five surfaces: display/sans hierarchy preserved with clearer 16–17px body and 12–13px opaque notes; spacing/crop purposeful; orange/cream/ink retained; original raster assets and existing icons kept; copy reviewed against Voice and Korean Style QA, with values/conditions preserved.
- Selected solid-token contrast calculations: muted ink/paper 6.49:1, ink/orange 4.53:1, cream body/ink 11.10:1, review note 10.10:1. These are specific token checks, not a full accessibility certification.
- Extra 375x667 and 360x740 checks cover all seven scenes. Notes/links remain above the phone menu (minimum measured 13px at 375 opening); no horizontal overflow. 1280x720 opening link shares the menu's vertical band in a separate left lane, with no overlap; its note stays above the menu. 768x1024 space image is about 704x453 and remains complete. Extra captures are compact-*, narrow-*, short-desktop-* and 19-tablet-space.jpg.
- Menu Enter/Escape/focus return and close-on-navigation verified. Space presets, FAQ/conditions expand, required-field focus, sample-only validation, footer tel href and form anchors work. Same-chapter replay/visibility/reduced-motion code preserved. Browser warnings/errors: none in observed states. Real inquiries/calls, screen-reader traversal, OS motion preference emulation, 200% zoom, performance profiling and legal-policy validity are outside this pass.
- No actionable P0/P1/P2 remains within the audited surface. No AI-detection or human-authorship claim is made. Implementation checklist complete for the desktop/mobile design/copy fixes; source lint/client/SSR/prerender checks passed.


Public rollout verification: passed. Dedicated sample deployment dpl_6HMWFew7xqxRdrwrjZiCjw16V4Y9 is READY from source commit c50442e, with VITE_REVIEW_ONLY=true. Anonymous HTTP 200 serves the latest JS/CSS fingerprints at https://dakjangsu-client-sample.vercel.app/?concept=rebrand. Public browser verifies expanded support conditions, visible review-only form notice, privacy open/close and preserved 7,000 hover animation; console warnings/errors none. Evidence after/20-public-conditions.jpg and after/21-public-hero-hover.jpg. Main production remains dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8, independently rechecked through the Vercel project API. No real inquiry or call sent. Temporary viewport override reset; public sample retained as deliverable.


## Latest iteration — Portrait chapter composition

final result: passed

The user approved correcting the portrait composition after the focused review. Source truth is the current public sample, captured again in this run: Desktop review folder 2026-10-02_닭장수_세로화면개선/before/01-hero.jpg, 02-fee.jpg, 06-operations.jpg and desktop-hero.jpg. The selected change is a single orange hero, a dominant 7,000 example, a separate 0-won waiver card below the character, large upper-body portraits and vertically flowing details. Existing desktop composition and approved assets are the reference for unaffected surfaces. This is an intentional responsive correction, not a pixel clone of the cramped phone layout.

Implementation evidence is in the same folder's after/: 01–07 chapter screenshots, 01b-hero-conditions.jpg, 06b-operations-motion.jpg, 08-form-anchor.jpg, compact-hero.jpg, compact-consultation.jpg, narrow-hero.jpg and desktop-hero.jpg. All saved screenshots inspected. Browser viewport 390x844, source and implementation 390x844 pixels, no density rescaling. Full-view comparison pairs compare-01-hero.png, compare-02-fee.png and compare-06-operations.png are 804x844, with a 24px gap. Desktop source and after are 1440x900, combined pair 2904x900; viewer downscaled both equally to 2048x635, with original singles also inspected. All four same-input comparisons inspected. Focused compare-desktop-conditions.png is the same x35/y680/w650/h135 crop on each side at 1:1, confirming preserved assumptions and sums. Phone comparisons are 1:1 and their condition text is readable; moving detailed conditions below the first viewport is intentional and documented by 01b.

Findings and correction history:
- [P1, fixed] Mobile hero split the narrow viewport into two competing colored columns. Portrait now uses one orange surface. The 7,000 calculation and its monthly-sales assumption/non-cash qualification remain together; the 440 waiver/0 card and complete sum and eligibility note follow below the large host. No claim, value or condition removed.
- [P2, fixed] Phone scenes squeezed prose beside small hosts and left large dead areas. Portrait chapters now have their real document height, full-width descriptions and a 260–340px portrait slot. All seven chapters remain readable in native flow, without inert/hidden content. A 52px chapter menu sticks beneath the existing header and leaves the story at its end. Desktop/landscape retain the original virtual stage.
- [P2, fixed during iteration] Initial revised chapter buttons had inherited cream text on a pale surface. Explicit ink/cream active states restored readable labels. Initial growth number inherited ink on a dark resting surface; restored the original orange resting scene and dark performance phase.
- [P2, fixed during iteration] First compact capture showed mostly a hat at the fold. Tightened hero title and stat spacing; 375x667 now shows the complete face, with detail content available by normal scrolling. No smaller condition text was used to achieve this.
- [P2, fixed during iteration] Initial invite capture retained absolutely positioned CTA/topics and overlapped the portrait. Restored those controls to normal flow; final 07 screenshot has a clear portrait-to-button boundary. CTA reaches the existing review-only lead form.
- [P2, fixed] Growth rest no longer shrinks into a tiny figure. Lift parks into the same large slot and clips the lower body after parking, while its palms remain fully within the screen during the lift. The original keys and 4.2s act are reused.
- [P2, fixed during iteration] Rotating from portrait to landscape collapsed the track and lost the current chapter. Preserve the last valid chapter when changing layouts, only while reading the story. Verified chapter 6 in both directions: desktop stage top 80px, portrait chapter top about 118px. Layout updates happen before paint.

Required fidelity surfaces:
- Typography: existing Black Han Sans display, Arial benefit numerals and sans body retained. Portrait labels 11–14px, conditions 12–13px, detail copy 14–18px, strong titles 27–42px. No clipped Korean title or amount/unit at 390, 375 or 360 widths.
- Layout: portrait is a real vertical reading sequence; notes and controls can extend beyond one viewport. All seven panel notes stay within their owning panel at 360x740, no horizontal overflow. Full-width cards and centered hosts replace narrow side lanes. CTA and menu do not overlap portraits.
- Colors: orange/ink/cream retained. Single-color portrait hero, original fee/opening/kitchen/royalty themes, orange growth rest with dark lift. Desktop split hero matches its source.
- Imagery: exact original RGBA poses, original lift WebPs and neutral cutout retained. Upper-body crop is intentional; faces, hats and invitation/royalty hand gestures remain visible. No new assets, vector substitute or generation.
- Copy: every benefit value, draft status, monthly-sales assumption, sum, non-cash statement and detailed qualification retained. Reordered phone content uses the same component/data; lower landing copy and form delivery settings untouched.

Validation: all seven portrait chapters captured and inspected at 390x844. 375x667 hero/invite, 360x740 hero/all-panel geometry, desktop 1440x900 comparison, and 390x844 ↔ 844x390 chapter-preservation checks pass. Header menu opens/closes with Escape and returns focus; chapter buttons and hero Explore work; keyboard Explore focuses the target H2. All seven native panels have no inert/aria-hidden restriction. Invitation reaches the review form, chapter menu exits above lower content, no horizontal overflow or console warnings/errors. ESLint, client build, SSR build, prerender and Git whitespace checks pass. No root check script.

Limits: no physical-phone address-bar/keyboard measurement, screen-reader traversal, OS reduced-motion emulation, full WCAG certification or production performance profile. Reduced-motion static slots, content availability and no split hero inspected in source. No real inquiry/call/client message. Implementation checklist complete; rollout remains limited to the dedicated public sample.


Public rollout verification: passed. Dedicated sample dpl_6LgachWRNdBPKNoGYAQmZ32MdqsH is READY from source 8a50afd, with VITE_REVIEW_ONLY=true. Cloud client/SSR build, prerender and function packaging passed. Fresh anonymous HTTP 200 confirms index-Bcd7Gb0a.js and index-BUKKL3im.css at the stable public sample URL. Public 390x844 hero and growth-rest screenshots, after/09-public-hero.jpg and after/10-public-operations.jpg, inspected and match the local result; split pseudo-element display:none, portrait mode active, no overflow, review-only form notice present and console warnings/errors none. Main project API confirms unchanged production dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8. Temporary viewport override reset and public sample retained as deliverable.


## Latest iteration — Number and host balance on portrait phones

final result: passed

User feedback: mobile numbers and the host felt unbalanced. Adopted a number-led hierarchy for benefit scenes, while asking an optional preference question; no answer was treated as approval. The continuing correction request authorizes this scoped implementation. Single-color hero and native portrait flow remain. No copy, commercial data, assets, desktop layout or consultation behavior changed.

Source truth: fresh public captures in Desktop review folder 2026-10-02_닭장수_숫자캐릭터균형/before/, 01-hero.jpg, 02-fee.jpg, 05-royalty.jpg, 06-operations.jpg and desktop-hero.jpg. Revised render: same folder after/ matching files, plus 04-kitchen.jpg, narrow-opening.jpg, compact-hero.jpg and 06b-motion.jpg. Source and implementation phone viewport/pixels 390x844, desktop 1440x900. Four combined phone inputs compare-01/02/05/06-*.png are 804x844 with a 24px gap, no rescaling; all inspected at 1:1. Desktop compare-desktop.png is 2904x900, viewed with equal downscaling to 2048x635; original source and revised files also inspected. The saved desktop image is complete at 1440x900; the combined input confirms the same composition. No separate focused crop required: affected phone numbers, units, faces and nearby qualifications are readable at 1:1; dense desktop conditions are outside the CSS change and remain unchanged.

- [P2, fixed] Numbers were left-aligned while the host was centered, creating two separate visual centers. Centered benefit headings and amount/unit groups with the host. Kept explanatory tables and paragraphs left-aligned for reading. Hero primary amount and its calculation qualification are centered together.
- [P2, fixed] Uniform numeric font sizes made a one-digit 0 much weaker than three-digit amounts. Hero 7,000 grows from 24vw to 29vw; three-digit benefit amounts from 32vw to 34vw. Royalty 0 receives its own 190–230px optical size instead of about 125px at 390 width. Zero waiver card remains secondary and unchanged. Same typefaces and digit-reel behavior retained.
- [P2, fixed] Host slot consumed about 312px versus 94–125px numerals. Revised benefit/hero portrait slot is 230–280px, about 253px at 390x844, with a 14px title-to-host gap. Face remains visible at 375x667. Invitation has its original larger slot because it has no competing amount.
- [P2, fixed during iteration] Scaling the growth rest directly from the slot height made it narrower than other actors. Derived its park size from the resting PNG's 1122:1402 ratio and the lift canvas's 2:3 ratio so its rendered width matches the other 150%-height portrait images. Final 06 and combined pair inspected; original lift keys/timing, centered palms and large performance remain.

Required surfaces: original display/sans/Arial faces retained with intentional numeric size corrections; heading/host centers aligned, shorter gaps and full-width factual tables preserved; orange/ink/cream and no-split hero unchanged; exact original PNG/WebP poses retained with clear faces and hand gestures; all values, assumptions, draft status and non-cash/qualification text unchanged. Before/after comparisons show the adopted number-led hierarchy without clipping or overlapping controls.

Validation: current 390x844 hero/fee/royalty/growth/kitchen captures, 360x740 opening amount plus full unit, 375x667 hero face, 1440x900 desktop source comparison, and growth replay/mid-act/final rest inspected. No horizontal overflow; all panel notes remain within their own panels. Browser warnings/errors none. ESLint, client build, SSR build, prerender and Git whitespace checks pass. No root check script. Existing chapter navigation, native scrolling and review-only form contract retained. No real inquiry/call/client message. Limits: no physical device, screen-reader traversal, OS motion-preference emulation or full accessibility/performance certification.


Public rollout verification: passed. Dedicated sample deployment dpl_2VZAcxviCXi7nzx58QyADC4VJh3f is READY from source 3687759, with VITE_REVIEW_ONLY=true. Cloud client/SSR build, prerender and function packaging passed. Anonymous HTTP 200 confirms index-C-PZM20P.js and index-CiZBy6Z9.css. Public 390x844 hero and royalty captures after/public-hero.jpg and after/public-royalty.jpg inspected and match the local composition; royalty optical size is 230px, no overflow/console warnings/errors, review-only form notice present. Main project production remains dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8 through the API. Temporary viewport reset; the user's existing public sample tab refreshed and retained, without adding a retained duplicate.


## Latest iteration — Portrait hat overlap

final result: passed

User explicitly requested a slightly larger mobile host, with the hat covering a very small part of the amount to create foreground depth. Current-run source captures: Desktop review folder 2026-10-02_닭장수_갓레이어/before/, hero/fee/royalty/growth at 390x844 and desktop hero at 1440x900. Revised files are in after/ with matching names, plus compact-hero.jpg (375x667), narrow-opening.jpg (360x740), 06b-motion.jpg and 07-consultation.jpg. Every saved capture inspected. Four phone combined inputs compare-01/02/05/06-*.png are 804x844 with a 24px gap, no scaling. Desktop combined input compare-desktop-hero.png is 2904x900, viewer equally downscaled to 2048x635; original singles inspected too. All five combined inputs inspected. Focused focus-fee-overlap.png uses the same x45/y220/w300/h200 region on both sides at 1:1 to inspect the hat/amount edge.

- Adopted correction: grow numeric-scene portrait slots from 230–280px to 270–330px (about 253 to 304px at 390x844). Original invitation allowance is retained because it has no amount. Exact raster poses reused, no image generation or asset substitution.
- Put the decorative portrait immediately after the numeral, before the descriptive title. A phrasing span keeps the heading markup valid and the image aria-hidden; title text and animation selectors remain. Hero portrait is inside the total section, with the detailed calculation below it.
- Use -38px hero/-40px benefit/-48px royalty slot margins to compensate for font/asset whitespace. These are layout margins, not the amount of visible glyph coverage. Accepted comparisons show only a small lower edge of the amount covered by the hat; all amounts and units remain identifiable. Host travels above the amount at z6; sticky navigation remains above it. Static slots also paint above numerals.
- [P2, fixed during iteration] Initial royalty version only touched the 0's edge because its pose has different top whitespace. Adjusted its own margin to -48px; final 05 capture shows the requested small overlap.
- [P2, fixed during iteration] Moving the calculation below the larger hero host would put the non-cash qualification below the compact first viewport. Moved the same explicit non-cash text above the amount, retaining the monthly-sales assumption/draft status nearby and keeping the 7,192 calculation below the image. The phrase appears exactly once; no wording/value/eligibility removed or new claim added.
- Growth's parked layer uses the same foreground order and top alignment so its hat overlaps at rest. Its original full lift, assets, duration and replay remain; 06b mid-act and 06 rest inspected.

Required surfaces: existing display/sans/Arial fonts and numeral sizes retained; intentional foreground overlap and larger upper-body crop, with descriptions below and controls clear; original orange/cream/ink palette and single-color portrait hero retained; original PNG/WebP identities, hands and transparency retained with sharp visible faces; all financial words, values, draft/assumption/non-cash qualifiers and supporting content preserved. Desktop before/after composition matches. No artificial shadow or extra artwork added.

Validation: 390x844 hero/fee/royalty/growth, 375x667 hero and 360x740 opening full amount/unit inspected; all notes fit owning panels and no horizontal overflow. Native chapter navigation, growth replay/mid/end, keyboard Explore (focus H2), consultation anchor (form top about 75px), unobscured invitation CTA and retained review-only notice verified. Console warnings/errors none. ESLint, client/SSR build, prerender and Git whitespace pass. No root check script. No real inquiry/call/client message. Limits: no physical phone, screen-reader traversal, OS reduced-motion emulation or full accessibility/performance certification. Reduced-motion static slots receive the same layer via CSS; inspected in source.


Public rollout verification: passed. Dedicated sample deployment dpl_E5AXToxcHpUSyY1tRj6bwKfcE2SH is READY from source 24482b4 with VITE_REVIEW_ONLY=true. Cloud client/SSR build, prerender and function packaging passed. Anonymous HTTP 200 confirms index-D0UZn0i2.js and index-DckVf9Hq.css. Public 390x844 capture after/public-hero.jpg inspected: larger host/hat overlap matches local result, non-cash qualification is visible at about y334, portrait slot is 304px, no horizontal overflow, review-only notice present and console warnings/errors none. Main production remains dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8 through independent project API verification. Viewport reset; existing public sample tab refreshed and retained.


## Latest iteration — Initial 3,000만원 example

final result: passed

User clarified that the large initial 7,000 amount must be 3,000만원 상당. To keep the displayed claim and arithmetic coherent, the review example now assumes monthly sales of 2,500만원 for 24 months, with opening/kitchen conditions fulfilled. The unchanged 3.3% royalty rule produces 1,980만원, opening 740 + kitchen 500 + credit 0 yields 3,220만원, rounded to approximately 3,000만원. These are clearly labeled assumptions, not store results or confirmed cash support. Credit is derived from the existing 3,000/4,000 thresholds, so it is excluded from this lower-sales example; actual support terms elsewhere remain unchanged.

Evidence: Desktop review folder 2026-10-02_닭장수_3000초기값. Fresh before/after mobile captures at 390x844 and desktop at 1440x900 inspected. Same-input compare-mobile.png (804x844) and compare-desktop.png (2904x900) inspected; desktop viewer equally reduced to 2048x635, original files also inspected. Focused focus-calculation.png compares x35/y680/w650/h135 at 1:1 and confirms the changed exact sum, royalty and credit explanation. No density rescaling in files.

Five surfaces: display/sans fonts and numeral size unchanged; existing hat overlap/artwork/palette and layout retained; assumption text now has two meaningful mobile lines instead of an orphaned final word; calculation and qualifiers agree with the rounded amount. No image generation, CSS/layout redesign or new benefit rule. Desktop assumption remains inline. Copywrite/client Voice/Korean style rules reused for the small explanatory revision.

Checks: actual component arithmetic executed against independently expected scenarios: monthly 2,500 -> credit0/total3,220/rounded3,000; 3,000 ->30/3,976/4,000; 4,000 ->100/5,608/6,000; 6,000 ->100/7,192/7,000. Default DOM verifies 3,000, calculation3,220, royalty1,980, credit0 and explicit hypothesis. Mobile no horizontal overflow, console warnings/errors none. ESLint, client/SSR build, prerender and whitespace pass. No root check script. Unaffected navigation/form/motion contracts reused from the prior verified iteration; no real inquiry/call/client message. This scoped pass is not full accessibility/performance or physical-phone certification.


Public rollout verification: passed. Sample dpl_98SG7xYkKC7EZs4abr3z6Wg7ruFc is READY from source80e7805 with VITE_REVIEW_ONLY=true. Cloud client/SSR build, prerender and function packaging passed. Anonymous HTTP200 confirms index-CrmbZH8P.js/current CSS. Public-mobile.jpg inspected at390x844: initial3,000, exact3,220 calculation, intact hat layer, no overflow/console warnings, review-only form notice present. Main production remains dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8 through the API. Viewport reset and refreshed public sample shown as deliverable.
