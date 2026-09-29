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
