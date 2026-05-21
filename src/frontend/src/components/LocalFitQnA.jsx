import './LocalFitQnA.css';
import { trackEvent } from '../utils/tracking';

const localSignals = [
  {
    label: '퇴근길',
    title: '포장 동선이 있는가'
  },
  {
    label: '주말',
    title: '반복 구매 장면이 있는가'
  },
  {
    label: '운영',
    title: '감당 가능한 구조인가'
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
          <h2>우리 동네에도<br />될까요?</h2>
        </div>

        <div className="local-scene-layout">
          <figure className="local-fit-visual">
            <img
              src="/images/dakjangsu-frying-clean-local-fit.png"
              alt="기름에서 바삭하게 튀겨지는 닭장수후라이드 클로즈업"
            />
            <figcaption>
              <span>좋은 말보다 조건</span>
              <strong>포장 동선, 재구매 장면, 운영 가능성을 봅니다.</strong>
            </figcaption>
          </figure>

          <div className="local-scene-panel">
            <strong>볼 것은 세 가지입니다.</strong>
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
