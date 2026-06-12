import { useEffect, useRef, useState } from 'react';
import './LeadCapture.css';
import { trackEvent } from '../utils/tracking';

const leadApiEndpoint = import.meta.env.VITE_LEAD_API_ENDPOINT || '/api/leads';

const initialFormData = {
  name: '',
  phone: '',
  region: '',
  timeline: '',
  currentBusiness: '',
  preferredContactTime: '',
  message: '',
  privacyConsent: false
};

const timelineOptions = [
  '상담 후 결정',
  '3개월 이내',
  '6개월 이내',
  '올해 안',
  '기존 매장 전환 검토'
];

const operationOptions = [
  '직접 운영 예정',
  '부부/가족 운영',
  '직원 운영 검토',
  '기존 매장 전환',
  '상담 후 결정'
];

const privacyPolicySections = [
  {
    title: '1. 개인정보 수집 및 이용 목적',
    items: [
      '창업 상담 신청자 확인 및 상담 연락',
      '희망 지역, 창업 시기, 운영 형태에 따른 상담 준비',
      '문의 내용 확인, 상담 이력 관리, 고충 처리',
      '유입 경로 분석을 통한 랜딩 페이지 및 상담 품질 개선'
    ]
  },
  {
    title: '2. 수집하는 개인정보 항목',
    items: [
      '필수항목: 성함, 연락처, 희망 지역, 개인정보 수집 및 이용 동의 여부',
      '선택항목: 창업 시기, 운영 형태, 통화 가능 시간, 남기실 말',
      '자동 수집 항목: 유입 경로, UTM 정보, 접속 경로, 브라우저 정보, 제출 시각'
    ]
  },
  {
    title: '3. 보유 및 이용 기간',
    items: [
      '상담 신청 정보는 상담 완료 후 3년까지 보관할 수 있습니다.',
      '관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관합니다.',
      '정보주체가 삭제를 요청하거나 처리 목적이 달성된 경우 지체 없이 파기합니다.'
    ]
  },
  {
    title: '4. 제3자 제공 및 처리 위탁',
    items: [
      '수집한 개인정보는 상담 목적 범위 내에서만 이용하며, 법령상 근거 또는 별도 동의 없이 제3자에게 제공하지 않습니다.',
      '리드 저장, 알림 발송, 호스팅 등 운영에 필요한 업무를 외부 서비스에 위탁할 수 있으며, 위탁 시 개인정보 보호 의무를 관리합니다.'
    ]
  },
  {
    title: '5. 정보주체의 권리',
    items: [
      '정보주체는 개인정보 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다.',
      '요청은 대표전화 1588-2287 또는 상담 채널을 통해 접수할 수 있으며, 확인 후 지체 없이 처리합니다.'
    ]
  },
  {
    title: '6. 개인정보 파기 및 보호 조치',
    items: [
      '전자적 파일은 복구할 수 없는 방식으로 삭제하고, 출력물은 분쇄 또는 이에 준하는 방식으로 파기합니다.',
      '개인정보 접근 권한 관리, 내부 관리, 보안 점검 등 필요한 보호 조치를 시행합니다.'
    ]
  },
  {
    title: '7. 권익침해 구제 방법',
    items: [
      '개인정보침해신고센터: 국번없이 118',
      '개인정보 분쟁조정위원회: 1833-6972',
      '경찰청 사이버수사국: 국번없이 182'
    ]
  }
];

