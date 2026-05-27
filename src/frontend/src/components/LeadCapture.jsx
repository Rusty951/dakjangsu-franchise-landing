import './LeadCapture.css';
import { trackEvent } from '../utils/tracking';

const consultationChecks = [
  { title: '자리', description: '사람들이 지나가는 길목인지' },
  { title: '포장 손님', description: '들고 갈 손님이 있는 동네인지' },
  { title: '먹고 갈 자리', description: '한잔하고 갈 손님이 있는지' },
  { title: '오픈 후 관리', description: '열고 나서도 같이 봐주는지' }
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
          <span>내 동네에서</span>
          <span>닭장수 창업</span>
          <span><em>가능할까요?</em></span>
        </h2>
        <p>
          <span>자리, 포장 손님, 먹고 갈 자리, 오픈 후 관리까지</span>
          <span>상담에서 우리 동네 조건을 함께 봅니다.</span>
        </p>
        <button className="consultation-kakao" onClick={handleKakaoClick}>
          카카오톡으로 내 동네 가능성 확인하기
        </button>
        <small className="consultation-caution">
          창업 조건은 지역, 매장 상태, 규모, 운영 방식에 따라 달라질 수 있습니다.
        </small>
      </div>

      <div className="consultation-note-wrap" aria-label="상담에서 함께 확인하는 창업 체크노트">
        <div className="consultation-note-card">
          <span className="consultation-note-clip" aria-hidden="true" />
          <div className="consultation-note-head">
            <span>창업 체크노트</span>
            <strong>
              <span>우리 동네에서</span>
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
