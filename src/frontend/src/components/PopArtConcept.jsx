import './PopArtConcept.css';
import Logo from './Logo';

const PopArtConcept = ({ onKakaoClick }) => {
  return (
      <section className="graphic-poster" id="top" aria-label="닭장수후라이드 제품 중심 그래픽 광고 시안">
        <header className="graphic-poster-header">
          <Logo />
          <span>FRANCHISE POSTER CONCEPT</span>
        </header>

        <figure className="poster-product">
          <img src="/images/dakjangsu-red-hand-hero-16x9.png" alt="빨간 배경을 뚫고 나온 손이 후라이드 치킨 박스를 들고 있는 광고 이미지" />
        </figure>

        <div className="poster-bg-type" aria-hidden="true">
          <span>TAKE</span>
          <span>OUT</span>
        </div>

        <div className="poster-package-mark" aria-hidden="true">
          <strong>和</strong>
          <span>닭장수<br />후라이드</span>
        </div>

        <div className="poster-message">
          <span>왜 닭장수후라이드인가</span>
          <h1>
            오늘 주문보다
            <br />
            다음 방문을
            <br />
            생각합니다
          </h1>
        </div>

        <div className="poster-subcopy">
          <p>특제 파우더, 얇고 바삭한 튀김, 깨끗한 기름 관리가 내 지역에서 통할지 먼저 확인합니다.</p>
          <button type="button" onClick={onKakaoClick}>
            카카오톡으로 내 지역 확인하기
          </button>
          <div className="poster-checks" aria-label="상담에서 보는 항목">
            <span>재구매 이유</span>
            <span>포장 동선</span>
            <span>운영 구조</span>
          </div>
        </div>
      </section>
  );
};

export default PopArtConcept;
