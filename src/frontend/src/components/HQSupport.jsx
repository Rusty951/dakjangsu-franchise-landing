import './HQSupport.css';

const supportCards = [
  {
    label: '상담',
    title: '먼저 정리할 것',
    description: '희망 지역, 매장 조건, 운영 방식을 놓고 시작 가능성을 함께 봅니다.'
  },
  {
    label: '오픈 전',
    title: '준비 흐름 점검',
    description: '메뉴 준비, 포장 흐름, 매장 동선을 오픈 전에 차례로 확인합니다.'
  },
  {
    label: '오픈 후',
    title: '초기 운영 확인',
    description: '주문, 포장, 응대에서 막히는 지점을 초반 운영 흐름에 맞춰 봅니다.'
  }
];

const HQSupport = () => {
  return (
    <section className="hq-support-section" id="hq-support">
      <div className="container">
        <div className="brand-section-heading">
          <span>06 / 본사 지원</span>
          <h2>처음이어도<br />순서가 보이게.</h2>
          <p>무엇부터 봐야 할지 모를 때, 필요한 순서만 먼저 정리합니다.</p>
        </div>

        <div className="support-list">
          {supportCards.map((card) => (
            <article key={card.title}>
              <span>{card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>

        <p className="support-transition">
          <span>다음 단계</span>
          이제 상담에서는 하나를 봅니다. 내 지역에서 반복 손님을 만들 수 있는지.
        </p>

      </div>
    </section>
  );
};

export default HQSupport;
