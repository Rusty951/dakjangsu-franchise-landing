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

## Benefit-first revision

Hero prioritizes 440만원 fee exemption and two years of royalty exemption, marked as draft proposals. Second scroll chapter now introduces the 740만원 opening package. Detailed benefits immediately follow the story, ahead of product and interior details. Package breakdown is 440 + 100 + 200, without double counting kitchen/royalty/growth offers. Eligibility details and non-cash explanation remain.

Observed desktop 1280x720 and mobile 390x844 hero, support scene and package detail. Large amounts and their qualifiers remain visible; no horizontal page overflow. One active story panel, correct chapter order, benefit details before menu, and consultation anchor verified. Build/lint/diff checks passed. Local review only.

## One benefit per scroll screen

Latest user clarification supersedes the timed multi-card hero experiment. Seven native-scroll scenes now introduce the character, then devote a viewport each to fee exemption, opening package, kitchen support, royalty exemption and logistics credit, followed by consultation. Menu and space content remain later in the document. Numeric totals, conditions and 740만원 inclusion of 440만원 are preserved.

Browser: 390x844 fee, opening and kitchen inspected; native scroll moved from fee to opening. 1280x800 royalty and logistics scenes inspected. Seven panels, one active at rest, no horizontal overflow. Static reduced-motion path source-reviewed. Build/lint/diff checks passed. Screenshots inspected inline.

## 2026-09-29 종합 자체 검수

대상 버전: 46a4330에서 시작한 현재 로컬 리브랜딩 시안. 검수 기준은 악마의 대변인, 프레임스토밍, 콘텐츠검수 R/U/E, Product Design audit의 화면 및 접근성 기준이다. 독립 평가자나 실제 가맹 희망자의 반응을 측정한 결과는 아니다.

### 판단

한 화면에 혜택 하나를 크게 보여주고 닭장수가 동행하는 방향은 유지한다. 다만 모든 스크롤 위치에서 읽을 수 있다는 이전 검수 판단은 수정한다. 장면 중앙만 검수해서 전환 중 멈춤 문제를 놓쳤다.

### 확인한 문제와 수정

1. 642x988의 실제 중간 스크롤에서 740만원 장면 opacity 0.227148, 다음 500만원 장면 0.0728518이 동시에 표시됐다. 숫자와 설명이 겹치고 희미했다. 현재 장면만 opacity 1로 유지하도록 고쳤다. 캐릭터 위치 보간은 유지하고 새 장면의 짧은 이동만 적용했다. 새로고침 후 진행률 57.359%에서 하나만 opacity 1, 나머지 0을 확인했다. 다음 스크롤에서 로열티 장면도 하나만 표시됐다.
2. 320x568에서 stage bottom 586, footer bottom 573으로 화면 아래가 잘렸다. 일부 탐색 버튼 폭은 16.56px였다. 작은 화면의 최소 높이와 타이포 간격을 조정했다. 수정 후 stage bottom 568, footer 511~555, 본문 bottom 468.98. 버튼은 약 38.57x44px, 가로 넘침 없음. 조건 글자를 10px에서 11px로 키웠다.
3. 필수 입력은 화면과 사용자 정의 검증에만 표시되고 입력 요소의 required가 없었다. 성함, 연락처, 희망 지역, 개인정보 동의에 required를 추가하고 동의 오류를 aria-describedby로 연결했다. DOM에서 네 필수 항목을 확인했다. 실제 문의는 제출하지 않았다.

### 화면별 확인 범위