const getTrackingFields = () => {
  if (typeof window === 'undefined') {
    return {
      submitted_at: new Date().toISOString()
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
    landing_path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || '',
    user_agent: navigator.userAgent,
    submitted_at: new Date().toISOString()
  };
};

const normalizePhone = (phone) => phone.replace(/[^\d]/g, '');

const validateForm = (formData) => {
  const nextErrors = {};
  const phoneDigits = normalizePhone(formData.phone);

  if (formData.name.trim().length < 2) {
    nextErrors.name = '성함을 2자 이상 입력해 주세요.';
  }

  if (phoneDigits.length < 9 || phoneDigits.length > 11) {
    nextErrors.phone = '연락 가능한 번호를 입력해 주세요.';
  }

  if (formData.region.trim().length < 2) {
    nextErrors.region = '희망 지역을 입력해 주세요.';
  }

  if (!formData.privacyConsent) {
    nextErrors.privacyConsent = '상담 연락을 위해 동의가 필요합니다.';
  }

  return nextErrors;
};

const buildLeadPayload = (formData) => {
  const payload = {
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    region: formData.region.trim(),
    privacyConsent: formData.privacyConsent,
    ...getTrackingFields()
  };

  ['timeline', 'currentBusiness', 'preferredContactTime', 'message'].forEach((key) => {
    const value = formData[key].trim();
    if (value) {
      payload[key] = value;
    }
  });

  return payload;
};

const parseLeadResponse = (responseText) => {
  if (!responseText) {
    return {};
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return {
      message: responseText
    };
  }
};

const LeadCapture = ({ onKakaoClick }) => {
  const sectionRef = useRef(null);
  const hasTrackedStartRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.26 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPrivacyOpen || typeof window === 'undefined') {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsPrivacyOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPrivacyOpen]);

  const trackFormStart = () => {
    if (hasTrackedStartRef.current) {
      return;
    }

    hasTrackedStartRef.current = true;
    trackEvent('lead_form_start', { section: 'lead_capture_form' });
  };

  const handleFieldChange = (event) => {
    trackFormStart();

    const { checked, name, type, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: type === 'checkbox' ? checked : value
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const handleKakaoClick = () => {
    trackEvent('cta_kakao_click', { section: 'lead_capture_footer' });
    if (onKakaoClick) {
      onKakaoClick();
    }
  };

  const handlePrivacyOpen = () => {
    setIsPrivacyOpen(true);
    trackEvent('privacy_policy_open', { section: 'lead_capture_form' });
  };

  const handlePrivacyClose = () => {
    setIsPrivacyOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      setStatusMessage('필수 정보를 확인해 주세요.');
      trackEvent('lead_form_error', {
        reason: 'validation',
        fields: Object.keys(validationErrors)
      });
      return;
    }

    const payload = buildLeadPayload(formData);
    setStatus('submitting');
    setStatusMessage('');
    trackEvent('lead_form_submit', {
      section: 'lead_capture_form',
      region: payload.region,
      timeline: payload.timeline || ''
    });

    try {
      const response = await fetch(leadApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const responseText = await response.text();
      const responseBody = parseLeadResponse(responseText);

      if (!response.ok) {
        throw new Error(responseBody.message || `Lead API failed with ${response.status}`);
      }

      setFormData(initialFormData);
      setErrors({});
      setStatus('success');
      setStatusMessage(
        responseBody.message || '문의가 접수되었습니다. 담당자가 희망 지역과 창업 조건을 확인한 뒤 연락드리겠습니다.'
      );
      trackEvent('lead_form_success', { section: 'lead_capture_form' });
    } catch (error) {
      setStatus('error');
      setStatusMessage('문의 접수 연결을 확인 중입니다. 카카오톡 상담 또는 대표번호를 이용해 주세요.');
      trackEvent('lead_form_error', {
        reason: 'network_or_api',
        endpoint: leadApiEndpoint,
        message: error instanceof Error ? error.message : 'unknown_error'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`lead-capture-section lead-capture-section--motion-ready${isVisible ? ' is-visible' : ''}`}
      id="lead-capture"
      aria-labelledby="lead-capture-title"
    >
      <div className="consultation-intro">
        <span className="consultation-label">닭장수 창업 상담</span>
        <h2 id="lead-capture-title">
          <span>우리동네에서</span>
          <span>닭장수 창업</span>
          <span><em>가능할까요?</em></span>
        </h2>
        <p>
          <span>상권분석부터 성장가능성까지 상담을 통해</span>
          <span>우리동네 조건을 함께 봅니다.</span>
        </p>
        <button className="consultation-kakao" onClick={handleKakaoClick}>
          카카오톡으로 우리동네 창업 확인하기
        </button>
      </div>

      <div className="consultation-form-wrap" aria-label="닭장수 창업 상담 신청서">
        <form className="consultation-form-card" onSubmit={handleSubmit} noValidate>
          <span className="consultation-note-clip" aria-hidden="true" />
          <div className="consultation-form-head">
            <span>상담 신청서</span>
            <strong>
              <span>희망 지역을</span>
              <span>먼저 남겨주세요</span>
            </strong>
          </div>

          <div className="consultation-form-grid">
            <label className="consultation-field" htmlFor="lead-name">
              <span>성함 <em>필수</em></span>
              <input
                id="lead-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleFieldChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'lead-name-error' : undefined}
              />
              {errors.name && (
                <small className="consultation-field-error" id="lead-name-error">
                  {errors.name}
                </small>
              )}
            </label>

            <label className="consultation-field" htmlFor="lead-phone">
              <span>연락처 <em>필수</em></span>
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={handleFieldChange}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
              />
              {errors.phone && (
                <small className="consultation-field-error" id="lead-phone-error">
                  {errors.phone}
                </small>
              )}
            </label>

            <label className="consultation-field consultation-field--wide" htmlFor="lead-region">
              <span>희망 지역 <em>필수</em></span>
              <input
                id="lead-region"
                name="region"
                type="text"
                autoComplete="address-level2"
                placeholder="예: 천안, 성수동, 부산 해운대"
                value={formData.region}
                onChange={handleFieldChange}
                aria-invalid={Boolean(errors.region)}
                aria-describedby={errors.region ? 'lead-region-error' : undefined}
              />
              {errors.region && (
                <small className="consultation-field-error" id="lead-region-error">
                  {errors.region}
                </small>
              )}
            </label>

            <label className="consultation-field" htmlFor="lead-timeline">
              <span>창업 시기</span>
              <select
                id="lead-timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleFieldChange}
              >
                <option value="">선택</option>
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="consultation-field" htmlFor="lead-current-business">
              <span>운영 형태</span>
              <select
                id="lead-current-business"
                name="currentBusiness"
                value={formData.currentBusiness}
                onChange={handleFieldChange}
              >
                <option value="">선택</option>
                {operationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="consultation-field consultation-field--wide" htmlFor="lead-contact-time">
              <span>통화 가능 시간</span>
              <input
                id="lead-contact-time"
                name="preferredContactTime"
                type="text"
                placeholder="예: 평일 오후 2시 이후"
                value={formData.preferredContactTime}
                onChange={handleFieldChange}
              />
            </label>

            <label className="consultation-field consultation-field--wide" htmlFor="lead-message">
              <span>남기실 말</span>
              <textarea
                id="lead-message"
                name="message"
                rows="3"
                maxLength="300"
                placeholder="궁금한 지역 조건이나 기존 매장 전환 여부를 남겨주세요."
                value={formData.message}
                onChange={handleFieldChange}
              />
            </label>
          </div>

          <div className={`consultation-consent ${errors.privacyConsent ? 'is-invalid' : ''}`}>
            <label className="consultation-consent-check" htmlFor="lead-privacy-consent">
              <input
                id="lead-privacy-consent"
                name="privacyConsent"
                type="checkbox"
                checked={formData.privacyConsent}
                onChange={handleFieldChange}
                aria-invalid={Boolean(errors.privacyConsent)}
              />
              <span>개인정보 수집 및 이용에 동의합니다.</span>
            </label>
            <button className="consultation-privacy-link" type="button" onClick={handlePrivacyOpen}>
              개인정보 처리방침 보기
            </button>
          </div>
          {errors.privacyConsent && <small className="consultation-field-error">{errors.privacyConsent}</small>}

          <button className="consultation-submit" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? '문의 접수 중' : '상담 문의 남기기'}
          </button>

          {statusMessage && (
            <p className={`consultation-status consultation-status--${status}`} role="status">
              {statusMessage}
            </p>
          )}
        </form>
      </div>

      {isPrivacyOpen && (
        <div
          className="privacy-policy-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handlePrivacyClose();
            }
          }}
        >
          <section
            className="privacy-policy-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-policy-title"
          >
            <div className="privacy-policy-head">
              <span>개인정보 수집 및 이용 동의</span>
              <h3 id="privacy-policy-title">개인정보 처리방침</h3>
              <p>
                닭장수후라이드 창업 상담 신청을 위해 필요한 최소한의 개인정보를 수집하며,
                상담 목적 범위 안에서만 이용합니다.
              </p>
            </div>

            <div className="privacy-policy-body">
              {privacyPolicySections.map((section) => (
                <article className="privacy-policy-section" key={section.title}>
                  <h4>{section.title}</h4>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}

              <p className="privacy-policy-source">
                기존 닭장수후라이드 홈페이지의 창업문의 개인정보 수집 및 이용 동의 구조를 기준으로,
                본 랜딩 페이지 상담 폼 항목에 맞춰 정리했습니다.
              </p>
            </div>

            <button className="privacy-policy-close" type="button" onClick={handlePrivacyClose}>
              확인
            </button>
          </section>
        </div>
      )}
    </section>
  );
};

export default LeadCapture;
