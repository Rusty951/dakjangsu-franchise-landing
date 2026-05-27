import './FounderFit.css';

const supportSteps = [
  {
    number: '01',
    phase: '오픈 전',
    headline: '시작 부담 낮추는 4무',
    stamp: '4무',
    items: ['가맹비 0원', '교육비 0원', '인테리어비 0원', '물류 예치비 0원']
  },
  {
    number: '02',
    phase: '오픈 행사',
    headline: '첫날부터 소프트랜딩',
    stamp: '첫날 지원',
    items: ['마케팅비 200만원', '오픈 행사 닭 200마리', '바이럴 마케팅 비용 포함', '본사 인력 지원']
  },
  {
    number: '03',
    phase: '오픈 후',
    headline: '열고 끝내지 않는 관리',
    stamp: '끝까지 관리',
    items: ['슈퍼바이저 밀착 관리', '운영 흐름 점검', '매장 안정화 지원']
  }
];

const FounderFit = () => {
  return (
    <section className="founder-fit-section" id="founder-fit" aria-labelledby="founder-fit-title">
      <div className="founder-fit-copy">
        <h2 id="founder-fit-title">
          <span>오픈하고 끝?</span>
          <span>닭장수는 끝까지</span>
        </h2>
      </div>

      <div className="founder-fit-content">
        <div className="founder-support-orbit" aria-label="닭장수후라이드 본사 지원 흐름">
          <div className="founder-support-center" aria-hidden="true">
            <span>오픈부터</span>
            <strong>운영까지</strong>
          </div>

          {supportSteps.map((step) => (
            <article className="founder-support-step" key={step.phase}>
              <div className="founder-support-meta">
                <span>{step.number}</span>
                <strong>{step.phase}</strong>
              </div>
              <div className="founder-support-body">
                <b>{step.stamp}</b>
                <h3>{step.headline}</h3>
                <ul>
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <p className="founder-support-note">지원 조건과 세부 범위는 상담 시 확인</p>
        </div>
      </div>
    </section>
  );
};

export default FounderFit;
