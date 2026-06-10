import { useEffect, useRef, useState } from 'react';
import './MenuShowcase.css';
import { assetPath } from '../assetPath';

const menuBoardImage = assetPath('/images/dakjangsu-popular-menu-board.webp');

const menuPoints = ['인기메뉴 9종', '스페셜 곱도리탕', '대표 치킨', '직화 구이'];

const legacyMenuBoards = [1, 2, 3, 4, 5, 7].map((index) => ({
  image: assetPath(`/images/dakjangsu-menu-${index}.png`),
  name: `닭장수후라이드 이전 메뉴판 ${index}`
}));

const mobileMenuItems = [
  {
    name: '후라이드치킨',
    description: '대표 후라이드',
    image: assetPath('/images/menu-showcase/fried-chicken.webp')
  },
  {
    name: '반반치킨',
    description: '두 가지 맛을 한 접시에',
    image: assetPath('/images/menu-showcase/half-half-chicken.webp')
  },
  {
    name: '매콤치킨',
    description: '입맛을 당기는 매콤함',
    image: assetPath('/images/menu-showcase/spicy-chicken.webp')
  },
  {
    name: '마늘고추치킨',
    description: '알싸한 마늘고추 풍미',
    image: assetPath('/images/menu-showcase/garlic-pepper-chicken.webp')
  },
  {
    name: '후라이드 닭발',
    description: '바삭하게 즐기는 별미',
    image: assetPath('/images/menu-showcase/fried-chicken-feet.webp')
  },
  {
    name: '후라이드 똥집',
    description: '고소하고 바삭한 사이드',
    image: assetPath('/images/menu-showcase/fried-gizzard.webp')
  },
  {
    name: '직화양념구이',
    description: '불향과 양념의 조합',
    image: assetPath('/images/menu-showcase/grilled-spicy.webp')
  },
  {
    name: '직화간장구이',
    description: '짭조름한 직화 간장',
    image: assetPath('/images/menu-showcase/grilled-soy.webp')
  },
  {
    name: '곱도리탕',
    description: '진한 국물 스페셜',
    image: assetPath('/images/menu-showcase/gopdoritang.webp'),
    isSpecial: true
  }
];

const MenuShowcase = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.28 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`menu-showcase-section menu-showcase-section--motion-ready${isVisible ? ' is-visible' : ''}`}
      id="menu-showcase"
      aria-labelledby="menu-showcase-title"
    >
      <div className="menu-showcase-copy">
        <span>닭장수 메뉴소개</span>
        <h2 id="menu-showcase-title">
          <span>다시 찾는 이유</span>
          <span className="menu-showcase-title-line">
            <em>메뉴판에</em>
            <strong>쌓여 있다</strong>
          </span>
        </h2>
        <p>
          <span>치킨메뉴에서 인기메뉴로 바로 읽히는 구성.</span>
          <span>동네 손님이 다시 고를 이유가 있어야 매장 주문도 살아납니다.</span>
        </p>
        <div className="menu-showcase-points" aria-label="메뉴 구성 핵심">
          {menuPoints.map((point) => (
            <strong key={point}>{point}</strong>
          ))}
        </div>
      </div>

      <div className="menu-showcase-display" aria-label="닭장수후라이드 메뉴판 이미지">
        <div className="menu-showcase-glow" aria-hidden="true" />
        <div className="menu-showcase-board-stack" aria-hidden="true">
          {legacyMenuBoards.map((item) => (
            <img src={item.image} alt="" key={item.name} />
          ))}
        </div>
        <figure className="menu-showcase-main">
          <img src={menuBoardImage} alt="후라이드치킨, 반반치킨, 매콤치킨, 마늘고추치킨, 후라이드 닭발, 후라이드 똥집, 직화양념구이, 직화간장구이, 곱도리탕으로 구성한 닭장수후라이드 인기메뉴판" />
          <strong className="menu-showcase-stamp">한 번 팔고 끝낼 메뉴가 아닙니다</strong>
        </figure>

        <div className="menu-showcase-mobile-list" aria-label="닭장수후라이드 모바일 인기메뉴 목록">
          <div className="menu-showcase-mobile-list-header">
            <strong>
              <span>한 번 먹고 끝나지 않는</span>
              <span>9가지 메뉴</span>
            </strong>
          </div>
          {mobileMenuItems.map((item) => (
            <article
              className={`menu-showcase-mobile-card${item.isSpecial ? ' menu-showcase-mobile-card--special' : ''}`}
              key={item.name}
            >
              <img src={item.image} alt={`${item.name} 메뉴 사진`} />
              <div>
                {item.isSpecial ? <span>스페셜</span> : null}
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
          <strong className="menu-showcase-mobile-stamp">한 번 팔고 끝낼 메뉴가 아닙니다</strong>
        </div>
      </div>
    </section>
  );
};

export default MenuShowcase;
