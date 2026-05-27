import './MenuProof.css';

const MenuProof = () => {
  return (
    <section className="menu-proof-section" id="fried" aria-labelledby="menu-proof-title">
      <div className="menu-proof-inner">
        <div className="menu-proof-copy">
          <h2 id="menu-proof-title">
            <span>배달만</span>
            <span>기다리지 않는 <em>치킨집</em></span>
          </h2>

          <p className="menu-proof-lead">
            포장으로 가져가고,<br />
            매장에서는 한잔하고 갑니다.
          </p>

          <p className="menu-proof-support">
            닭장수는 동네 손님이 직접 찾는<br />
            매장 주문을 만듭니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuProof;
