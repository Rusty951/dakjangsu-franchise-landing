import './MenuProof.css';

const MenuProof = () => {
  return (
    <section className="menu-proof-section" id="fried">
      <div className="container">
        <div className="brand-section-heading">
          <span>03 / 팔릴 메뉴</span>
          <h2>다시 찾는<br />후라이드.</h2>
        </div>

        <div className="fried-preview">
          <figure className="image-frame fried-wide">
            <img
              src="/images/dakjangsu-original-chicken-wide.png"
              alt="앞치마를 입은 직원이 후라이드 치킨을 들고 있는 제품 사진"
            />
          </figure>
        </div>

        <div className="brand-columns" id="steady">
          <article>
            <span>01</span>
            <h3>시그니처 후라이드</h3>
            <p>처음 온 손님도 기억할 대표 메뉴.</p>
          </article>
          <article>
            <span>02</span>
            <h3>얇고 바삭한 튀김옷</h3>
            <p>한 입에 남는 바삭함.</p>
          </article>
          <article>
            <span>03</span>
            <h3>포장 후에도 기억되는 식감</h3>
            <p>집에 도착한 뒤에도 남는 인상.</p>
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
