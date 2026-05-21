import './FloatingActions.css';
import { trackEvent } from '../utils/tracking';

const FloatingActions = ({ onKakaoClick }) => {
  const handleTopClick = () => {
    trackEvent('floating_top_click', { section: 'floating_menu' });
  };

  const handlePhoneClick = () => {
    trackEvent('cta_phone_click', { section: 'floating_menu' });
  };

  const handleKakaoClick = () => {
    trackEvent('cta_kakao_click', { section: 'floating_menu' });
    if (onKakaoClick) {
      onKakaoClick();
    }
  };

  const handleGuideClick = () => {
    trackEvent('floating_guide_click', { section: 'floating_menu' });
  };

  return (
    <>
      <aside className="floating-actions" aria-label="빠른 상담 메뉴">
        <a className="floating-action" href="#top" onClick={handleTopClick}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6.8 13.2 5.2-5.4 5.2 5.4" />
            <path d="m6.8 18.2 5.2-5.4 5.2 5.4" />
          </svg>
          <span>TOP</span>
        </a>

        <a className="floating-action" href="tel:1588-2287" onClick={handlePhoneClick}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.2 4.7 6.1 6.8c-.5.5-.7 1.2-.4 1.9 1.8 4.7 5 7.9 9.6 9.6.7.3 1.4.1 1.9-.4l2.1-2.1c.5-.5.5-1.4-.1-1.8l-2.4-1.7c-.5-.3-1.1-.3-1.6 0l-1.1.7c-1.4-.8-2.5-1.9-3.2-3.2l.7-1.1c.3-.5.3-1.1 0-1.6L9.9 4.8c-.4-.6-1.2-.7-1.7-.1Z" />
            <path d="M15.8 4.8c1.7.5 2.9 1.7 3.4 3.4" />
          </svg>
          <span>대표전화</span>
          <small>1588-2287</small>
        </a>

        <button className="floating-action" type="button" onClick={handleKakaoClick}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5.2c-4.4 0-8 2.7-8 6.1 0 2.2 1.5 4.1 3.7 5.2l-.7 2.4 3-1.5c.6.1 1.3.2 2 .2 4.4 0 8-2.7 8-6.2s-3.6-6.2-8-6.2Z" />
          </svg>
          <span>카카오 상담</span>
        </button>

        <a className="floating-action" href="#lead-capture" onClick={handleGuideClick}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.2 4.8h9.6v14.4H7.2z" />
            <path d="M9.5 8h5" />
            <path d="M9.5 11.2h5" />
            <path d="M9.5 14.4h3.1" />
          </svg>
          <span>가맹 안내</span>
        </a>
      </aside>

      <button className="mobile-kakao-bar" type="button" onClick={handleKakaoClick}>
        카카오톡으로 내 지역 확인하기
      </button>
    </>
  );
};

export default FloatingActions;
