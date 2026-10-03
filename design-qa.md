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


## Latest iteration — Royalty host/zero proximity

final result: passed

User requested reducing the distance between the royalty host and the amount. Fresh source captures in Desktop review folder 2026-10-02_닭장수_로열티간격: before-desktop.jpg1440x900, before-mobile.jpg390x844, before-tall-desktop.jpg1282x1566. Matching after files, short desktop1280x720, tablet768x1024 and mid-motion capture inspected. Combined desktop2904x900, tall2588x1566 and phone804x844 comparisons inspected; files retain1:1 pixels with24px gaps, desktop/tall viewer downsized both sides equally. Original files also inspected. Focus-pair.png compares the same x100/y160/w760/h460 region at1:1, showing the closer hand/zero relationship.

- [P2, fixed] Desktop host center was18% while the copy started36%, separating the pair into columns. Royalty host now centers at26%, copy starts34% with61% width. Original figure/numeral size retained; presenting hand reaches the zero, with the original numeral foreground order.
- [P2, fixed during iteration] Tablet host was vertically tied to the description's bottom, placing it below the zero. Royalty alone now aligns the presenting palm to the lower part of the amount using actual layout offsets and rendered image height, clamped above navigation. Layout offsets ignore temporary numeral/entry transforms, keeping replay stable. Other chapters retain their prior rules.
- [P1, fixed during iteration] Tall screens combined a relative copy layout, auto margin and percentage left offset. Source and iteration-1-tall-overflow.jpg show text pushed beyond the viewport despite document overflow reporting0. Desktop royalty copy now explicitly uses absolute positioning with zero auto margin across heights, preserving the existing10% top setting at1000–1399px. Reduced-motion has an explicit relative-flow override. At1282x1566 final copy bounds are about x436–1218, inside the viewport, with complete title/card/note/link visible.

Required surfaces: display/sans/Arial typography and sizes unchanged; intended tighter horizontal and amount-based vertical alignment, with footer clearance; original ink/cream palette unchanged; exact approved four PNG poses and opacity-swap choreography retained, no generation/substitute; all amount/rate/waiver/draft words unchanged. Mobile before/after pair confirms the approved hat/zero overlap and layout remain. Existing3,000 first example unaffected.

Validation:1440x900,1280x720,768x1024,1282x1566 and390x844 screenshots accepted. Mid-act and Enter replay inspected; numeral/unit, caption, normal-rate card, conditions and link remain readable without clipping/overlap. No console warnings/errors. ESLint, client/SSR build, prerender and whitespace pass. No root check script. No real inquiry/call/client message. Scoped positional QA, not full accessibility/performance or physical-device certification. OS reduced-motion emulation unavailable; relative-flow guard inspected in source.


Public rollout verification: passed. Sample dpl_FD6GqKi1pPsi1eVTzu7Vu6UL6K4y READY from source776424c with VITE_REVIEW_ONLY=true. Cloud client/SSR/prerender/function packaging passed. Anonymous HTTP200 confirms index-DNoA1abG.js and index-DvE2VubD.css. Public-desktop.jpg1440x900 inspected: host26%, copy x490, readable close pair and all terms visible. The final9% top rule intentionally standardizes medium-height positioning too; after-desktop.jpg/compare-desktop.png/focus-pair.png were refreshed from this final public capture and inspected again. First amount remains3,000, review-only notice present, console warnings/errors none. Main production remains dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8. Viewport reset; public royalty scene shown and retained as deliverable.


## Latest iteration — Royalty breathing room

final result: passed

User found the previous close placement excessive. Shifted only the desktop royalty host center from26% to17.5%, keeping copy34%, host size and stable amount-based vertical alignment. The presenting hand is now fully visible beside the zero with a small gap. The tall-screen absolute positioning fix and reduced-motion flow remain. Portrait placement is outside this changed branch and retains the requested small hat overlap.

Evidence: fresh public before/local after at1440x900 in Desktop review folder2026-10-02_닭장수_로열티간격재조정; compare-desktop.png combines both at identical dimensions and was inspected along with originals. Output2904x900, viewer equally reduced to2048x635. Inspected1280x720 and1282x1566 final royalty captures: hand/numeral separated, terms and chapter controls clear.390x844 portrait capture retains the prior hat layer, no horizontal overflow and review-only notice.

Five surfaces: fonts and numeral sizes unchanged; only horizontal host spacing changed; original ink/cream palette, transparent mascot poses and all wording/financial conditions retained. No actionable P0/P1/P2 in this scoped correction. ESLint, client/SSR build, prerender and whitespace pass; console warnings/errors none. No new test harness for this reversible visual adjustment. No actual inquiry/call/client message. Prior verified motion guards retained; no full accessibility/performance certification or physical-device testing.

Public rollout verification: passed. Sample deployment dpl_8MMEy8gKP1uQudGGujvJREs4mZR7 READY from source b776cef with VITE_REVIEW_ONLY=true. Anonymous200 confirms index-C800cIsW.js/index-DvE2VubD.css. Public1440x900 screenshot inspected: fully visible presenting hand and small gap match local result, review-only notice remains, no console warnings/errors. Main project API confirms unchanged live deployment dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8. Viewport reset and public royalty sample retained.


## 2026-10-02 — Full desktop/mobile design and code audit

final result: passed

Scope: current client-sample rebrand journey, all seven story chapters and the benefits/menu/space/fit/FAQ/form/footer flow, shared dialog, tracking/bootstrap, prerender and lead API. This is a combined Product Design audit plus bounded implementation review, not certification of unrelated archived concepts or a full security assessment. User explicitly requested rigorous desktop/mobile verification; existing frontend correction and sample-only rollout authorization reused.

Source visual truth: fresh current-run public captures in `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/2026-10-02_닭장수_전체정밀검증/before/` (source333b0ec). Rendered implementation: fresh compiled review build at port8876, captures in `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/2026-10-02_닭장수_전체정밀검증/after/`. No earlier-run screenshots used as audit evidence. Source/current visual language, official assets and agreed3,000 example are the baseline; intentional changes below address reproduced problems.

### Findings and fixes

