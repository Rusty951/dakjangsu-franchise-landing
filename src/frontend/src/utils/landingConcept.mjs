// 운영 사이트는 주소의 concept 값과 상관없이 항상 리브랜딩 화면을 보여준다.
// 예전 시안은 검토 빌드(VITE_REVIEW_ONLY=true)에서 이름을 정확히 적었을 때만 열린다.
export const REVIEW_CONCEPTS = ['popart', 'street', 'character', 'legacy'];

export function resolveLandingConcept(search, reviewOnly) {
  const requested = new URLSearchParams(search || '').get('concept');
  if (reviewOnly && REVIEW_CONCEPTS.includes(requested)) return requested;
  return 'rebrand';
}
