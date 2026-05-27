import './Hero.css';

const Hero = ({ onKakaoClick }) => {
  return (
    <section className="hero-section" id="top">
      <div className="hero-visual-slot">
        <div className="hero-content">
          <span className="hero-franchise-label">닭장수후라이드 가맹 창업 상담</span>
          <h1 className="hero-title" aria-label="배달앱만 보고 치킨집 차릴 건가요?">
            <span className="hero-title-line">배달앱만 보고</span>
            <span className="hero-title-line hero-title-line--focus">치킨집 차릴 건가요?</span>
          </h1>
          <p className="hero-subcopy">
            닭장수후라이드는 배달뿐 아니라 포장, 홀 손님, 재방문까지 고려해
            우리 동네에 맞는 후라이드 치킨 창업을 제안합니다.
          </p>

          <div className="hero-actions" aria-label="창업 상담 이동">
            <button className="primary-cta hero-cta" type="button" onClick={onKakaoClick}>
              내 지역 창업 상담하기
            </button>
          </div>
          <p className="hero-caution">창업 조건은 지역, 매장 상태, 규모, 운영 방식에 따라 달라질 수 있습니다.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
