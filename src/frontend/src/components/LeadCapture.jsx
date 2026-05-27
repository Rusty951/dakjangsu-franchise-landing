import './LeadCapture.css';
import { trackEvent } from '../utils/tracking';

const consultationChecks = [
  { label: '상권', title: '자리', description: '동선부터', level: '54%' },
  { label: '포장', title: '수요', description: '걸어오는 손님', level: '72%' },
  { label: '운영', title: '구조', description: '굴러가는 매장', level: '62%' },
  { label: '지원', title: '관리', description: '끝까지 본사', level: '86%' }
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
          <span>내 지역에서도</span>
          <span>잘 맞을지</span>
          <span>먼저 확인</span>
        </h2>
        <p>
          상권, 포장 수요, 운영 구조, 본사 지원까지. 숫자보다 먼저 볼 건 내 동네와 맞는 조건.
        </p>
        <button className="consultation-kakao" onClick={handleKakaoClick}>
          카카오톡으로 내 지역 확인하기
        </button>
      </div>

      <div className="consultation-graph" aria-label="상담에서 확인하는 네 가지 조건">
        <div className="consultation-chart-card">
          <div className="consultation-graph-head">
            <span>내 동네 가능성</span>
            <strong>상담 체크 그래프</strong>
          </div>
          <div className="consultation-bars" aria-hidden="true">
            {consultationChecks.map((item, index) => (
              <div className="consultation-bar-item" style={{ '--bar-height': item.level }} key={item.label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div className="consultation-bar">
                  <i />
                </div>
                <strong>{item.label}</strong>
              </div>
            ))}
          </div>
          <div className="consultation-chart-note">
            <b>숫자보다 먼저 볼 것</b>
            <span>내 지역에 맞는 자리, 수요, 운영, 지원</span>
          </div>
        </div>

        <div className="consultation-tickers" aria-hidden="true">
          {consultationChecks.map((item) => (
            <span key={item.title}>
              <b>{item.title}</b>
              <em>{item.description}</em>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
