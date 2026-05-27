import './LeadCapture.css';
import { trackEvent } from '../utils/tracking';

const LeadCapture = ({ onKakaoClick }) => {
  const handleKakaoClick = () => {
    trackEvent('cta_kakao_click', { section: 'lead_capture_footer' });
    if (onKakaoClick) {
      onKakaoClick();
    }
  };

  return (
    <section className="lead-capture-section" id="lead-capture" aria-labelledby="lead-capture-title">
      <div className="consultation-intro">
        <h2 id="lead-capture-title">
          <span>내 지역에서도</span>
          <span>잘 맞을지</span>
          <span>먼저 확인하세요</span>
        </h2>
        <p>
          상담을 남겨주시면 창업 가능성을 함께 확인해드립니다.
        </p>
        <button className="consultation-kakao" onClick={handleKakaoClick}>
          카카오톡으로 상담하기
        </button>
      </div>

    </section>
  );
};

export default LeadCapture;