- [P1, fixed] Landscape844x390 pinned a560px stage below an80px header. The first CTA was at y483–546 and chapter navigation y567–621, below the390px viewport. Screenshot36 shows the problem. Use the existing flowing composition for height<=640 and portrait width<=1024. After36/37 show persistent reachable navigation and scrollable full benefit facts.
- [P2, fixed] Tablet768x1024 retained a two-color desktop hero with an undersized low mascot, awkward support text grouping and large detached numerals (34/35). Reuse the agreed mobile composition with a580px content maximum and actual80px header offset. After34/38 show coherent amount/hat layers and centered royalty content.
- [P1, fixed] Privacy dialog opened with focus behind the modal; Tab advanced to the background submit button (16). A native modal now makes the page behind it inert, focuses the title, offers a keyboard-scrollable policy region, wraps Tab/Shift+Tab, supports Escape and restores the exact opener. Native-only prototype initially allowed a Tab cycle into browser chrome; explicit boundary wrapping fixed it. Five consecutive Tab states stayed inside; Escape restored footer-policy-link.
- [P2, fixed] Legacy red/yellow modal, heavy small type and thick decorative borders broke the rebrand reading style (16/32). Keep all policy wording while using the existing paper/ink palette,15px regular body type and a clear close control. After32/42 confirm readable portrait and390px-high dialogs. Policy wording itself is not legally certified.
- [P2, fixed]320px header split 메뉴 and 창업 상담 vertically (41). Protect label wrapping and use a128px logo below350px. Matched41 shows single-line controls and no clipping.
- [P2, fixed]19px/weight400 white hero units on orange measured3.41:1, below the ordinary-text contrast target. Make the small unit ink-colored at20px; actual token contrast4.53:1. Preserve the large white amount, whose large-text contrast is3.41:1. Matched17 shows the change.
- [P2, fixed] Desktop keyboard Explore changed the chapter without moving focus. Pending focus now lands on the new H2; inactive panels retain inert attributes. Reduced-motion flow also updates the active chapter from document position instead of leaving the first tab selected. The latter guard was source-reviewed; OS preference emulation was unavailable.
- [P1/P2, fixed] Review behavior depended on rebrand props/query. The sample root could show the old landing, boot analytics and expose a normal form path. Review builds now default to rebrand, disable tracking and all form variants, prerender that same page and emit noindex. A matching runtime flag rejects every lead POST with403 before provider access. Normal false/unset mode still builds the original indexable landing and retains the API success path.
- [P2, fixed] Non-object JSON bodies could take the internal-error path. They now return400. Offline tests cover malformed/non-object input, required fields, strict consent, method/preflight, rate limiting, review rejection, provider success and safe provider failure. No live lead/email was sent.
- [P2, fixed] Development dependency audit reported5 advisories (4 high,1 moderate). Compatible transitive updates only, with no direct dependency/major upgrade; frontend and root production audits now report0. This does not imply absence of every security issue.
- [P3, fixed] Removed72px legacy mobile footer padding. Deferred four hidden fallback poses totaling4,036,327 source bytes and removed the1,738,291-byte legacy hero preload from review HTML. These are asset file sizes, not a measured network-speed gain.

### Flow evidence

| Step | Surface | Desktop/mobile evidence | Result and notes |
|---|---|---|---|
|1|Initial3,000 example|01 /17;34,36,41 variants|Passed after fixes. Scenario assumptions,3,220 sum, non-cash qualifier and original artwork retained; both desktop numerals respond to hover.|
|2|Fee waiver|02 /18|Passed.440 composition,275+165 facts and intentional mobile hat overlap read clearly.|
|3|Opening support|03 /19;35,37,39|Passed.740 including440 is explicit; all three facts and conditions reachable.|
|4|Kitchen support|04 /20|Passed.500 and300+200 agree; eligibility text flows beneath the image.|
|5|Royalty|05 /21;38|Passed. Desktop hand/zero gap preserved; mobile foreground hat layer retained.|
|6|Operating credit|06 /22|Passed. Thresholds unchanged, playback settles to100 and parked state, Enter replay goes back to playing.|
|7|Consultation invitation|07 /23;40|Passed. CTA clear and reachable with native scrolling and short-desktop layout.|
|8|Benefits and detailed conditions|08–09 /25|Passed. Disclosure works; lower conditions remain readable.09 is deliberately a lower-condition scroll state.|
|9|Menu|10 /26|Passed. Existing real food/photo assets, responsive image rows and readable descriptions; no failed images in inspected state.|
|10|Space|11 /27|Passed. Both selectors switch image, caption and aria-pressed; illustrative status visible.|
|11|Founder preparation|12 /28|Passed. Three practical prompts, no clipped text in inspected views.|
|12|FAQ|13 /29|Passed. All four disclosures opened and reported open, with answers and natural layout.|
|13|Lead form|14–15 /30–31|Passed. Empty form reports four fields, focuses first error; dummy valid input produces an explicit review-only completion. API provider behavior tested offline.|
|14|Privacy and footer|16 /31–32;42|Passed after modal fixes. Confirm/Escape/Tab and opener return checked, company/social/tel destinations inspected without making a call or sending a message.|

### Required fidelity surfaces and comparisons

- Typography: original Black Han Sans/display, sans and Arial numerals preserved; fix only the small unit contrast,320px header wrapping,14px wider flowing navigation and dialog reading type.
- Spacing/layout: deliberate flow layout on tablets/short screens, persistent navigation,580px content maximum, no clipped controls in sampled viewports. Original1440px hero comparison retained.
- Colors/tokens: original orange/ink/paper retained. Ink/orange4.53:1; muted text/paper6.49:1; cream text/ink11.10:1. These are selected token checks, not whole-page WCAG certification.
- Images: exact approved PNG/WebP artwork retained. No image generation/replacement/resampling in the site. Lazy loading applies to hidden fallback/next chapter images.
- Copy: amounts,3,000 headline,3,220 assumption example, benefit/draft/condition/non-cash qualifiers and policy text preserved. Form/backend review message remains explicit.

Six combined comparison inputs were opened and inspected, with source on the left and revised implementation on the right: compare-01-desktop-hero.png(1440x900 each), compare-17-mobile-hero.png(390x844 each), compare-34-tablet-hero.png(768x1024 each), compare-36-landscape-hero.png(844x390 each), compare-41-smallest-phone.png(320x568 each), compare-32-mobile-privacy.png(390x844 each). Source pixels equal implementation pixels equal CSS viewport; no density normalization required. Pairs retain1:1 pixels with24px white gutter; only the desktop pair viewer downsized2904x900 to2048x635 equally. Narrow/mobile comparisons are themselves readable focused evidence; no additional crop was needed. Original individual files were also inspected before acceptance.

Iteration history: public before capture -> flowing-layout/modal implementation -> corrected wider-flow nav styling and explicit modal Tab wrap ->320px header and unit-contrast fixes -> final matched comparisons. No actionable P0/P1/P2 remains within the inspected scope.

Validation: responsive browser sizes320x568,360x740,390x844,768x1024,844x390,1280x720,1440x900 and1920x1080. Layout-mode switch preserved the consultation chapter. Native menus open/close/Escape and anchors, keyboard Explore, royalty/growth navigation and replay, both space views, all FAQs, error focus, review completion, modal focus cycle and close, no-query root, no analytics script insertion, noindex and removed legacy preload verified. Browser warnings/errors none. Seven offline API tests pass. ESLint, client build, SSR build, prerender and whitespace pass. Both normal and review build contracts checked.

Limits: browser responsive viewports, not physical phones. No Safari/Chrome device matrix, OS reduced-motion visual run,200% browser text zoom, screen-reader traversal, slow-network/FPS/Lighthouse measurement or actual provider email delivery. Source motion pause/reduced-motion/cleanup guards reviewed. No client message, call, actual inquiry or official-site deployment.

Public rollout verification: passed. Dedicated sample deployment dpl_dhrsd5UU5aSSaiK467j44HJKMci8 READY from source fe8e5cd with both build/runtime VITE_REVIEW_ONLY=true. Cloud builds and function packaging passed with0 dependency advisories. Anonymous root HTTP200 serves the rebrand prerender, noindex and index-BzLIO65F.js/index-BTIB2LyS.css. Empty JSON POST to the sample returns403 with the review message, proving the runtime guard without sending lead content. Public1440x900 and390x844 captures inspected; review notice retained, analytics scripts absent and console clean. Independent main project API verifies unchanged official deployment dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8.

