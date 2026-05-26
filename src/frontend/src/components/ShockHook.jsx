import './ShockHook.css';

const ShockHook = () => {
  return (
    <section className="shock-hook-section" aria-labelledby="shock-hook-title">
      <figure className="shock-hook-image">
        <img
          src="/images/dakjangsu-chicken-original-fullbleed.png"
          alt="튀김망 위에 놓인 닭장수후라이드 치킨 클로즈업"
        />
      </figure>
      <div className="shock-hook-copy">
        <h2 id="shock-hook-title">
          다음 포장이<br />
          떠오르는 맛
        </h2>
      </div>
    </section>
  );
};

export default ShockHook;
