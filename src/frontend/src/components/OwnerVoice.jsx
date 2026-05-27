import './OwnerVoice.css';

const interviewPoints = [
  {
    label: '시작 전',
    title: '처음 창업할 때 무엇을 확인해야 하는가',
    description: '비용, 상권, 운영 부담을 상담에서 먼저 짚어봅니다.'
  },
  {
    label: '오픈 후',
    title: '오픈 준비와 운영 지원은 어디까지 보는가',
    description: '오픈 준비, 행사, 운영 점검 항목을 점포 조건에 맞춰 확인합니다.'
  },
  {
    label: '재방문',
    title: '우리 동네에서 다시 올 이유가 있는가',
    description: '포장 손님과 동네 단골이 생길 수 있는 상권인지 함께 봅니다.'
  }
];

const OwnerVoice = () => {
  return (
    <section className="owner-voice-section" id="owner-voice" aria-labelledby="owner-voice-title">
      <figure className="owner-voice-photo">
        <img
          src="/images/dakjangsu-owner-phone-privacy.jpg"
          alt="매장에서 전화 응대를 하는 닭장수후라이드 점주"
        />
        <figcaption>
          <span>상담 전 확인할 질문</span>
          <strong>점주의 시선으로 창업 조건을 다시 봅니다</strong>
        </figcaption>
      </figure>

      <div className="owner-voice-copy">
        <h2 id="owner-voice-title">
          <span>결정은</span>
          <span>현장 기준까지</span>
          <span>보고 하세요</span>
        </h2>
      </div>

      <div className="owner-voice-points" aria-label="상담 전에 확인할 점주 관점 질문">
        {interviewPoints.map((item) => (
          <article key={item.title}>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
        <a className="owner-voice-link" href="#lead-capture">
          상담에서 내 조건 확인하기
        </a>
      </div>
    </section>
  );
};

export default OwnerVoice;
