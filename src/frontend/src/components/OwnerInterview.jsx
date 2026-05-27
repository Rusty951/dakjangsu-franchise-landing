import './OwnerInterview.css';

const OwnerInterview = () => {
  return (
    <section className="owner-interview-section" id="owner-interview" aria-labelledby="owner-interview-title">
      <div className="owner-interview-content">
        <div className="owner-interview-heading">
          <h2 id="owner-interview-title">
            <span>먼저 시작한 사람이</span>
            <span>말하는 닭장수</span>
          </h2>
        </div>

        <figure className="owner-proof-photo">
          <img
            src="/images/dakjangsu-owner-interview-real.png"
            alt="닭장수후라이드 점주 인터뷰 장면"
          />
        </figure>

        <p className="owner-interview-story">
          <span>먼저 시작한 점주의 추천은</span>
          <span>다음 창업으로 이어졌습니다.</span>
          <span>직접 해본 사람이 권한 브랜드라는 것,</span>
          <span>닭장수후라이드가 가진 또 하나의 힘입니다.</span>
        </p>
      </div>
    </section>
  );
};

export default OwnerInterview;
