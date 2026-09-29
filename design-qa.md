# Rebrand design QA

Date: 2026-09-29

## References

- Selected composition: https://dribbble.com/shots/18881631-Landing-page-Interactive-Hero-banner
- Visual source: https://cdn.dribbble.com/userupload/3175503/file/still-022a321e9d35379f5612d27f092054dd.png?resize=1600x1200
- Implementation: http://127.0.0.1:5173/?concept=rebrand
- Canonical assets: src/frontend/public/rebrand/bi-warm-ink.png and character-3d.png. Transparent derivative: character-cutout.png.

## Visual comparison

Reference and final desktop browser screenshots were reviewed together in the same tool response. Browser screenshots were displayed inline, not saved as files.

The implementation preserves the centered character and prominent wordmark hierarchy. Cream background, black canonical logo, full-body character, Korean copy and franchise CTA are intentional user-requested adaptations. Original reference lighting, space imagery and third-party character are not reused.

Desktop 1280x900: logo legible, foreground character clear, copy and CTA separated from character. Mobile 390x844: logo, character, left headline and lower CTA remain readable without horizontal overflow. All five page images loaded. Benefit cards stack on mobile; draft status appears before monetary figures. Conditions disclosure opens successfully, benefit anchor navigates correctly.

## Content and verification

August 12 benefits source is an internal draft. Draft status, quantities, qualification conditions, illustrative royalty savings and logistics-credit meaning are retained. No guaranteed total grant claim. No external publication and no live form submission.

npm run build: passed
npm run lint: passed
git diff --check: passed

final result: passed

## 2026-09-29 Upgrade review

F0: “훨씬 나은 수준으로 업그레이드 해줘”. Audience: prospective franchise owners. Fixed choices: cream background, black canonical BI, foreground character, local preview.

Reframing compared three distinct interventions: visual memorability (hero hierarchy), product understanding (real menu and store visuals), and decision uncertainty (cost/support distinctions, eligibility, consultation path). Chosen sequence combines product understanding before support, followed by decision guidance; brand hero remains the entry. This is a design hypothesis, not demonstrated conversion improvement.

Devil's advocate findings against the previous recommendation: a strong character does not by itself explain the business; an oversized zero may imply more fees are waived than documented; past average-revenue examples add little decision value and can suggest expected earnings. Added product evidence and FAQ, replaced zero emphasis with named fee exemption, removed average-revenue examples. No fabricated testimonials, sales guarantees or exact total investment.

Content review (self-review, not independent): usefulness is primary, relevance and engagement support it. R=4, medium confidence: prospective owners can distinguish unselected sites and conversions. U=4, medium confidence: conditional support, non-cash benefits and unknown total costs are explicit. E=3, medium confidence: character, food, space and support vary the page rhythm; actual audience engagement remains unobserved. These are editorial rubric judgments, not measured customer outcomes.

Current-run browser steps:
1. Hero: cream and black composition retained, direct consultation CTA added; desktop and mobile inspected.
2. Menu: actual existing product photography and three menu assets, desktop/mobile screenshots inspected.
3. Space: selecting wide hall changed image, selected state and caption. Concept status is explicit.
4. Support: preserved draft status and detailed conditions; no cash-total headline.
5. FAQ: mobile total-investment disclosure opens correctly.
6. Consultation: anchor reaches existing form; visible form styling reviewed. No real inquiry submitted.

Viewports: 1280x900 desktop, 820x1000 tablet, 390x844 mobile. DOM checks: no horizontal overflow, one H1, all rendered images loaded. Keyboard navigation to menu verified. Skip link, pressed states, native details and reduced-motion styles present; full assistive-technology compliance not tested.

Capture limitation: screenshots were inspected inline through the browser tool. Its documented screenshot API returns image bytes without a filesystem-save method, so this is an implementation review with inline evidence, not a complete saved-screenshot audit package.

Applied skills: devils-advocate, framestorming, content-resonance-loop, copywrite, Product Design audit guidance. Korean Style QA and client Voice checked. All numeric offers remain an internal draft awaiting headquarters confirmation before external use.

Build and lint passed after implementation. Final result: passed for local design review; commercial terms remain provisional.

## Orange narrator direction

The latest user direction replaces the cream hero with brand orange #d86535. Enlarged black BI and foreground canonical character, with a cream speech bubble. Five portrait-and-message guides continue the same speaker through menu, space, benefits, consultation preparation and FAQ.

Inspected current desktop 1280x900 hero and menu, mobile 390x844 hero and menu via browser screenshots. Logo remains legible, character is visibly larger, guide portraits crop to face/shoulders, no horizontal overflow. New copy is character narration, not a customer testimonial or an asserted personal experience. Existing conditions remain intact.

Final result: passed for local preview.

## Scroll-linked story implementation

Latest approved direction: one large character connects five full-screen scenes; no speech bubbles. Native scroll controls character position and height, with a sticky stage and changing orange/ink/cream scenery. Details follow outside the sticky stage.

Observed at 1280x900: welcome, food, interior, conditional 440만원 fee exemption, consultation invitation. Observed at 390x844: welcome, food, support and invitation. Mobile final CTA originally appeared behind the character; corrected panel stacking and visually verified the complete opaque CTA above it.

Browser interactions: native downward scroll changed scene; upward half-page scroll returned toward support and produced an intermediate character position (left 71.1044%, height 52.459%, bottom 0.481365%), demonstrating continuous reversible interpolation rather than only chapter jumps. Chapter buttons reached their scenes. Consultation link navigated to #lead-capture. DOM: one traveler, no old speech or portrait guides, one active story panel, no horizontal overflow.

Reduced-motion CSS presents scenes in normal flow with a static welcome character. Source reviewed; OS preference was not changed during testing. Screen-reader completeness not independently tested. Existing benefits remain provisional and visible with conditions.

Build, lint and git diff --check passed. Browser screenshot evidence was inspected inline; no saved screenshot artifact.

Final result: passed for local preview.

## Articulated hand motion

Added alternate waving pose and independent hand transforms with a small body lean. Native SVG image layers use the canonical resting asset and a transparent generated greeting asset. Gestures last 3.6 seconds per chapter, then stop. Image readiness, offscreen and hidden-tab pauses are handled. Reduced-motion retains the existing static story fallback.

Inspected desktop 1280x720 welcome and intermediate scenes, mobile 390x844 welcome/menu/support/invitation. Verified computed wrist transform changed during playback (example matrix 0.999066, -0.043218, 0.043218, 0.999066) and returned to identity. Generated image loads, no horizontal page overflow, greeting hand and final CTA visible. Screenshots inspected inline only. Build and lint passed. The gestures are a layered 2D approximation; no finger bending, lip sync or 3D joint rig is claimed.
