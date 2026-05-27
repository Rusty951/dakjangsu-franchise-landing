import './OwnerInterview.css';

const localChecks = [
  {
    label: '지역',
    title: '내 지역과 잘 맞는가',
    description: '주변 동선, 주거 밀도, 포장 수요를 함께 봅니다.'
  },
  {
    label: '운영',
    title: '꾸준히 운영할 수 있는가',
    description: '준비 순서, 매장 동선, 인력 운영을 현실적으로 확인합니다.'
  },
  {
    label: '비용',
    title: '시작 조건이 맞는가',
    description: '창업 조건과 지원 범위는 지역과 점포 조건에 맞춰 확인합니다.'
  }
];

const OwnerInterview = () => {
  return (
    <section className="owner-interview-section" id="owner-interview">
      <div className="owner-interview-content">
        <figure className="owner-proof-photo">
          <img
            src="/images/dakjangsu-owner-interview-real.png"
            alt="닭장수후라이드 점주 인터뷰 장면"
          />
          <figcaption>
            <span>상담 전 확인할 것</span>
            <strong>지역, 운영, 비용을 차례로 확인합니다</strong>
          </figcaption>
        </figure>

        <div className="owner-check-grid" aria-label="창업자가 확인할 세 가지 기준">
          {localChecks.map((item) => (
            <article key={item.title}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OwnerInterview;