Full self-contained audit report: [2026-10-02_닭장수_랜딩페이지_정밀검수_fe8e5cd.html](/Users/bananabk/Desktop/codex-output/01_최종산출물/2026-10-02_닭장수_랜딩페이지_정밀검수_fe8e5cd.html). Created in the designated review folder, then browser-rendered and visually inspected before copying to the final folder. Contains14 flow steps and33 embedded current-run evidence images; inspected expanded content,0 broken images. Source and final file hashes match. Viewport restored.


## Latest iteration — Shorter closing flow

final result: passed

User approved the proposed reduction after recording feedback that the lower page lacked impact and continuity. Scope is the existing prototype's lower flow, using the agreed upper-story typography/palette and supplied food photography as visual grounding. No template replacement, generated asset or backend change.

Source truth: fresh public10cddb5 captures in `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/2026-10-02_닭장수_하단간소화/before-{menu,faq}-{desktop,mobile}.jpg`. Implementation: same-folder `after-*` captures from the compiled review preview at port8876. This is one continued task across a browser-session restart; accepted captures were retained, not recast from another audit.

Intentional differences: remove the repeated benefits presentation, illustrative space section and separate preparation section. Show real food immediately after the seven chapters, a three-menu lineup, three FAQs and consultation. Put complete support conditions in a native disclosure reachable through the existing #rebrand-benefits anchor. Keep all numbers, draft status, eligibility, sales evidence,24-month obligation/repayment and non-cash qualifications.

Five surfaces: original display/sans families, larger menu headline and readable16–18px FAQ labels; larger food region with fewer section breaks and generous aligned spacing; existing cream/ink/orange palette, dark FAQ continuous with consultation; original sharp food/menu assets, controlled cover crop and no new assets; plain Korean headline and shorter FAQ retain facts and client Voice. Form/privacy/footer and story visuals reuse prior verification; only the story's support-link callback changed.

Comparisons: four combined inputs `compare-menu-desktop.png`, `compare-faq-desktop.png`, `compare-menu-mobile.png`, `compare-faq-mobile.png` were opened and judged with originals. Same route anchor, theme, closed disclosure state and viewport. Desktop CSS/source/render each1440x900, mobile each390x844,1:1 pixels with24px gutter. Desktop pair2904x900 displayed equally reduced to2048x635; mobile pair804x844 remains readable at native size. Larger headline, photograph crop and dark FAQ are requested changes, not fidelity regressions. Individual menu lineup/terms captures provide readable detail, so no additional crop needed.

Iteration: initial layout -> removed the preceding scene's10px strip from direct section jumps by aligning anchors to80px/66px headers -> final matched captures. No actionable P0/P1/P2 remains in this scope. Minor physical-device/assistive-tech gaps remain as below.

Checks:320x568 and390x844 phones,768x1024 tablet,1440x900 desktop. No document overflow, broken local anchors or failed images. All3 FAQs open; first FAQ also opened/closed with Enter. The five story support links share the tested handler; fee-link navigation opened conditions and settled at y82 on mobile. Direct #rebrand-benefits reload opens the disclosure at y82. Header consultation anchor reaches the form at y75 with its review notice. Browser warning/error log empty. Basic collapsed lower-page height measured from story bottom to main bottom: desktop6944.32→2940.37, mobile7975.67→3155.56 pixels (~58%/~60% reduction). This is layout measurement, not conversion evidence.

ESLint, client/SSR build, prerender and whitespace pass. Existing seven API tests and previous full audit remain relevant to untouched paths; no new mirror tests for this visual/content change. No external inquiry/call/email. Limits: responsive browser checks rather than physical-device, screen-reader or OS reduced-motion testing.

Public rollout verification: passed. Sample dpl_GDbtTVT8MJapFmqT6mLzdZKwsAgC READY from source131b715 with both build/runtime VITE_REVIEW_ONLY=true. Anonymous200 serves index-B0Zu9QB4.js/index-CH9oACAd.css, the shorter closing flow and noindex. Removed space/fit sections are absent; support disclosure remains. Empty JSON sample API request returns403. Public1440x900 menu screenshot inspected and matches the local result; no console warnings/errors. Official main remains dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8. Viewport reset; public #rebrand-menu left visible.


## Latest iteration — Remove redundant horizontal rules

final result: passed

User requested fewer unnecessary horizontal lines. Removed decorative menu dividers, FAQ row borders, support disclosure borders/internal row rules, the FAQ/form separator, consultation-host rule and footer rule. Existing spacing/numbering/backgrounds provide grouping. Input boundaries and keyboard focus indicators are functional and retained. No copy, images, animation, form logic or API changes.

Fresh public source and local compiled implementation captures are in `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/2026-10-02_닭장수_구분선정리/`, prefixed before-/after-. Four combined inputs compare-lineup-desktop.png, compare-faq-desktop.png, compare-lineup-mobile.png and compare-faq-mobile.png were inspected with their individual screenshots. Desktop1440x900 and mobile390x844 matched CSS/pixel size, theme and closed disclosure state, with a24px gutter and no density rescaling. Desktop pair2904x900 was equally reduced to2048x635 by the viewer; mobile804x844 retained readable native-size detail. No additional crop needed. A transient overscrolled footer image was rejected and replaced after scrolling settled.

Five surfaces: fonts and text sizes unchanged; spacing/order preserved with1px border-height reductions; original colors retained while decorative strokes removed; approved image assets/crops unchanged; all copy/conditions preserved. Comparisons show clearer grouping without an actionable P0/P1/P2 issue. Footer screenshots also inspected.

Validation: FAQ opens/closes with Enter, support disclosure opens, no horizontal overflow and no console warning/error. Computed top/bottom borders on FAQ, support disclosure/rows, consultation host and footer are0px; input border remains1px and keyboard outline3px. Client/SSR build, prerender and diff whitespace pass. No new tests for this reversible CSS-only correction. Prior behavior checks remain applicable; no live inquiry/call/client message.

Public verification: passed. Sample dpl_E3hJUAYaJjysVnC4avFtqhECL2CQ READY from source1e90084 with both review flags. Anonymous HTTP200/current index-B-Fbd0vv.js and index-BvqWyINK.css/noindex verified. Public1440x900 FAQ capture inspected; decorative border0px and input border1px confirmed. Official main remains dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8. Viewport restored and public FAQ shown.


## 2026-10-03 — Layout and hierarchy pass

Scope: the user's request to adjust placement and hierarchy in the existing rebrand landing. The accepted copy, colors, fonts, assets and CTA treatment remain the visual source; intentional differences below concern scale, alignment, spacing and information grouping.

### Source and implementation evidence

