/**
 * 닭장수후라이드 가맹 랜딩페이지 트래킹 유틸리티
 * PRD 요구사항 10번(트래킹 요구사항)을 충족합니다.
 *
 * 이벤트 목록:
 * - cta_kakao_click
 * - cta_phone_click
 * - lead_form_start
 * - lead_form_submit
 * - lead_form_success
 * - lead_form_error
 */

export const trackEvent = (eventName, eventData = {}) => {
  const payload = {
    event: eventName,
    data: eventData,
    timestamp: new Date().toISOString(),
  };

  // 1. 콘솔 로깅 (디버깅용)
  console.log(`[Tracker] Event Triggered: ${eventName}`, payload);

  // 2. 브라우저 커스텀 이벤트 발송 (Codex가 연동하기 쉽게 처리)
  const customEvent = new CustomEvent('antigravity_tracking_event', { detail: payload });
  window.dispatchEvent(customEvent);

  // 3. GTM(Google Tag Manager) dataLayer 지원 백업
  if (window.dataLayer) {
    window.dataLayer.push(payload);
  }
};
