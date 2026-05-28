import './LeadCapture.css';
import { trackEvent } from '../utils/tracking';

const consultationChecks = [
  { title: '상권', description: '충분한 수요가 있는 지역인지' },
  { title: '포장', description: '지나가는 사람들이 사가기 쉬운 위치인지' },
  { title: '홀', description: '맥주 한 잔 하고 갈 손님이 있는지' },
  { title: '배후수요', description: '배달 주문까지 가능한 지역인지' }
];

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

      <div className="consultation-note-wrap" aria-label="상담에서 함께 확인하는 창업 체크노트">
        <div className="consultation-note-card">
          <span className="consultation-note-clip" aria-hidden="true" />
          <div className="consultation-note-head">
            <span>창업 체크노트</span>
            <strong>
              <span>우리동네에서</span>
              <span>먼저 볼 4가지</span>
            </strong>
          </div>
          <ul className="consultation-note-list">
            {consultationChecks.map((item) => (
              <li key={item.title}>
                <span aria-hidden="true">✓</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="consultation-note-stamp">상담에서 함께 확인합니다.</p>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
