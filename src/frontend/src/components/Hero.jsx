import './Hero.css';
import { assetPath } from '../assetPath';

const Hero = () => {
  return (
    <section className="hero-section" id="top">
      <div className="hero-visual-slot">
        <div className="hero-dot-motion" aria-hidden="true" />
        <div className="hero-spark-layer" aria-hidden="true">
          <span className="hero-spark hero-spark--one" />
          <span className="hero-spark hero-spark--two" />
          <span className="hero-spark hero-spark--three" />
          <span className="hero-spark hero-spark--four" />
          <span className="hero-spark hero-spark--five" />
          <span className="hero-spark hero-spark--six" />
          <span className="hero-spark hero-spark--seven" />
          <span className="hero-spark hero-spark--eight" />
          <span className="hero-spark hero-spark--nine" />
          <span className="hero-spark hero-spark--ten" />
          <span className="hero-spark hero-spark--eleven" />
          <span className="hero-spark hero-spark--twelve" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title" aria-label="치킨집 창업, 배달만 보고 시작해도 될까요?">
            <span className="hero-title-line">
              치킨집 창업,
            </span>
            <span className="hero-title-line hero-title-line--focus">
              <em className="hero-title-accent hero-title-accent--dark">
                <span className="hero-title-accent-text">배달만</span>
              </em>
              <span className="hero-title-tail">보고</span>
            </span>
            <span className="hero-title-line hero-title-line--focus">
              <span className="hero-title-mobile-prefix">보고 </span>시작해도 <span className="hero-title-mobile-break">될까요?</span>
            </span>
          </h1>
          <p className="hero-subcopy">
            닭장수후라이드는 배달뿐 아니라 포장, 홀 손님, 재방문까지 고려해
            우리 동네에 맞는 후라이드 치킨 창업을 제안합니다.
          </p>
          <div className="hero-menu-strip" aria-hidden="true">
            <figure className="hero-menu-photo hero-menu-photo--left">
              <img src={assetPath('/images/dakjangsu-hero-left-wings-cutout.png')} alt="" />
            </figure>
            <figure className="hero-menu-photo hero-menu-photo--center">
              <img src={assetPath('/images/dakjangsu-baemin-hero-menu-cutout.png')} alt="" />
            </figure>
            <figure className="hero-menu-photo hero-menu-photo--right">
              <img src={assetPath('/images/dakjangsu-hero-right-skillet-cutout.png')} alt="" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
