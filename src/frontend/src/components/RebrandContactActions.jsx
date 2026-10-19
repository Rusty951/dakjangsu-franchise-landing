import { franchiseKakaoUrl, franchisePhoneHref, franchisePhoneNumber } from '../utils/rebrandContact';
import { trackEvent } from '../utils/tracking';

export const RebrandPhoneLink = ({ className = '', label = '창업 문의', section, callout = false }) => (
  <a className={`rebrand-phone-link ${className}`} href={franchisePhoneHref}
    aria-label={`${label} ${franchisePhoneNumber}, 전화 연결`}
    onClick={() => trackEvent('click_phone', { section })}>
    <span>{callout ? '창업 문의' : label}</span>
    <strong>{franchisePhoneNumber}</strong>
  </a>
);

const RebrandContactActions = () => {
  return (
    <a className="rebrand-kakao-float" href={franchiseKakaoUrl} target="_blank" rel="noopener noreferrer"
      aria-label="카카오톡으로 창업 상담하기, 새 창"
      onClick={() => trackEvent('click_kakao', { section: 'rebrand_floating_contact' })}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5.2c-4.4 0-8 2.7-8 6.1 0 2.2 1.5 4.1 3.7 5.2l-.7 2.4 3-1.5c.6.1 1.3.2 2 .2 4.4 0 8-2.7 8-6.2s-3.6-6.2-8-6.2Z" />
      </svg>
      <span>카카오톡</span>
    </a>
  );
};

export default RebrandContactActions;
