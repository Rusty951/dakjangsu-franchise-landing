import './FounderFit.css';

const fitPrinciples = [
  {
    id: 'fried',
    title: '후라이드 품질을 꾸준히 지키며 팔고 싶은 분',
  },
  {
    id: 'small',
    title: '작은 매장으로 시작하고 싶은 분',
  },
  {
    id: 'owner',
    title: '1인 또는 부부 운영을 생각하는 분',
  },
  {
    id: 'first',
    title: '처음이라도 준비 순서가 필요한 분',
  },
  {
    id: 'convert',
    title: '기존 매장을 치킨집으로 바꾸고 싶은 분',
  },
  {
    id: 'regular',
    title: '포장과 동네 단골 장사를 함께 보고 싶은 분',
  }
];

const FounderFit = () => {
  return (
    <section className="founder-fit-section" id="founder-fit">
      <div className="container">
        <div className="brand-section-heading">
          <span>05 / 맞는 창업자</span>
          <h2>이런 분께<br />맞습니다.</h2>
        </div>

        <div className="founder-fit-content">
          <ul className="founder-checklist">
            {fitPrinciples.map((item) => (
              <li key={item.id}>
                <span aria-hidden="true"></span>
                <p>{item.title}</p>
              </li>
            ))}
          </ul>

          <p className="founder-fit-caution">
            배달 주문만 기다리기보다, 닭장수후라이드의 재구매 이유를 동네에서 쌓고 싶은 분께 더 맞습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderFit;
