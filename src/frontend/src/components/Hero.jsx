import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="top">
      <div className="hero-visual-slot">
        <div className="hero-content">
          <h1 className="hero-title" aria-label="치킨집 창업, 배달만 보고 시작해도 될까요?">
            <span className="hero-title-line">
              치킨집 창업,
            </span>
            <span className="hero-title-line hero-title-line--focus">
              <em className="hero-title-accent hero-title-accent--dark">배달만</em> 보고
            </span>
            <span className="hero-title-line hero-title-line--focus">시작해도 될까요?</span>
          </h1>
          <p className="hero-subcopy">
            닭장수후라이드는 배달뿐 아니라 포장, 홀 손님, 재방문까지 고려해
            우리 동네에 맞는 후라이드 치킨 창업을 제안합니다.
          </p>
          <p className="hero-caution">
            창업 조건은 지역, 매장 상태, 규모, 운영 방식에 따라 달라질 수 있습니다.
          </p>
        </div>

        <div className="hero-menu-strip" aria-hidden="true">
          <div className="hero-menu-item hero-menu-item--left">
            <img src="/images/dakjangsu-real-chicken-plate.png" alt="" />
          </div>
          <div className="hero-menu-item hero-menu-item--center">
            <img src="/images/dakjangsu-original-chicken-wide.png" alt="" />
          </div>
          <div className="hero-menu-item hero-menu-item--right">
            <img src="/images/dakjangsu-chicken-original-fullbleed.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
