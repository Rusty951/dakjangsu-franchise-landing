import './ProblemAnswer.css';

const problemItems = [
  '수수료 부담',
  '광고비 경쟁',
  '쿠폰 비용'
];

const ProblemAnswer = () => {
  return (
    <section className="story-section" id="answer">
      <div className="problem-board">
        <h2>
          배달앱만으로는<br />
          단골이 쌓이기<br />
          어렵습니다
        </h2>
        <div className="problem-chip-list" aria-label="배달앱 현실 요소">
          {problemItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemAnswer;