- hero: source `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-before-hero.jpg`; implementation `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-after-hero.jpg`; side-by-side comparison `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-comparison-hero.jpg`.
- menu: source `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-before-menu.jpg`; implementation `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-after-menu.jpg`; side-by-side comparison `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-comparison-menu.jpg`.
- faq: source `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-before-faq.jpg`; implementation `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-after-faq.jpg`; side-by-side comparison `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-comparison-faq.jpg`.
- form: source `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-before-form.jpg`; implementation `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-after-form.jpg`; side-by-side comparison `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-comparison-form.jpg`.
- mobile: source `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-before-mobile.jpg`; implementation `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-after-mobile.jpg`; side-by-side comparison `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-comparison-mobile.jpg`.
- mobile-form: source `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-before-mobile-form.jpg`; implementation `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-after-mobile-form.jpg`; side-by-side comparison `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-comparison-mobile-form.jpg`.

- Desktop source and implementation pixels: 1280×800, matching the CSS viewport at 1:1 density. Mobile: 390×844, also 1:1. Comparisons place both original-size captures in the same image with a 24px gap and 32px label strip; no source rescaling. The viewer may scale the combined image for display.
- State: first chapter at the top, menu/FAQ/form entered through header anchors, FAQ closed in the matched pair. Captures are from this run. The character's naturally changing pose is expected motion, not an asset substitution.
- Focused reading/action comparison: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-comparison-hero-detail.jpg`. The 390px pairs make mobile unit wrapping, basis text and form labels readable without an additional crop.
- Additional viewports: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-after-1280x720.jpg`, `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-after-tall.jpg` (1185×1566), `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-after-tablet.jpg` (768×1024), `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/layout-after-narrow.jpg` (320×740).

### Findings and comparison history

- [P2, resolved] At 1280×800, oversized first-screen amounts forced the support explanation and exploration CTA below the stage. Introduced a height-aware numeral scale and a bounded grid row. The final CTA bottom is 764px within the 800px stage; at 1280×720 it is 692px within the 720px stage.
- [P2, resolved] The header, hero, FAQ and consultation used different horizontal edges. Added one responsive page gutter, aligned the closing grids, and made the application-card title subordinate to the section heading. Matched menu, FAQ and form comparisons show the final alignment.
- [P2, resolved] On mobile, the unit wrapped separately and the exact calculation was separated from its amount by the character. Kept the unit together and grouped basis/exact-value text before the existing portrait slot. The 320px check reports page width 320px and unit right edge 288.33px.
- [P2, resolved in second pass] The first mobile form pass still centered its grid children despite left-aligned text. Corrected `justify-items`; the final mobile-form comparison places the label, heading and body at the same 24px content edge.
- Tall-screen follow-up: bounded the character height and moved its lane toward the numbers, then recaptured the final 1185×1566 view.

### Required fidelity surfaces

- Fonts/typography: retained Black Han Sans and Pretendard; adjusted the numeral, section-heading, form-heading and supporting-text scale. Checked actual rendered line breaks on desktop and narrow mobile.
- Spacing/layout: matched horizontal gutters, vertical section rhythm and form-column alignment; inspected the paired overview and reading/action crop. No actionable clipping or overlap remains in the inspected layouts.
- Colors/tokens: kept the existing orange, ink and cream palette and the approved wipe CTA. Portrait supporting copy uses the existing ink foreground.
- Image quality/assets: retained the actual food photos, logo and character media. Their framing changes only through their existing layout containers. No replacement assets were generated.
- Copy/content: no text or numerical claim was rewritten. Only the exact calculation paragraph's position changed. Removed navigation/cue elements remain absent.

### Interaction and implementation checks

- Exploration CTA and native scrolling reached the benefit chapters; sampled all six following chapters at 1280×720. Their content bounds remained inside the story stage. Entrance-animation captures are interaction evidence, not static numerical-copy evidence.
- Header anchors, mobile consultation entry and FAQ expansion/collapse work. No lead was submitted.
- Browser error log was empty. Lint, final production build, all 7 existing API tests and diff checks passed. No `check` script is configured.
- Remaining evidence limit: this is a scoped visual/layout check, not a full accessibility certification or a production deployment check.

final result: passed


## 2026-10-03 — Consistent chapters 1–7

Scope: extend the accepted first-screen hierarchy through the five benefit chapters and the final consultation invitation.

### Visual evidence

- Source: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/chapters/before-desktop-2.jpg` through `before-desktop-7.jpg`, all captured in this run at 1280×800.
- Final implementation: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/chapters/after-desktop-1.jpg` through `after-desktop-7.jpg` at 1280×800.
- Inspected paired inputs: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/chapters/comparison-desktop-2.jpg` through `comparison-desktop-7.jpg`, 2584×832 with original-size source and implementation, a 24px gap and 32px caption strip. No source scaling in the comparisons.
- Mobile pairs: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/chapters/comparison-mobile-2.jpg`, `comparison-mobile-3.jpg` and `comparison-mobile-7.jpg`, each 804×876 from two 390×844 captures. All six following chapters were also captured at 390×844.
- Actual screenshot pixels match the CSS viewport, 1:1. Overview thumbnails are for navigation, not fidelity assessment.
- Source captures use the settled numeric value but some character/color/reveal transitions were still in progress. Final captures use the owners' settled/parked phase indicators. Those transient pose/opacity differences are excluded from palette and asset-drift judgments. No animation sequencing was changed.

### Findings and iteration history

- [P2, resolved] The following chapters used different numeral families, unit scales, benefit-heading scales and content widths. Added common story tokens, matching Black Han Sans numerals/units to the first screen, balanced alternating text lanes and unified the detail/condition spacing.
- [P2, resolved] Portrait character slots interrupted the amount and its explanatory text. Grouped heading, amount, benefit, details and conditions before the existing portrait slot; placed the conditions CTA after the character. Existing slot measurement continues to position the animated host.
- [P2, resolved] Conditions links and the final invitation used different CTA treatments. Applied the accepted ink-to-orange wipe and licensed arrow; retained the original destinations and conditions-open callback.
- [P2, resolved in second pass] Legacy selectors retained a 66.56px royalty unit and 12px conditions links despite the initial common rules. Increased selector precision and confirmed the final unit/font and 14px, 44px-minimum conditions CTA.

### Fidelity and interaction checks

- Typography: common numeral/display family; consistent benefit heading, unit, definition-row, condition-note and CTA sizes. The overview total remains the primary tier and individual benefits form the next tier.
- Layout: shared page edge and vertically balanced desktop blocks. At 1280×720, all six following content blocks fit inside the stage, with measured bottoms from 579px to 681px before the final 8px CTA minimum-height correction; the available remaining clearance exceeds that adjustment.
- Colors: retained the existing ink, cream and orange chapter palettes and their intentional transitions. No palette drift is inferred from transient source captures.
- Images: retained all original poses and supporting media. The existing number/host performances reach their settled/parked state; cards and text are fully visible after their reveal.
- Copy: all monetary values, qualifications and destinations remain unchanged; existing decorative arrow glyphs were replaced by the same licensed icon asset used elsewhere.
- Controls: the conditions CTA opens the support-terms details, and the seventh chapter's CTA reaches the lead form (top about 90px, below the sticky header). No lead was submitted.
- Narrow mobile: 320px checks on opening and logistics chapters showed document width 320px with no horizontal overflow.
- Lint, final production build, all 7 existing API tests and diff checks passed. Browser error log was empty.

