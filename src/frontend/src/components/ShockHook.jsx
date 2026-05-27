import './ShockHook.css';

const ShockHook = () => {
  return (
    <section className="shock-hook-section" aria-labelledby="shock-hook-title">
      <figure className="shock-hook-image">
        <img
          src="/images/dakjangsu-packaging-start-queue-privacy.jpg"
          alt="매장 안에서 포장 준비와 대기 손님이 함께 보이는 장면"
        />
      </figure>
      <div className="shock-hook-copy">
        <h2 id="shock-hook-title">
          <span>테이크아웃으로 시작한</span>
          <span>닭장수는 동네 손님을</span>
          <span>먼저 봤습니다</span>
        </h2>
        <p className="shock-hook-answer">
          <strong>배달앱이 아니어도 다시 찾게 만드는 매장.</strong>
          <span>닭장수의 답은 포장과 재방문에 있습니다.</span>
        </p>
      </div>
    </section>
  );
};

export default ShockHook;
