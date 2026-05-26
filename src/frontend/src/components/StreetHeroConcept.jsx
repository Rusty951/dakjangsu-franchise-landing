import './StreetHeroConcept.css';
import Logo from './Logo';

const StreetHeroConcept = ({ onKakaoClick }) => {
  return (
    <section className="street-hero" id="top" aria-label="닭장수후라이드 상권 장면형 히어로 시안">
      <figure className="street-hero-bg">
        <img
          src="/images/dakjangsu-street-takeout-hero.png"
          alt="저녁 포장 매장 앞 손님과 후라이드 치킨 박스"
        />
      </figure>

      <header className="street-hero-header">
        <Logo />
        <span>LOCAL TAKEOUT CONCEPT</span>
      </header>

      <div className="street-hero-copy">
        <span className="street-kicker">닭장수 상권 체크</span>
        <h1>
          동네에서
          <br />
          다시 찾는
          <br />
          프라이드.
        </h1>
        <p>닭장수후라이드가 퇴근길 포장과 주말 식탁에 다시 오를 수 있는 상권인지 먼저 확인합니다.</p>
        <button type="button" onClick={onKakaoClick}>
          카카오톡으로 내 지역 확인하기
        </button>
      </div>

      <div className="street-hero-proof" aria-label="상담에서 확인하는 항목">
        <article>
          <span>01</span>
          <strong>재구매 이유</strong>
        </article>
        <article>
          <span>02</span>
          <strong>포장 동선</strong>
        </article>
        <article>
          <span>03</span>
          <strong>운영 구조</strong>
        </article>
      </div>
    </section>
  );
};

export default StreetHeroConcept;
