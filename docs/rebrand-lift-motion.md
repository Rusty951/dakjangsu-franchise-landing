# 닭장수 100만원 리프트 모션

## 웹 적용

- 범위: 리브랜딩 페이지의 여섯 번째 운영 지원 장면.
- 총 4.2초. 준비 자세에서 중간 자세를 거쳐 양손을 올립니다. 숫자는 0.76초에 회전을 시작하고 마지막 자릿수가 멈추는 약 2.8초에 주황 배경과 숫자 강조가 연결됩니다.
- 캐릭터는 결과를 잠시 받친 다음 오른쪽으로 이동합니다. 축소 중에 중간 자세와 준비 자세를 역순으로 거쳐 팔을 내리고, 마지막에는 기존 `character-cutout.png` 포즈로 돌아옵니다. 캐릭터 이동 완료 이벤트 후 지원 조건을 표시합니다.
- 숫자 박스의 실제 위치를 기준으로 손바닥 높이를 맞춥니다. 모바일에서는 조건 옆에 캐릭터의 최종 자리를 확보합니다.
- 장면에 다시 들어오거나 현재 장면의 운영 버튼을 누르면 재생합니다. 모션 감소 설정에서는 정적인 금액과 조건을 바로 표시합니다.
- 이미지 로딩 실패 시 기존 캐릭터로 돌아가며 금액과 조건을 계속 표시합니다.

### 적용 자산

- `src/frontend/public/rebrand/character-lift-ready.webp`
- `src/frontend/public/rebrand/character-lift-mid.webp`
- `src/frontend/public/rebrand/character-lift-push.webp`

모두 1024 × 1536, 투명 배경. 생성 PNG 원본에서 시각 수정 없이 WebP로 인코딩했으며 합계 약 607KB입니다.

### 검수

- 실제 데스크톱 콘텐츠 뷰포트 1440 × 852, 모바일 375 × 619에서 준비, 리프트, 슬롯 정지, 최종 배치를 확인했습니다.
- 두 화면 모두 가로 넘침이 없고 조건과 장면 탐색 버튼이 겹치지 않습니다. 모바일 최종 캐릭터는 높이 120px로 조건 오른쪽에 배치됩니다.
- 스크롤 이탈 시 리프트가 제거되고 재진입 시 준비부터 시작하는 것을 확인했습니다. 키보드 Enter로 운영 버튼 재생을 확인했습니다.
- 모션 감소와 이미지 실패 처리는 코드로 검토했습니다. OS 모션 설정 변경이나 네트워크 실패 주입은 수행하지 않았습니다.
- 프런트엔드 lint, 프로덕션 빌드 통과. 로컬 미리보기에 적용했습니다.

## 이미지 생성 프롬프트

Built-in ImageGen으로 제작한 투명 배경 포즈 3장. 원본은 Codex generated_images에 유지하며 웹에서 사용하는 WebP 사본은 public/rebrand에 둡니다. 얼굴, 복장, 발 위치를 기준으로 검수한 키 포즈이며, 3D 모델이나 관절 리깅 파일은 아닙니다.

## 포즈 생성 프롬프트

### 준비 자세

Use case: identity-preserve.
Asset type: transparent full-body character animation key pose for the existing Dakjangsu franchise website.
Input image 1 is the exact brand character and identity reference. Keep this SAME man, facial geometry, sleepy friendly eyes, curved black mustache, pointed short black beard, Korean black gat hat with its thin ochre band, cream subtly textured hanbok, black apron with brass rivets and waist knot, baggy cream trousers, black traditional shoes. Keep the same polished three-dimensional mascot rendering, proportions and studio lighting. This is NOT a redesign and NOT another person.
Change only the pose: PREPARATION to push a very heavy invisible number upward. Front-facing, feet a little wider apart, knees slightly bent into a shallow squat. Torso leans forward only slightly. BOTH elbows bent, forearms out in front of the chest, palms facing UPWARD like preparing to lift a shelf. Both hands are at upper chest / shoulder level and readable from camera. Fingers naturally curled slightly, anatomically correct five fingers per hand. Head stays upright facing the viewer with a determined yet friendly expression, not grimacing. Hat completely intact.
Compose one single full body isolated character. Orthographic-feeling front three-quarter view matching the original. Tall portrait canvas around 1024 x 1536. Character centered horizontally. Feet baseline around y=1430, character from hat top around y=270 down to feet around y=1430. Leave generous TRANSPARENT space above for overhead arm extension in the matching next pose; leave 10% padding on each side. No shadows on a floor. No environment, no numbers, no text, no props, no platform, no contact shadow. Genuine transparent alpha background. Keep exact clothing colors, face identity, and body proportions. Complete hands, hat, shoes visible.

### 중간 자세

Use case: identity-preserve.
Asset type: in-between animation key pose on transparent background.
Image 1 = preparation frame of the same character; Image 2 = overhead push completion frame. Create ONE middle frame between these exact two frames. Keep the same man and every identity detail, face, eyes, mustache, beard, hat, clothing, proportions, camera, lighting. Keep the 1024 x 1536 canvas, foot baseline near y1430, feet at the same x positions and same width as both references. Do not change the character design.
Pose: knees have begun straightening. Both elbows bent approximately 90 degrees, upper arms spreading diagonally upward. BOTH palms face upwards beside the head at about the height of the top edge of the HAT BRIM, midway between the chest-high hands of image1 and overhead hands of image2. There should be a clear gap between the hands and hat. Hands complete and natural, no extra fingers, no extra limbs. Face looking toward viewer, exact same friendly focused expression. Torso height halfway between the two reference poses. Full body including all hands, hat, feet.
One single character only. REAL fully transparent alpha background, no floor shadow, no glow, no text, no props, no duplicate pose, no contact shadow. This will be placed directly over an orange and black website background. Keep a clean alpha silhouette.

### 밀어 올린 자세

Use case: identity-preserve.
Asset type: second animation key pose for a transparent full-body website mascot.
Image 1 is the EDIT TARGET: the crouching Dakjangsu lifting preparation pose. Image 2 is the original brand identity reference.
Make the NEXT frame of exactly the same man pushing a heavy invisible object UP. Preserve image 1's exact face, hat shape, mustache, beard, cream hanbok, black apron, brass rivets, waist knot, shoes, lighting and polished 3D render style. No redesign. Keep his feet at the SAME image coordinates and the same camera view, scale, 1024 x 1536 canvas.
Change the body pose: knees straighten with a slight athletic bend remaining, torso rises slightly, BOTH arms extend upward and outward above the shoulder line. Elbows almost straight, hands on either side of the hat, palms held horizontally UP as if pressing up the underside of a large shelf. Hands must clearly be ABOVE THE HAT BRIM and close to the top of the hat, leaving transparent padding above. Show two complete hands, natural fingers and thumbs, no extra limbs. The head remains facing the viewer with a proud friendly smile; identical facial identity. Hat is NOT touched and must not hide either hand. Do not crop the raised hands or shoes.
Composition is one centered full-body character on TRUE TRANSPARENT alpha background. Keep feet baseline around y=1430; keep full body scale and x alignment consistent with image 1 for sprite animation. No floor, no environment, no pedestal, no glow, no shadow, no numbers, no text, no added object. Only change the pose from preparing to lift to the full upward pushing pose.
