import './Hero.css';

const Hero = ({ onKakaoClick }) => {
  return (
    <section className="hero-section" id="top">
      <div className="hero-visual-slot">
        <div className="hero-content">
          <span className="hero-franchise-label">포장과 홀 손님까지 생각한 닭장수후라이드 창업</span>
          <h1 className="hero-title" aria-label="다시 찾는 우리동네 후라이드 치킨">
            <span>다시 찾는</span>
            <span>우리동네</span>
            <span>후라이드 치킨</span>
          </h1>

          <div className="hero-actions" aria-label="창업 상담 이동">
            <button className="primary-cta hero-cta" type="button" onClick={onKakaoClick}>
              카카오톡으로 상담하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
