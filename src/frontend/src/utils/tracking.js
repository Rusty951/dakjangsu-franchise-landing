/**
 * 닭장수후라이드 가맹 랜딩페이지 트래킹 유틸리티
 * PRD 요구사항 10번(트래킹 요구사항)을 충족합니다.
 *
 * 이벤트 목록:
 * - page_view
 * - click_kakao
 * - click_phone
 * - submit_lead
 * - click_instagram
 * - click_youtube
 * - lead_form_start
 * - lead_form_submit
 * - lead_form_error
 */

import { trackMetaPixelEvent } from './metaPixel.js';
import { trackKarrotPixelEvent } from './karrotPixel.js';

const EVENT_ALIASES = {
  cta_kakao_click: 'click_kakao',
  cta_phone_click: 'click_phone',
  cta_email_click: 'click_email',
  lead_form_success: 'submit_lead',
};

const normalizeAnalyticsParam = (value) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.join(',');
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return value;
};

const getAnalyticsParams = (eventData) =>
  Object.entries(eventData).reduce((params, [key, value]) => {
    const normalizedValue = normalizeAnalyticsParam(value);

    if (normalizedValue !== undefined) {
      params[key] = normalizedValue;
    }

    return params;
  }, {});

export const trackEvent = (eventName, eventData = {}, options = {}) => {
  const normalizedEventName = EVENT_ALIASES[eventName] || eventName;
  const normalizedEventData =
    normalizedEventName === eventName ? eventData : { ...eventData, legacy_event_name: eventName };
  const payload = {
    event: normalizedEventName,
    data: normalizedEventData,
    timestamp: new Date().toISOString(),
  };

  // 1. 콘솔 로깅 (디버깅용)
  console.log(`[Tracker] Event Triggered: ${normalizedEventName}`, payload);

  // 2. 브라우저 커스텀 이벤트 발송 (Codex가 연동하기 쉽게 처리)
  const customEvent = new CustomEvent('antigravity_tracking_event', { detail: payload });
  window.dispatchEvent(customEvent);

  // 3. GTM(Google Tag Manager) dataLayer 지원 백업
  if (window.dataLayer) {
    window.dataLayer.push(payload);
  }

  // 4. GA4 직접 설치 이벤트 전송
  if (typeof window.gtag === 'function') {
    window.gtag('event', normalizedEventName, getAnalyticsParams(normalizedEventData));
  }

  // 5. Meta Pixel 직접 설치 이벤트 전송
  if (options.meta !== false) {
    trackMetaPixelEvent(normalizedEventName, normalizedEventData);
  }

  // 6. 당근 전환 추적 직접 설치 이벤트 전송
  trackKarrotPixelEvent(normalizedEventName);
};