No actionable P0/P1/P2 findings remain in the requested consistency scope. This is visual and interaction QA, not full accessibility certification.

final result: passed

Public rollout verification: passed. Source 4ae3c95 is pushed to origin/codex/hero-7000-preview. Dedicated sample deployment dpl_D7JAFv2nXDQ7ozamkdimVdb4tMzP is READY, aliased to https://dakjangsu-client-sample.vercel.app/?concept=rebrand with both build/runtime VITE_REVIEW_ONLY=true. Cloud client/SSR build, prerender and function packaging passed. Anonymous HTTP 200 serves index-CDA65r6i.js and index-B_-mEg3o.css with noindex; empty JSON sample API request returns 403 without sending lead content. Public desktop 1280×800 hero/fee and mobile 390×844 hero/form captures were inspected at their native viewport size: seven chapters, no first-screen draft badge or numbered shortcuts, shared Black Han Sans amounts and wipe CTA, no overflow. Conditions open; keyboard exploration reaches the fee chapter; mobile consultation lands at y75.47 below the 66px header. Console warnings/errors absent. Evidence: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/chapters/public-desktop-1.jpg`, `public-desktop-2.jpg`, `public-mobile-1.jpg`, `public-mobile-form.jpg`. The official-domain project independently remains on dpl_8EMUD3ibo18SysLuLhTukxt4Ecm8.

## 2026-10-03 - Consultation hook

Scope: the user's stronger consultation-hook request, limited to the rebrand invitation and form copy with matching emphasis colors. The personal startup-cost question leads into checking applicable support; no new quantitative savings, eligibility or scarcity claim. Conditions and all form behavior are retained.

Evidence: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/consultation-hook/`. Matched form captures: before-desktop.jpg and after-desktop.jpg at 1280×800; before-mobile.jpg and after-mobile.jpg at 390×844. Final invitation: after-desktop-7.jpg and after-short-desktop-7.jpg. Narrow 320×740: after-narrow-7.jpg and after-narrow-form.jpg. Original viewport sizes retained. The first invitation pass's peach emphasis was too weak against orange and was replaced by cream; final screenshots show the correction.

Validation: chapter 7 content ends at y612.66 inside the 720px viewport. Invitation CTA reaches the form at y90 below the 80px desktop header; narrow form lands at y74.61 below the 66px header. Mobile document widths match 390px and 320px; the narrow invitation CTA is about 200px wide. Headline wording remains contiguous for assistive text despite visual line breaks. Final lint, client/SSR build, prerender and diff checks pass; browser warnings/errors absent. No lead was submitted. This is local preview validation, not a new public deployment or a measured conversion result.

final result: passed

## 2026-10-03 - Progress guide from the second chapter

Scope: the user's request to restore orientation through a compact 1–7 guide visible from chapter 2. Retained the original content and performances; adjusted lower clearance and compact-height spacing, and aligned chapter-caption numbering with the guide. First-screen appearance stays unchanged.

Evidence: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/progress-guide/`. first-screen.jpg confirms the hidden guide. desktop-2.jpg (1280×800), short-desktop-2.jpg (1280×720), mobile-2.jpg (390×844), narrow-7.jpg (320×740) and outside-mobile.jpg record the inspected guide and hiding states.

Validation: all seven destinations work; keyboard navigation focuses the destination H2 and returning to chapter 1 focuses its H1. First screen and the mobile consultation form set aria-hidden/inert on the guide. At 1280×800 the guide starts at y738 and the largest content block ends at y718.34; at 1280×720 the guide starts at y658 and the largest block ends at y647.77, with no overlap. Mobile guide bounds stay within the viewport: x19–371 at 390px and x12–308 at 320px. The portrait footer measurement stays 0px. Current-step indicators match the selected chapter; all controls remain available on narrow screens. Browser warnings/errors absent. Final lint, client/SSR build, prerender and diff checks pass. No live inquiry was submitted. Scope is local preview validation.

final result: passed

## 2026-10-03 - Approved reduced-line editorial index

Scope: implement the user's approved final image for the chapter guide, preserving the rest of the existing page. Source visual truth: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/guide-concepts/visual-refined-3-clean.png`.

