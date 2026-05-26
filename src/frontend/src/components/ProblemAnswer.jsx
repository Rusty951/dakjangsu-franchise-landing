import './ProblemAnswer.css';

const problemItems = [
  {
    title: '특제 파우더로 남는 고소함',
    tag: '맛'
  },
  {
    title: '얇고 바삭하게 잡는 튀김옷',
    tag: '식감'
  },
  {
    title: '깨끗하게 관리하는 기름',
    tag: '관리'
  },
  {
    title: '포장 후에도 떠오르는 후라이드',
    tag: '포장'
  }
];

const ProblemAnswer = () => {
  return (
    <section className="story-section" id="answer">
      <div className="container">
        <div className="problem-shell">
          <div className="brand-section-heading problem-heading">
            <span>02 / 닭장수의 답</span>
            <h2>맛의 이유가<br />재구매 이유.</h2>
          </div>

          <div className="problem-body">
            <p className="problem-lead">
              그냥 "맛있다"가 아니라, 다시 포장하고 다시 들를 이유가 보여야 합니다.
            </p>

            <ul className="problem-list" aria-label="창업자가 피해야 할 장사 구조">
              {problemItems.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.title}</strong>
                  <em>{item.tag}</em>
                </li>
              ))}
            </ul>

            <div className="problem-answer">
              <span>닭장수의 답</span>
              <p>닭장수후라이드는 후라이드 자체의 기억을 동네 매장 모델로 번역합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemAnswer;
