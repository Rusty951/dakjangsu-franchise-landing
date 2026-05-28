import './FounderFit.css';

const supportSteps = [
  {
    number: '01',
    phase: '오픈 전',
    headline: '시작 부담 낮추는 5무',
    highlight: '5무',
    figures: [
      { value: '0원', label: '가맹비' },
      { value: '0원', label: '교육비' },
      { value: '0원', label: '로열티' },
      { value: '0원', label: '인테리어 감리비' },
      { value: '0원', label: '물류 예치비' }
    ],
    description: '초기 비용 부담을 낮춰 매장 준비와 오픈 전 세팅에 더 집중할 수 있게 돕습니다.'
  },
  {
    number: '02',
    phase: '오픈 첫날',
    headline: '첫날부터 안정적인 손님 유치',
    highlight: '손님 유치',
    figures: [
      { value: '200만원', label: '마케팅비 지원' },
      { value: '200마리', label: '오픈 행사 닭 지원' },
      { value: '본사', label: '현장 인력 지원' }
    ],
    description: '오픈 행사, 현장 지원, 초기 홍보 흐름을 함께 맞춰 첫날 운영을 도와드립니다.'
  },
  {
    number: '03',
    phase: '오픈 후',
    headline: '오픈 후에도 끝나지 않는 관리',
    highlight: '끝나지 않는',
    figures: [
      { value: '본사 매니저', label: '전담 배치' },
      { value: '밀착 운영', label: '점검' },
      { value: '매장', label: '안정화' }
    ],
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
                <div className="founder-support-numbers" aria-label={`${step.phase} 주요 지원 숫자`}>
                  {step.figures.map((figure) => (
                    <span className="founder-support-number" key={`${step.phase}-${figure.label}`}>
                      <b>{figure.value}</b>
                      <small>{figure.label}</small>
                    </span>
                  ))}
                </div>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="founder-support-note">지원 조건과 세부 범위는 상담 시 확인합니다.</p>
      </div>
    </section>
  );
};

export default FounderFit;