Evidence root: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/approved-guide/`. Source pixels1584×993 were uniformly normalized to1280×802 and cropped by2 blank bottom pixels for the1280×800 CSS viewport. Implementation desktop-final.png is a1280×800 viewport crop from the sharp1280px-wide full-document.jpg at document y867; CSS viewport1280×800 and devicePixelRatio1. The initial viewport-only captures were softened by in-app surface scaling and were replaced for fidelity assessment. comparison-full-final.png and comparison-guide-final.png combine the approved and rendered views, at matching chapter2/rest state, with24px separation and28px labels. The focused crop makes typography, link spacing and the single underline readable. Both comparisons were inspected.

**Findings and fixes**

- [P2, resolved] At773×954, the fixed footer covered the conditions CTA when a jump aligned the panel top. Changed portrait jumps and orientation restores to align the target H2 at header+12px. tablet-final.jpg shows H2 y92.31 and CTA bottom878.30, before footer y890.
- [P2, resolved] Small orange mobile labels and faded text on orange chapters had insufficient contrast. Mobile current labels inherit the readable chapter foreground; the accent remains on the short underline. Orange-background chapter links use full opacity. mobile-final.jpg and narrow-final.jpg plus computed foreground/background checks confirm the final states.
- [P3] The rendered active type and a few link starts differ slightly from the generated reference. Retained the actual local fonts and brand orange; the final focused comparison preserves the intended hierarchy and spacing. No additional polish loop is required.

**Required fidelity surfaces**

- Typography: real Pretendard,14px ordinary/19px bold current desktop links; mobile13px numbers,18px current and12px selected name. Two-digit chapter numbers and names match the selected guide. Keyboard focus and readable narrow targets retained.
- Layout: full page-gutter alignment, no enclosing card/radius/shadow, one36×2px desktop underline (24×2px on mobile). Other strokes and the continuous floor progress bar are absent. At1280×720, content bottoms are below640.77 and guide starts at652, with no overlap. Mobile layout adapts to a flat footer and selected-name-only view.
- Colors: original cream/ink/orange retained. Chapter-specific foreground/indicator adaptation is intentional because the reference supplies only the cream second chapter.
- Assets: all actual logo/character/food assets are retained. The generated reference's incidental character-render differences are outside the approved guide scope; no generated screenshot or replacement character was shipped.
- Content: chapter labels and numbering preserved; no financial value, qualification, CTA destination or form/API behavior changed. The approved consultation copy from the preceding task remains.

**Verification**

Actual viewport checks:1280×800,1280×720,773×954,390×844 and320×740. short-final.jpg, tablet-final.jpg, mobile-final.jpg and narrow-final.jpg record the implementation. All seven numbered destinations work; keyboard jumps focus H2 and first-screen return focuses H1. First screen and the consultation form hide/inert the guide; the form lands at y74.61 on320px. Mobile width matches the viewport; minimum narrow target width42.28px and height56px. Exactly one active underline is present. Console warnings/errors absent. Final lint, client/SSR build, prerender and diff checks passed. No live lead was submitted. This is local visual/interaction QA, not a public rollout or full accessibility certification.

final result: passed

## 2026-10-03 - Final consultation CTA matches the header

Source: the user's existing upper-right consultation CTA, captured together with the new form CTA in `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/consultation-button/normal.jpg` at773×954. Shared computed values match:10px radius,0px border, no shadow, orange background, ink cover, cream text,500 weight and cubic-bezier(0.3,1,0.8,1) reveal. The full-width form uses58px/17px versus the compact header38px/14px intentionally.

Typography/layout/color: the shared treatment replaces the generic form rectangle; no label truncation or horizontal overflow. At320×740 the button occupies x45–275, is58px high, and its label span is187.19px wide. focus.jpg records the keyboard reveal: cover translates away, text becomes ink and the2px focus outline remains. mobile.jpg records narrow rendering. Image assets and all copy are unchanged. The final invitation anchor also retains #lead-capture with10px corners and no extra border; its legacy hover background is corrected to orange.

Functional limits: the native submit type and disabled binding remain; loading styles are retained and excluded from hover/press animation. Validation, review-only guard and API code were not changed. No real submission was used for this styling verification. Lint, client/SSR build, prerender and whitespace checks pass. Scope is local preview.

final result: passed

## 2026-10-03 - Aurora web design guide audit

Criteria version AWG-1003-v1, fixed before corrective source edits. Scope: the current private rebrand preview, seven story chapters, menu, FAQ/support terms, consultation form and privacy dialog. Purpose: let prospective owners understand qualified support and enter consultation. User authorized audit and fixes. Source baseline: HEAD9239574 plus the accepted uncommitted changes documented above; orange/ink/cream, Black Han Sans/Pretendard, the approved editorial chapter guide and shared wipe CTA are retained. The latest accepted composition takes precedence over the historical navy/gold brief. No new design system or public rollout is part of this pass.

| ID | Source / reason | Observable acceptance condition | Verification |
| --- | --- | --- | --- |
| AWG-01 | Approved story hierarchy and skill fixed-control checks | At settled chapter states, heading, value, qualification and action remain legible, with no fixed header/guide overlap. No horizontal document overflow beyond1px. Guide absent/inert on chapter1 and outside the story. | Render and inspect1280×800,1280×720,773×954,390×844,320×740; jump all seven chapters and scroll long portrait content. |
| AWG-02 | Approved layout gutter and reading order | Consultation label, heading, body and host copy share the same left reading edge within1px. Tablet and phone columns provide enough width for intact Korean phrases; primary heading remains above form-heading tier. | Matched before/after at773×954,390×844,320×740 and desktop; DOM bounds supplement screenshot reading. |
| AWG-03 | Skill typography gate and approved brand type | Display Black Han Sans regular400 for short headings/numerals, Pretendard for body/control text; Korean, English, numerals and punctuation readable without clipping. Official exact-release license permits commercial web use and redistribution where files are bundled. Loaded-file evidence and declared CSS are distinguished from actual glyph-renderer identity. | Official licensing, local font metadata, page asset/load evidence and rendered screenshots. Mark actual-renderer identity unverified if the browser provides no font inspector. |
| AWG-04 | Reading task and web-checks contrast | Normal informational/control text contrast≥4.5:1; large display text≥3:1. Qualification text≥13px, body≥15px. Placeholder text and field boundaries remain readable. Intentional decorative marks excluded. | Composite computed foreground/background colors plus actual normal/focus views. |
| AWG-05 | Approved CTA and primary-action hierarchy | Header, invitation and final submit share10px radius and ink/orange wipe. Privacy action reads as a subordinate link while retaining≥44px hit height. Checkbox and consent text align; keyboard focus remains visible≥2px and dialog closes/returns focus. | Keyboard navigation, privacy open/Escape, normal/focus screenshots and bounds. No lead submission. |
| AWG-06 | Preserve normal visitor tasks | Explore, all chapter destinations, menu/FAQ/consult anchors and support disclosure work, anchors expose target heading below header. No failed visible images or browser warnings/errors. Financial values, qualifications, actor assets and form/API behavior preserved. | Actual interaction plus source diff, lint/build and affected-neighbor recheck. |

Evidence folder: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/web-guide-audit/`. Match route/content/assets, CSS viewport, density, section/chapter, settled motion and keyboard state for each pair. Current source will be compared with this baseline; thresholds will not be relaxed after a failure. This audit does not measure conversion, claim physical-device coverage or certify full accessibility.

### Findings and corrections

- [P2, resolved] At773px, the legacy860px centered-intro rule combined with the rebrand's two columns. The narrow host text broke into four centered lines and the title/body had different reading edges. Kept the intro left-aligned at all widths; below1051px, let the heading/body precede the full-width form and retain two field columns above700px. The existing desktop split stays in place. Bounded the existing host image so the explanatory text gets a useful line width.
- [P2, resolved] The privacy checkbox inherited the52px minimum height of ordinary inputs. Excluded checkboxes from the text-field selectors and restored a20px checkbox centered inside its44px label. The privacy control is now a subordinate underlined link with a44px target, instead of a competing full-width outlined button. Native types, consent binding, form validation/status/disabled behavior and API are unchanged.
- [P2, resolved] Input placeholders had2.648:1 contrast. The final placeholder color#76685c measures5.293:1 against#fffdf9; field boundaries#8c8074 measure3.789:1. Focus/error borders retain their separate treatments. Privacy link#665b52 measures6.493:1.
- [P2, resolved] The cream desktop subtitle on orange had3.412:1 contrast at16px regular. Raised it to the19px/700 bold subtitle tier, meeting the3:1 large-text criterion without changing the approved palette. The short-screen CTA still ends at692px in a720px viewport. Mobile intro remains15px ink on orange,4.533:1.
- [P2, resolved] Portrait qualification labels and the whole-startup-cost caveat were12px. Made them13px, matching the other financial caveats. Raised the expanded support text to15px and its draft-status label to13px. The first support reading pass exposed a split Korean word in a definition description; added keep-all with break-word fallback and inspected the final320px rendering. Removed the residual1px FAQ/form separator to honor the accepted reduction in horizontal lines.

### Matched evidence and outcome

The current-run tablet pair is before-tablet-form.jpg / after-tablet-form.jpg,773×954, DPR1, private route#lead-capture entered from the same header CTA, empty form and identical static host asset. The mobile pair is before-mobile-form.jpg / after-mobile-form.jpg,390×844, DPR1, same route/action/state. comparison-tablet-form.png and comparison-mobile-form.png put the unchanged-size inputs side by side with24px separation and34px labels; both were inspected. The final tablet capture uses the browser's reset native viewport, replacing a softened interim override capture. The1280×800 hero evidence is cropped without scaling from full-document images at y0. Short-desktop viewport-only captures demonstrate bounds and interaction, not fine raster-font fidelity. Early before-mobile-2..7 captures include ongoing transitions and are not static palette/number evidence.

