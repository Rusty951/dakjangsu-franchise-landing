# 닭장수후라이드 창업 안내

현재 리브랜딩 랜딩페이지의 기준 소스입니다. 기본 브랜치는 `main`입니다.

## 화면

`/?concept=rebrand`에서 창업 지원 안내, 매장 외관과25평형 실내 시안, 점주 인터뷰4개, 기본 펼침 FAQ와 창업 상담을 제공합니다.

검토 사이트: https://dakjangsu-client-sample.vercel.app/?concept=rebrand

혜택의 적용 조건은 확인 중입니다. 공개 문구의 수치와 조건은 임의로 확정하지 않습니다.

## 실행과 검증

```sh
npm --prefix src/frontend ci
npm --prefix src/frontend run dev
npm run lint
npm test
VITE_REVIEW_ONLY=true npm run build
```

## 배포

Vercel Root Directory는 저장소 루트, build command는 `npm run vercel-build`, output은 `src/frontend/dist`입니다. Git push 자동 배포는 꺼져 있으며 배포는 명시적 요청에 따라 CLI로 실행합니다.

샘플 프로젝트는 `dakjangsu-client-sample`입니다. 빌드와 함수 실행 환경 모두 `VITE_REVIEW_ONLY=true`를 유지합니다. 검토 모드에서는 검색 색인을 막고 분석 스크립트와 실제 상담 전송을 비활성화합니다.

## 구조

- `src/frontend/src`: React UI와 유틸리티
- `src/frontend/public`: 사용하는 웹 자산과 이미지 원본
- `src/frontend/scripts`: 빌드 전처리와 공유 카드 원본
- `api/leads.js`, `src/frontend/api`: 상담 API
- `tests`: 모션과 상담 API 검사
- `docs/backend/api-contract.md`: API 계약과 환경 변수
- `docs/context/brief.md`: 현재 페이지 구성과 운영 조건

전화1588-2287, 카카오톡 https://pf.kakao.com/_IzdXX/chat, 페이스북 https://www.facebook.com/juwanfood
