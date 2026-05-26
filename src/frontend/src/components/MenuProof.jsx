import './MenuProof.css';

const MenuProof = () => {
  return (
    <section className="menu-proof-section" id="fried">
      <div className="container">
        <div className="brand-section-heading">
          <span>03 / 닭장수의 후라이드</span>
          <h2>왜 다시 찾는<br />후라이드인가.</h2>
        </div>

        <div className="fried-preview">
          <figure className="image-frame fried-wide">
            <img
              src="/images/dakjangsu-original-chicken-wide.png"
              alt="앞치마를 입은 직원이 후라이드 치킨을 들고 있는 제품 사진"
            />
            <figcaption>
              <span>후라이드</span>
              <strong>한 번 주문보다 다음 포장을 생각합니다</strong>
            </figcaption>
          </figure>
        </div>

        <div className="brand-columns" id="steady">
          <article>
            <span>01</span>
            <h3>특제 파우더</h3>
            <p>닭장수후라이드의 고소한 인상을 만드는 제조 포인트.</p>
          </article>
          <article>
            <span>02</span>
            <h3>얇고 바삭한 튀김옷</h3>
            <p>무겁지 않게 바삭함을 남겨 다시 먹고 싶은 식감으로 연결합니다.</p>
          </article>
          <article>
            <span>03</span>
            <h3>깨끗한 기름 관리</h3>
            <p>동네 손님이 자주 먹는 치킨일수록 깔끔한 인상이 중요합니다.</p>
          </article>
        </div>

        <div className="section-action menu-proof-actions" id="consult">
          <a className="soft-cta-link" href="#local-fit-qna">
            내 동네 가능성 보기
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuProof;