| Criterion | Outcome | Evidence |
| --- | --- | --- |
| AWG-01 | 통과 | All seven1280×720 chapters inspected, using settled numeral/actor states and parked growth state. Following content bottoms≤640.77, guide top652. First-screen CTA bottom692. Native320px fee reading after scrolling has CTA460.63–504.63, guide top664. Long portrait chapters remain scrollable; an action initially below the fold is not treated as clipped content. First/form/menu/FAQ guide hiding verified. All inspected widths have0px document overflow. |
| AWG-02 | 통과 | At773px label, title, body and host text all start x38.64. Form width695.72, two field columns314.86. At320px intro edges all x24. Matched screenshots show coherent left reading and form hierarchy. |
| AWG-03 | 미검증: actual glyph renderer identity. License, supply, coverage and visual type checks passed. | Local Black Han Sans TTF version1.200 matches the official font byte-for-byte, SHA256e0a6efb36ee2b57c3d4bb8eb5b2c81b8806a92e156d1465a2c23cf1f5dd51b8c, upstream Git blob5908954af3795260fc921805be5861d8723f3b5b; OFL also exact. Name/cmap parsing confirms regular and complete coverage of sampled Korean/English/numerals/punctuation. Page asset inventory observes the served TTF and the pinned Pretendard1.3.9 CSS. CSS families/fallbacks and visible shapes inspected. Browser has no rendered-font inspector and its read-only DOM does not expose an iterable FontFaceSet, so computed CSS/assets are not claimed as definitive actual glyph-font identity. |
| AWG-04 | 통과 in inspected roles/states | Measured final placeholder5.293, field boundary3.789, privacy6.493 and orange ink4.533. Large cream-on-orange3.412/3.158 passes the3:1 tier; default faded ink guide on cream6.04. Caveats≥13px, expanded terms15px. Field labels and decorative/menu captions use their approved smaller control/caption tier. narrow-terms-final.jpg and narrow-terms-anchor.jpg show the final reading/anchor conditions. |
| AWG-05 | 통과 | Checkbox20px, label44px, privacy44px, final submit58px and2px focus outline verified. after-narrow-consent.jpg and after-mobile-consent.jpg show aligned consent and subordinate link. Privacy opened with Enter, Escape closed it and returned focus to its trigger. final-consultation.jpg shows the normal native773×954 form and the matching ink header/final CTAs together. |
| AWG-06 | 통과 | All seven desktop destinations work. Native mobile menu opens/closes/Escape returns focus, menu anchor arrives y66.03 below66px header, FAQ opens with Enter, story conditions link opens disclosure at y81.89 and consultation anchor exposes its heading. Visible menu images have no failed loads. Final lint, client/SSR build, prerender and whitespace checks pass. No lead submitted. |