1. 첫 화면: 현재 구조와 코드 확인. 이번 수정은 소개 문구나 캐릭터 정체성을 바꾸지 않음.
2. 가맹비 440만원: 내용과 산식 확인. 275 + 165이며 부가세 포함 표기 유지.
3. 오픈 740만원: 현재 데스크톱 화면 확인. 앞의 440을 포함하는 합계라는 본문과 현금 지급 아님 표기 유지.
4. 주방 500만원: 작은 화면 수정 전후 직접 확인. 냉장고 300 + 튀김기 200, 대상 조건 확인.
5. 로열티 2년: 중간 스크롤로 전환 후 단일 패널 표시 확인.
6. 물류 월 최대 100만원: 코드의 3,000/4,000만원 매출 조건과 다음 달 차감 표기 확인. 이번에는 별도 화면 캡처하지 않음.
7. 마지막 상담 장면: 코드 확인. 별도 화면 캡처하지 않음.
8. 상세 조건: 펼치기 직접 확인. 면적, 상권, 전체 신규 공사, 의무 운영과 환수 조건이 열림.
9. 상담: 상단 버튼으로 바로 이동, 320x568 배치와 필수 요소 확인. 전송 및 수신은 미검증.

### 악마의 대변인

- 큰 숫자가 실제 제공을 보장한다는 근거는 없다. 현재 자료는 2026년 8월 초안이며 실제 시행과 모집 잔여 수량은 미확인이다. 디자인 시안의 검토와 공개용 조건 확정은 구분한다.
- 440과 740을 연속으로 보여주는 방식은 별도 금액으로 기억될 위험이 있다. 현재 포함 관계와 구성표가 반론을 일부 해소한다. 1,180만원으로 합산하지 않는다. 실제 독자의 이해는 확인하지 못했다.
- 페이지 전체 높이는 관찰한 642x988에서 16,435px였다. 혜택 연출 뒤 비슷한 내용을 다시 크게 설명해 반복이 발생한다. 상단 상담 우회는 작동하지만 이탈이 줄었다는 증거는 없다. 후속 개선은 뒤쪽 상세 혜택의 요약화를 우선 검토한다. 사용자가 선택한 전면 혜택 연출은 유지한다.

### 리프레이밍

F0 원문: “난 스크롤 옮기면서 지원이 한개씩 크게 한페이지 다 담기게 들어가면 좋겠어”. 목표는 가맹 희망자가 혜택을 강하게 인지하고 상담할 수 있게 하는 것. 캐릭터, 주황색, 한 화면 한 혜택은 고정한다.

- F1 주목: 각 화면에서 가장 먼저 기억되는 것이 혜택인지 본다. 큰 숫자와 단일 장면 구성을 유지한다. 다음 확인은 가맹 희망자가 장면을 본 뒤 핵심 항목을 회상할 수 있는지다.
- F2 이해: 내 점포에 적용되는 지원과 포함 관계를 구분할 수 있는지 본다. 740에 440이 포함되는지, 500 지원 조건이 있는지 설명하게 해보는 것이 판별 방법이다. 우선 검증할 프레임이다.
- F3 행동: 혜택을 이해한 사람이 원하는 시점에 상담할 수 있는지 본다. 상단 상담 버튼의 실제 이동은 확인했다. 상담 클릭과 유효 문의가 증가하는지는 미측정이다.

### 콘텐츠검수

목적을 기준으로 U를 주력, R과 E를 지원 축으로 보았다. 점수는 편집 판단용이며 심리척도나 성과 예측값이 아니다.

- R 3, 확신도 중간: 창업 시점의 비용과 운영 부담이 구체적이다. 실제 예비 점주의 발화나 반응은 없다.
- U 3, 확신도 중간: 금액 구성과 적용 조건을 확인할 수 있다. 실제 시행 여부와 전체 창업 견적은 미확인이다.
- E 3, 확신도 중간: 캐릭터와 큰 숫자로 연속 장면의 목적이 분명하다. 이후 내용 반복은 소비 부담을 늘릴 수 있다.

### 검증 한계와 결과

build, lint, git diff --check 통과. 브라우저에서 현재 화면을 직접 캡처해 확인했으나 문서화된 캡처 API에 로컬 저장 기능이 없어 캡처 파일을 보존한 정식 감사 패키지는 만들지 못했다. 화면 및 코드 기반 자체 검수다. OS의 reduced-motion 설정, 스크린리더 전체 탐색, 실제 문의 수신, 본사 프로모션 시행은 별도 미검증. 결론은 방향 유지, 관찰된 가독성 및 작은 화면 오류 수정 완료, 실제 고객 이해와 확정 조건 확인 필요다.
