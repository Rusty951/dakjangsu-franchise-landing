import './FounderFit.css';

const supportSteps = [
  {
    number: '01',
    phase: '오픈 전',
    headline: '시작 부담 낮추는 4무',
    highlight: '4무',
    description: '가맹비, 교육비, 인테리어비, 물류 예치비 부담을 낮춰 매장 준비에 집중할 수 있게 돕습니다.'
  },
  {
    number: '02',
    phase: '오픈 첫날',
    headline: '첫날부터 소프트랜딩',
    highlight: '첫날',
    description: '오픈 행사, 현장 지원, 초기 홍보 흐름을 함께 맞춰 첫날부터 덜 흔들리게 돕습니다.'
  },
  {
    number: '03',
    phase: '오픈 후',
    headline: '열고 끝내지 않는 관리',
    highlight: '끝내지 않는',
    description: '오픈 이후에도 매장 흐름을 점검하고, 자리 잡을 때까지 함께 봅니다.'
  }
];

const FounderFit = () => {
  return (
    <section className="founder-fit-section" id="founder-fit" aria-labelledby="founder-fit-title">
      <div className="founder-fit-copy">
        <h2 id="founder-fit-title">
          <span>오픈하고 끝?</span>
          <span>닭장수는 <em>끝까지</em></span>
        </h2>
        <p>
          처음 준비하는 순간부터 오픈 첫날, 그리고 매장이 자리 잡는 과정까지
          점주가 혼자 버티지 않도록 단계별로 함께 봅니다.
        </p>
      </div>

      <div className="founder-fit-content">
        <div className="founder-support-timeline" aria-label="닭장수후라이드 본사 지원 흐름">
          {supportSteps.map((step) => (
            <article className="founder-support-step" key={step.phase}>
              <div className="founder-support-meta">
                <span>{step.number}</span>
                <strong>{step.phase}</strong>
              </div>
              <div className="founder-support-body">
                <h3>
                  {step.headline.split(step.highlight)[0]}
                  <em>{step.highlight}</em>
                  {step.headline.split(step.highlight)[1]}
                </h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FounderFit;
