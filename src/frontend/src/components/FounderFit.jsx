import { useEffect, useRef, useState } from 'react';
import './FounderFit.css';

const supportSteps = [
  {
    number: '01',
    phase: '오픈 전',
    headline: '시작 부담을 함께 점검',
    highlight: '함께 점검',
    figures: [
      { value: '상담 확인', label: '가맹 조건' },
      { value: '상담 확인', label: '교육 범위' },
      { value: '상담 확인', label: '운영 비용' },
      { value: '상담 확인', label: '매장 준비' },
      { value: '상담 확인', label: '물류 조건' }
    ],
    description: '초기 준비에 필요한 항목과 적용 조건을 상담에서 함께 확인합니다.'
  },
  {
    number: '02',
    phase: '오픈 첫날',
    headline: '첫날 운영 흐름 준비',
    highlight: '운영 흐름',
    figures: [
      { value: '초기 홍보', label: '준비 지원' },
      { value: '오픈 행사', label: '운영 협의' },
      { value: '현장 운영', label: '지원 확인' }
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`founder-fit-section founder-fit-section--motion-ready${isVisible ? ' is-visible' : ''}`}
      id="founder-fit"
      aria-labelledby="founder-fit-title"
      ref={sectionRef}
    >
      <div className="founder-fit-copy">
        <h2 id="founder-fit-title">
          <span>오픈하고 끝?</span>
          <span>닭장수는 <em>끝까지</em></span>
        </h2>
        <p>
          오픈 전, 첫날, 오픈 후까지
          단계별로 본사가 같이 봅니다.
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
                <div className="founder-support-numbers" aria-label={`${step.phase} 주요 지원 항목`}>
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
