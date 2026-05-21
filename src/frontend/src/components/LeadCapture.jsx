import './LeadCapture.css';
import { trackEvent } from '../utils/tracking';

const consultationChecks = [
  {
    label: '지역',
    title: '내 지역 가능성',
    description: '반복 손님이 생길 장면을 봅니다.'
  },
  {
    label: '운영',
    title: '운영 방식 적합성',
    description: '운영 방식이 매장 조건과 맞는지 봅니다.'
  },
  {
    label: '준비',
    title: '오픈 준비 흐름',
    description: '오픈 전 준비 순서를 정리합니다.'
  }
];

const LeadCapture = ({ onKakaoClick }) => {
  const handleKakaoClick = () => {
    trackEvent('cta_kakao_click', { section: 'lead_capture_footer' });
    if (onKakaoClick) {
      onKakaoClick();
    }
  };

  return (
    <section className="lead-capture-section" id="lead-capture">
      <div className="container">
        <div className="consultation-intro">
          <span>06 / 상담</span>
          <h2>내 동네에서 될지<br />먼저 정리해보세요.</h2>
          <p className="promo-desc">
            지역, 운영 방식, 오픈 준비 흐름을 순서대로 봅니다.
          </p>
          <button className="primary-cta consultation-kakao" onClick={handleKakaoClick}>
            카카오톡으로 내 지역 확인하기
          </button>
        </div>

        <div className="consultation-checks" aria-label="상담에서 확인하는 세 가지">
          <div className="consultation-checks-header">
            <span>상담에서 확인하는 것</span>
            <h3>상담 후에는 이 세 가지가 정리됩니다.</h3>
          </div>

          <div className="consultation-check-list">
            {consultationChecks.map((item) => (
              <article key={item.title}>
                <span>{item.label}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
