import './MenuProof.css';

const orderSignals = [
  {
    number: '01',
    label: '포장',
    description: '가져가는 주문'
  },
  {
    number: '02',
    label: '홀',
    description: '먹고 가는 주문'
  },
  {
    number: '03',
    label: '재방문',
    description: '다시 오는 손님'
  }
];

const MenuProof = () => {
  return (
    <section className="menu-proof-section" id="fried" aria-labelledby="menu-proof-title">
      <div className="menu-proof-copy">
        <h2 id="menu-proof-title">
          <span>가져가는 주문,</span>
          <span>먹고 가는 주문,</span>
          <span>다시 오는 <em>주문</em></span>
        </h2>
        <p>
          치킨집은<br />
          매장 주문이 살아야 합니다.
        </p>
      </div>

      <div className="menu-proof-stage" aria-label="매장 주문 흐름">
        <div className="menu-proof-ticket-stack">
          <span className="menu-proof-stack-label">매장 주문 흐름</span>
          {orderSignals.map((signal) => (
            <article className="menu-proof-ticket" key={signal.label}>
              <span className="menu-proof-ticket-number">{signal.number}</span>
              <strong>{signal.label}</strong>
              <p>{signal.description}</p>
              <div className="menu-proof-ticket-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuProof;
