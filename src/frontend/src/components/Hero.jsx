import './Hero.css';
import { trackEvent } from '../utils/tracking';

const Hero = ({ onKakaoClick }) => {
  const handleKakaoClick = () => {
    trackEvent('cta_kakao_click', { section: 'hero' });
    if (onKakaoClick) onKakaoClick();
  };

  return (
    <section className="hero-section" id="top">
      <div className="hero-visual-slot">
        <img
          className="hero-visual-image"
          src="/images/dakjangsu-queue-hero.png"
          alt="저녁 시간 포장 매장 앞에서 손님들이 줄서서 기다리는 장면"
        />
        <div className="hero-message">
          <p className="hero-question">01 / 닭장수후라이드 가맹</p>
          <strong>배달앱만으로는<br />손님이 쌓이지<br />않습니다.</strong>
          <small>
            포장 손님과 동네 단골을 함께 쌓는 창업을 봅니다.
          </small>
          <button className="primary-cta hero-cta" onClick={handleKakaoClick}>
            카카오톡으로 내 지역 확인하기
          </button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
