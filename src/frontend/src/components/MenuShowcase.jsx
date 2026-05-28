import './MenuShowcase.css';

const menuItems = [
  { image: '/images/dakjangsu-menu-1.png', name: '닭장수후라이드 대표 메뉴 1' },
  { image: '/images/dakjangsu-menu-2.png', name: '닭장수후라이드 대표 메뉴 2' },
  { image: '/images/dakjangsu-menu-3.png', name: '닭장수후라이드 대표 메뉴 3' },
  { image: '/images/dakjangsu-menu-4.png', name: '닭장수후라이드 대표 메뉴 4' },
  { image: '/images/dakjangsu-menu-5.png', name: '닭장수후라이드 대표 메뉴 5' },
  { image: '/images/dakjangsu-menu-6.png', name: '닭장수후라이드 대표 메뉴 6' },
  { image: '/images/dakjangsu-menu-7.png', name: '닭장수후라이드 대표 메뉴 7' }
];

const menuPoints = ['대표 후라이드', '양념 치킨', '곁들이는 사이드', '스페셜 메뉴'];

const MenuShowcase = () => {
  return (
    <section className="menu-showcase-section" id="menu-showcase" aria-labelledby="menu-showcase-title">
      <div className="menu-showcase-copy">
        <span>닭장수 메뉴소개</span>
        <h2 id="menu-showcase-title">
          <span>다시 찾는 이유</span>
          <span>메뉴판에 쌓여 있다</span>
        </h2>
        <p>
          <span>후라이드부터 양념, 사이드, 스페셜 메뉴까지.</span>
          <span>동네 손님이 다시 고를 이유가 있어야 매장 주문도 살아납니다.</span>
        </p>
        <div className="menu-showcase-points" aria-label="메뉴 구성 핵심">
          {menuPoints.map((point) => (
            <strong key={point}>{point}</strong>
          ))}
        </div>
      </div>

      <div className="menu-showcase-display" aria-label="닭장수후라이드 메뉴판 이미지">
        <figure className="menu-showcase-main">
          <img src={menuItems[0].image} alt={menuItems[0].name} />
          <figcaption>대표 메뉴판</figcaption>
        </figure>

        <div className="menu-showcase-stack" aria-hidden="true">
          {menuItems.slice(1, 5).map((item) => (
            <img src={item.image} alt="" key={item.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuShowcase;
