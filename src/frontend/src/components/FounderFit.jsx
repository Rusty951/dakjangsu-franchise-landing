import './FounderFit.css';

const supportSlots = Array.from({ length: 3 }, (_, index) => index);

const FounderFit = () => {
  return (
    <section className="founder-fit-section" id="founder-fit" aria-labelledby="founder-fit-title">
      <div className="founder-fit-copy">
        <h2 id="founder-fit-title">
          <span>오픈 전부터</span>
          <span>끝까지</span>
          <span>함께 합니다</span>
        </h2>
      </div>

      <div className="founder-fit-content">
        <figure className="founder-support-proof">
          <img
            src="/images/dakjangsu-open-event-queue-privacy.jpg"
            alt="오픈 행사에 맞춰 매장 앞에 줄 선 손님들"
          />
        </figure>

        <div className="founder-checklist" aria-label="본사 지원 조건 항목">
          {supportSlots.map((slot) => (
            <article key={slot} aria-hidden="true" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FounderFit;
