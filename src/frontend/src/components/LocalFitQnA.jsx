import './LocalFitQnA.css';

const ownerReasons = [
  {
    label: '맛',
    title: '이유가 있는 맛',
    description: '얇은 튀김옷과 고소한 끝맛처럼 다시 떠올릴 이유가 있어야 합니다.'
  },
  {
    label: '포장',
    title: '포장해도 생각나는 맛',
    description: '퇴근길, 집 앞, 가족 식사처럼 포장으로 찾는 장면을 봅니다.'
  },
  {
    label: '재방문',
    title: '한 번 먹고 끝나지 않도록',
    description: '배달앱 노출보다 포장 손님과 동네 단골이 쌓이는 매장을 목표로 합니다.'
  }
];

const LocalFitQnA = () => {
  return (
    <section className="local-fit-qna-section" id="local-fit-qna" aria-labelledby="owner-reason-title">
      <div className="local-fit-copy">
        <h2 id="owner-reason-title">
          <span>손님이 먼저</span>
          <span>찾는 치킨이어야</span>
          <span>합니다</span>
        </h2>
      </div>

      <div className="local-fit-info" aria-label="점주가 팔기 쉬운 이유">
        {ownerReasons.map((item) => (
          <article key={item.title}>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LocalFitQnA;
