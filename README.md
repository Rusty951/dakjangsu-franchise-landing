# 닭장수후라이드 창업 안내

현재 리브랜딩 랜딩페이지의 기준 소스입니다. 기본 브랜치는 `main`입니다.

## 기준 저장소와 로컬 경로

저장소는 [Rusty951/dakjangsu-franchise-landing](https://github.com/Rusty951/dakjangsu-franchise-landing), 작업 브랜치는 `main`입니다.

| 컴퓨터 | 코드 정본 |
| --- | --- |
| Mac Studio | `/Users/bananabk/Documents/Projects/dakjangsu-franchise-landing` |
| MacBook | `/Users/bananabk/Documents/Projects/dakjangsu-franchise-landing` |

MacBook 경로는 사용자 전달 보고서의 2026-10-05 17:29 KST 확인 결과를 기준으로 하며, Studio에서 MacBook 파일시스템을 직접 점검한 것은 아닙니다.

Studio의 이전 독립 이력 원본은 `/Users/bananabk/Documents/Projects/dakjangsu-franchise-landing-preserved-legacy-20261005`에 보존합니다. 현재 main에 없는 고유 문서·자료, 독립 로컬 설정과 stash 2개가 남아 있는 정리 예외이며, 정본이나 배포 소스로 사용하지 않습니다. 옛 이력이나 설정을 현재 정본에 자동으로 합치거나 덮어쓰지 않습니다.

## 화면

`/?concept=rebrand`에서 창업 지원 안내, 매장 외관과25평형 실내 시안, 점주 인터뷰4개, 기본 펼침 FAQ와 창업 상담을 제공합니다.

검토 사이트: https://dakjangsu-client-sample-inky.vercel.app/?concept=rebrand

혜택의 적용 조건은 확인 중입니다. 공개 문구의 수치와 조건은 임의로 확정하지 않습니다.

## 실행과 검증

프로젝트 루트에서 실행합니다. Node.js 요구사항은 루트 `package.json`의 `>=20.19.0`입니다.

```sh
npm ci
npm --prefix src/frontend ci
npm --prefix src/frontend run dev
npm run lint
npm test
VITE_REVIEW_ONLY=true npm run build
```

`npm test`는 공급자를 모킹한 오프라인 검사입니다. lint·test·검토 모드 build는 확인했지만 실제 상담 메일 도착이나 운영 추적 수신을 보증하지 않습니다. 실제 상담 전송은 별도 요청이 있을 때만 확인합니다.

## 코드와 운영 자료

React UI와 현재 GA/Meta 브라우저 추적, Resend 상담 API는 이 저장소의 코드입니다. Meta CAPI·당근 추적은 현재 구현에 포함되지 않습니다. 문의 필드와 환경 변수 계약은 [API 계약](docs/backend/api-contract.md), 혜택 조건과 화면 기준은 [현재 프로젝트 기준](docs/context/brief.md)을 따릅니다.

`.env.local`, Vercel 연결 설정과 실제 문의 데이터는 로컬·운영 자료로 관리하며 Git에 올리지 않습니다. 환경 변수 이름과 필요한 설정만 문서에 두고 값은 기록하지 않습니다. 원본 브랜드 가이드와 자산의 출처·권리는 유지합니다.

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

## 복구와 보존

코드 문제는 현재 `main`의 원인 커밋을 확인하고 수정 또는 revert 커밋으로 복구합니다. 이전 원본과 stash는 위 보존 경로에서 유지하며 복구를 이유로 현재 리브랜딩 소스에 다시 적용하지 않습니다. 배포 복구는 실제 배포 대상과 직전 성공 배포를 확인해 별도로 진행하고, 샘플의 빌드·함수 검토 모드를 다시 확인합니다.

[AGENT.md](AGENT.md)는 작업 정책, [검수 기준](docs/review/checklist.md)은 화면·문의 보호 검증을 안내합니다. Desktop 검토 산출물은 소스에 포함되지 않습니다.
