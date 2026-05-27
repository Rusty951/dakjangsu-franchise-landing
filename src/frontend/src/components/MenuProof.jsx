import './MenuProof.css';

const tastePoints = [
  '바삭함',
  '고소함',
  '포장해도 생각나는 맛'
];

const MenuProof = () => {
  return (
    <section className="menu-proof-section" id="fried" aria-labelledby="menu-proof-title">
      <figure className="menu-proof-photo">
        <img
          src="/images/dakjangsu-product-showcase-real.jpg"
          alt="쇼케이스 안에 놓인 닭장수후라이드 치킨"
        />
      </figure>

      <div className="menu-proof-copy">
        <h2 id="menu-proof-title">
          <span>왜</span>
          <span><em>다시</em> 찾을까</span>
        </h2>
        <p>
          첫입은 바삭하게.<br />
          손님이 다시 떠올릴 이유가 치킨 안에 있어야 합니다.
        </p>
        <div className="menu-proof-points" aria-label="손님이 다시 찾는 이유">
          {tastePoints.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuProof;
