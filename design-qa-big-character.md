# Larger opening character — 2026-10-01

final result: passed

Target: the user's selected first scene, enlarged so 닭장수 has much more presence. The two amounts, benefit calculation, draft status, CTA and other chapters remain the existing target.

## Evidence and comparison

- Source visual truth: `../dakjangsu-7000-review/product-design-final/01-desktop-1280.png` and `02-mobile-390.png`.
- Final implementation: `../dakjangsu-7000-review/big-character-final/`. Nine cases cover 1280×720, 1440×900, 1280×1480, 2048×1152, 2508×1560, 768×1024, 390×844, 375×667, and static reduced-motion mobile.
- The source and implementation were opened together in `compare-desktop.png` (2584×720 including the 24px gap) and `compare-mobile.png` (804×844). Each uses matching 1× pixels/CSS pixels, theme, route, content and the first chapter's greeting state. Enlargement and the zero's move to the right are intentional scoped changes.
- Full-size 390px/375px captures were also inspected for the assumptions, calculation, fee scope, CTA and small-screen crop; their text is large enough to evaluate without an additional crop.
- Mobile motion samples: `../dakjangsu-7000-review/big-character-motion/`. Inspected the bow, left presentation, broad greeting and settled appearance. Five timing points per phone size show exactly one pose and a still finish.
- Browser verification used isolated Chrome because in-app automation is unavailable. An OS capture showed another active Naver tab; it was rejected as first-scene evidence and not added to the deliverables. The local target stays available at port 8874.

## Findings and fixes

- [P2, fixed] Enlarging the mobile character initially put the waving hand under the startup-cost exclusion. Moving its center from 54% to 49% reserves the right reading lane. Final normal and reduced-motion phone captures show the fee scope beside the hand, without collision.
- [P2, fixed] On the 375×667 layout, fragments of the lower body appeared between the benefit card and CTA. The enlarged figure now crops at the card boundary, making the small-screen treatment an intentional upper-body portrait. Final `03-mobile-375.png` shows a clean boundary with no stray lower-body fragment.
- No actionable P0/P1/P2 issue remains within the first-scene scope.

## Required surfaces

- Typography: numeral fonts and sizes unchanged. Existing headline, labels, scenario and fee-only zero remain untruncated. The desktop zero and its fee label move right to reserve room for the bigger figure.
- Spacing: desktop actor container grows from 48% to 70% of stage height; tall panes use 80% with a wider figure. Phone width grows from 28vw to 52vw. This produces about 1.5× desktop and 1.9× mobile asset scale; compact phones deliberately show the upper body. Final geometry checks find no horizontal overflow, offer/condition collision or CTA/navigation collision.
- Colors: retained orange, ink and cream. No new palette or decorative drawing.
- Image fidelity: original raster character and the existing motion component remain intact. Face and hand are visibly larger and clear in inspected captures; no replacement artwork or new asset was generated. A small amount of hat overlap behind the left display numeral on phones is intentional depth, with the face and all copy readable.
- Content: amounts, 7,192만원 example, 6,000만원 monthly-sales/24-month assumptions, HQ-review status and franchise/training-fee scope are unchanged. No new claims.

## Validation and limits

- All nine responsive/reduced-motion cases pass; exploration CTA reaches the existing fee chapter in every normal case. Isolated browser console/error events: zero.
- Enlarged motion settles after its existing 7.2-second act. No motion logic or other chapters changed.
- ESLint, client build, SSR build, prerender and whitespace checks pass.
- This pass does not test forms, backend delivery, real conversion or full accessibility compliance. Public benefit wording still needs HQ confirmation.
- Local branch `codex/hero-7000-preview`, base `a1f78d7`. No commit, push, inquiry submission or external deployment.

Implementation checklist: complete. Preview: http://127.0.0.1:8874/?concept=rebrand
