import './ProblemAnswer.css';

const problemItems = [
  '앱 주문만 기다리는 시간',
  '광고가 멈추면 끊기는 손님',
  '다시 올 장면이 없는 메뉴',
];

const ProblemAnswer = () => {
  return (
    <section className="story-section" id="answer">
      <div className="container">
        <div className="problem-shell">
          <div className="brand-section-heading problem-heading">
            <span>02 / 닭장수의 답</span>
            <h2>첫 주문보다<br />다시 오는 손님.</h2>
          </div>

          <div className="problem-body">
            <p className="problem-lead">
              광고와 할인보다, 반복될 장면이 먼저 필요합니다.
            </p>

            <ul className="problem-list" aria-label="창업자가 피해야 할 장사 구조">
              {problemItems.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </li>
              ))}
            </ul>

            <div className="problem-answer">
              <span>닭장수의 답</span>
              <p>포장, 재방문, 단골로 이어지는 장면을 봅니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemAnswer;
