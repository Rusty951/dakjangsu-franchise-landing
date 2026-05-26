import './LocalFitQnA.css';
import { trackEvent } from '../utils/tracking';

const localSignals = [
  {
    label: '퇴근길',
    title: '포장 손님을 만들 동선이 있는가'
  },
  {
    label: '주말',
    title: '가족 식탁에 다시 오를 장면이 있는가'
  },
  {
    label: '운영',
    title: '초보/소형 창업자가 설명 가능한 구조인가'
  }
];

const LocalFitQnA = ({ onLocalConsultClick }) => {
  const handleLocalConsultClick = () => {
    trackEvent('cta_kakao_click', { section: 'local_fit' });
    if (onLocalConsultClick) {
      onLocalConsultClick();
    }
  };

  return (
    <section className="local-fit-qna-section" id="local-fit-qna">
      <div className="container">
        <div className="brand-section-heading local-fit-heading">
          <span>04 / 내 동네 가능성</span>
          <h2>우리 동네에<br />닭장수가 맞을까요?</h2>
        </div>

        <div className="local-scene-layout">
          <figure className="local-fit-visual">
            <img
              src="/images/dakjangsu-frying-clean-local-fit.png"
              alt="기름에서 바삭하게 튀겨지는 닭장수후라이드 클로즈업"
            />
            <figcaption>
              <span>좋은 말보다 조건</span>
              <strong>후라이드가 다시 사 먹히는 장면이 있는지 봅니다.</strong>
            </figcaption>
          </figure>

          <div className="local-scene-panel">
            <strong>상담에서는 세 가지를 먼저 봅니다.</strong>
            <div className="local-signal-list">
              {localSignals.map((item) => (
                <article key={item.title} className="local-signal-item">
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                </article>
              ))}
            </div>

          </div>
        </div>

        <div className="local-fit-decision">
          <button className="primary-cta local-kakao-cta" onClick={handleLocalConsultClick}>
            카카오톡으로 내 지역 확인하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default LocalFitQnA;