Official font licenses checked2026-10-03: [Black Han Sans original OFL](https://github.com/zesstype/Black-Han-Sans/blob/master/OFL.txt) and [Pretendard1.3.9 OFL](https://github.com/orioncactus/pretendard/blob/v1.3.9/LICENSE). Both permit commercial web use and redistribution subject to their OFL conditions. Local copyright/license is retained; no new font is introduced. The Black Han Sans provenance is also recorded in its existing README. Pretendard remains the existing pinned external static100–900 distribution; display uses400, body/control roles400–750, with system sans-serif fallbacks.

Baseline source snapshot: HEAD9239574 plus baseline-source.patch, SHA2563e38ca65ad626c9ea80d55e03347b306e1fe2556525609bae4785c2e7a4d9548. final-source.patch records the completed source relative to that same HEAD, SHA2566e02156db3ff3961cab169cc2706a12b21b13031e7dc98bfec5f7261a99e2803. Browser viewport override reset; final warning/error log empty. API tests were already passing in the preceding accepted change and were not rerun for these CSS-only corrections. No new test harness, generated assets, deployment or client communication. Conversion impact, physical-device behavior, screen-reader coverage, OS reduced-motion emulation and actual rendered-font identity remain outside the verified evidence.

final result: authorized corrections complete; inspected visual/interaction criteria passed, with the font-inspector evidence limitation stated above.

## 2026-10-03 - Massive character composition

Criteria MC-1003-v1, recorded before edits. Source: the user's approved oversized poster direction and explicit request to implement it, including image generation when useful. Preserve the accepted copy, qualified values, type, palette, CTA and seven-step guide. Current source and assets are saved in massive-character/baseline.patch. Existing1,122×1,402 pose sets remain the animation source; one identity-preserving transparent bust is authorized for the consultation form. This is local implementation, not public rollout.

| ID | Source / purpose | Observable acceptance condition | Check |
| --- | --- | --- | --- |
| MC-01 | User wants the character to dominate with varied camera distance | Desktop1/3/5/7 use intentional lower-body/edge crops: virtual full-body height≥110%/105%/170%/125% of the viewport respectively.2/4/6 use large full-body heights≥80%. Character artwork is materially larger than baseline, with the most assertive close framing on5. Face, eyes and goatee remain recognizable; clipping is intentional at body/hat edges rather than accidental facial loss. | Matched1280×800 chapter captures; computed image-canvas size distinguished from visible window; inspect original pixels and settled poses. |
| MC-02 | Preserve the owner's reading task and guide | Financial values, units, conditions and CTA remain fully readable in reserved text lanes, with no opaque artwork covering them. The editorial guide has its own clear bottom lane. All seven destinations and conditions/form entry continue working. |1280×800,1280×720,773×954,390×844,320×740; inspect settled/transition frames and native/keyboard actions. |
| MC-03 | Massive mobile composition | Portrait scenes use large full-width windows with varied bust/full-body framing. Labels/values/conditions stay grouped before artwork; the CTA remains reachable after it. No horizontal document overflow beyond1px or face distortion. | Matched phone screenshots, scroll entire chapters and use guide/CTA. Recheck orientation restoration and short-layout fallback. |
| MC-04 | Consultation hook | Form's character appears as a substantial bust, replacing the tiny existing host rendering. Tablet uses a separate image lane beside the hook; phone retains readable full-width text and a large portrait below it. Form inputs, consent and submit retain their contract and keyboard states. | Desktop/tablet/phone rendered normal states, portrait-alpha/identity inspection, privacy open/Escape, no lead submission. |
| MC-05 | Asset and motion protection | Original source assets remain untouched, new portrait is a sibling production asset with true alpha and matching face/hat/clothing. Existing pose/number/entrance/replay performances remain functional; reduced-motion flow has corresponding static framing. Accepted Black Han Sans/Pretendard provenance from AWG-03 remains applicable. | Asset metadata plus visual inspection; ordinary motion states/replay and static source guard; lint, build and affected checks. |

Evidence root: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/닭장수_첫화면_1003/massive-character/`. Criteria will not be relaxed to pass a failed layout. Typeface identity-inspector limits and unmeasured conversion impact from the preceding audit remain applicable. User's approval supersedes the prior smaller character scale, while retaining all financial qualifications and functional contracts.

### Implementation and corrections

- Added one shared image canvas inside the existing traveler, independent of its clipping window. Existing pose sets, gestures, amount performances and replay remain intact. Desktop virtual image heights are128%,80%,116%,80%,180%,80%,128% of the viewport, with large upper-body crops on1/3/7 and close framing on5. Right/left text lanes reserve room for all values and conditions; body crops end at the existing guide lane.
- Flowing chapters use full-viewport portrait windows and separate scene cameras. Corrected legacy important/specificity rules that initially retained a small window or an off-center mobile margin. Active actor and static-placeholder image heights now match:390px fee760.5, royalty1,170 and invitation916.5. Source images were not rewritten.
- Added a true-alpha, identity-preserving consultation bust through the built-in ImageGen tool. Tablet pairs it beside the hook, phone shows it below readable full-width copy, and desktop uses a substantial cropped portrait in the existing left column. The output is1,122×1,402 RGBA,1,683,331 bytes,707,521 fully transparent pixels. PNG SHA256d860b14d3953861e518465cda1f086862f3920b97902a76ff559e98ebf322606. Saved production path: `src/frontend/public/rebrand/poses/massive-portrait-v1/consultation-bust.png`. Original tool output and review copy are retained.
- [P2, resolved] Changing between portrait and sticky layout reset an already-ended growth act to playing, hiding its information/CTA. Preserve the selected chapter's completed performance during layout restoration. Verified parked/settled/visible at773×954 and after returning to1280×800.
- [P2, resolved] Changing height inside the sticky layout advanced the reader from chapter6 to7 as the viewport-based track shortened. Preserve the current chapter center during sticky-mode resize. Verified1280×720→1280×800→1280×720 stays on chapter6 with parked state and visible CTA. No form/API behavior or financial wording changed.

### Evidence and results

- hero-comparison.png uses before-desktop-1.png / desktop-1-final.png, both1,280×800, scene1 at scroll0. Before was captured in this run during the original presenting gesture; after is settled neutral. Gesture difference is excluded from scale/asset-drift judgments. The same original pose set and all numbers/conditions/type remain. The native-size after image was cropped without scaling from desktop-1-final-full.jpg at y0.
- royalty-comparison.png compares the prior AWG final1280×720 settled royalty view (web-guide-audit/after-short-5.jpg, unchanged story baseline) with current short-5.jpg at the same viewport/chapter/settled pose. Tablet-form-comparison.png compares the prior AWG final773×954 form view with current first-pass-tablet-form.jpg, same header-anchor action and empty form. These reused baselines represent the unchanged pre-MC story/form source; no claim is made that they were freshly captured in this run. All three comparisons were inspected. Source/after pixels retain their original dimensions;24px separation and34px labels are added. Large composite viewers may scale the display, and the old short baseline is softer than the new capture, so fine glyph raster fidelity is not inferred from that pair.
- short-1.jpg through short-7.jpg record current settled/parked1–7 at1280×720. desktop-6-final.jpg records the restored completed act. first-pass-desktop-3/4/7, first-pass-tablet-1/form, mobile-7, mobile-form and narrow-form record the inspected compositions. Early first-pass captures and mobile-5-reading.jpg precede the final guide-window/full-bleed fixes and are iteration evidence, not final geometry proof.

| Criterion | Result | Observed evidence |
| --- | --- | --- |
| MC-01 | 통과 | The declared virtual-height targets are met. The original PNG dimensions/aspect are preserved; character canvas and visible crop are measured separately. Comparisons show a substantial increase, recognizable face/hat/goatee and deliberate torso/hat-edge crops. |
| MC-02 | 통과 | At1280×720 all following copy bottoms≤640.77 and guide top652. Portrait/invitation windows are clipped at the guide's beginning; values, units, qualifiers and actions retain their own lanes. Explore, numbered jumps, first-screen hiding, conditions link (opened at y100.02 below80px header) and final consultation entry work. |
| MC-03 | 통과 | Inspected773×954,390×844 and320×740 flowing views,0px horizontal document overflow.390px invitation window x0–390 and height573.91; active/static camera heights match. Face stays recognizable and undistorted; long scenes scroll to their following CTA. Layout and same-mode-height switches retain the selected reading chapter. |
| MC-04 | 통과 |773px bust326.08×407.44, beside the hook;320px bust272×407, below it. Local portrait naturalWidth1,122 and0 failed completed images. Native privacy Enter/Escape returns focus; narrow submit230×58 with2px keyboard outline. No inquiry submitted. |
| MC-05 | Ordinary motion/assets 통과; reduced-motion rendered view 미검증 | Original pose/number timelines and replay inspected. Growth parks in the new enlarged camera and survives both resize paths. New asset alpha/face/hand/logo/materials inspected. Static fallback has corresponding framing in source; no OS reduced-motion emulation/physical-device/screen-reader certification is claimed. Font provenance and actual-font-inspector limitations are reused from AWG. |

Final source snapshot includes tracked changes plus the new CSS/PNG: massive-character/final-source.patch, SHA256e6257d13bb8bcf0a3f078a704456c329a2da5f05a9a91f681de229a28581e26f, relative to HEAD9239574. Final lint, client/SSR build, prerender, all7 offline API tests and Git whitespace passed. One historical Vite reload error occurred while the new stylesheet import preceded saving its file; it recovered after the file was created. Subsequent rendered checks and production builds succeeded. No public deployment or client communication is part of this change. Conversion impact remains unmeasured.

### Generated asset prompt

Built-in `image_gen` with transparent_background=true. Primary reference: poses/consultation-invite-v1/02-invite.png; supporting reference: character-cutout.png. The actual output dimensions above take precedence over the prompt's conditional resolution request. Exact final prompt:

```text
Use case: identity-preserve. Asset type: one production transparent 3D mascot portrait cutout for the existing Dakjangsu franchise landing page, to be displayed as a massive close portrait beside the consultation headline. Image 1 is the PRIMARY character identity, facial proportions, clothes, Korean apron logo and rendering reference. Image 2 is supporting identity/material reference. Render exactly the same middle-aged Korean male mascot, no redesign: warm tan face, half-smiling kind eyes, thick black eyebrows, curled black mustache, the same distinctive pointed black goatee, tall black Korean gat with broad brim and fine gold band, cream textured hanbok and charcoal apron. Preserve the face, age, body style, materials and warm studio lighting of Image 1. Change composition to a high-resolution waist-up portrait, frontal eye contact, gentle confident smile, one open presenting palm extending toward the viewer's left as in Image 1. Keep both hands anatomically natural, five fingers each. The face, gat and upper torso dominate the image; head and hat together occupy about the upper half of the canvas. Keep the entire hat brim inside the image with minimal padding and clean alpha edges. Bottom crop at waist, no legs. Portrait approximately 4:5 aspect, at least 1536px tall if supported. Truly transparent alpha background, no colored backdrop, no cast floor shadow, no scene, no frame, no text outside the existing apron embroidery. The apron embroidery, if visible, must read exactly '닭장수후라이드' with the tiny '和' as in Image 1; do not add any slogans, badges or benefits. Premium polished tactile 3D render matching the references, sharp facial and fabric detail suitable for large web display. Keep mascot identity and palette invariant.
```

final result: massive local implementation complete; ordinary responsive/interaction checks pass with the static-render/font-inspector limitations stated.

Fresh-start check: reloaded the private preview after implementation, then reset the temporary viewport and showed the selected in-app tab14 at#top. final-in-app.jpg captures its final1280×800 scene1,0px overflow and hidden first-screen guide. Warning/error entries after this reload are empty; the earlier transient Vite entry is historical. Browser tab is retained as the deliverable.
