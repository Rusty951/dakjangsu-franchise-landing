import './LeadCapture.css';
import { trackEvent } from '../utils/tracking';

const consultationChecks = [
  {
    label: '재구매',
    title: '닭장수의 반복 구매 이유',
    description: '후라이드가 다시 선택될 이유를 먼저 봅니다.'
  },
  {
    label: '지역',
    title: '내 지역 포장/방문 장면',
    description: '동네 손님이 들르고 포장할 장면을 봅니다.'
  },
  {
    label: '운영',
    title: '초보/소형 창업 적합성',
    description: '매장 조건과 운영 방식이 맞는지 봅니다.'
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
          <h2>내 동네에 닭장수가<br />맞는지 먼저 확인하세요.</h2>
          <p className="promo-desc">
            재구매 이유, 포장 동선, 운영 방식을 순서대로 봅니다.
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
