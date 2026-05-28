import './CharacterHeroConcept.css';
import Logo from './Logo';
import { assetPath } from '../assetPath';

const CharacterHeroConcept = ({ onKakaoClick }) => {
  return (
    <section className="character-hero" id="top" aria-label="닭장수후라이드 제품 중심 히어로 시안">
      <figure className="character-hero-bg">
        <img
          src={assetPath('/images/dakjangsu-hand-developed-hero.png')}
          alt="빨간 포스터를 뚫고 나온 손이 후라이드 치킨 박스를 내미는 이미지"
        />
      </figure>

      <header className="character-hero-header">
        <Logo />
        <span>FRANCHISE CONSULTING</span>
      </header>

      <div className="character-hero-copy">
        <span>왜 닭장수후라이드인가</span>
        <h1>
          <span className="character-title-desktop">
            동네에서
            <br />
            다시 찾는
            <br />
            프라이드.
          </span>
          <span className="character-title-mobile">
            동네에서
            <br />
            다시 찾는
            <br />
            프라이드.
          </span>
        </h1>
        <p>
          특제 파우더, 얇고 바삭한 튀김, 깨끗한 기름 관리.
          내 지역에서 다시 사 먹히는 장면이 있는지 먼저 확인합니다.
        </p>
        <button type="button" onClick={onKakaoClick}>
          카카오톡으로 내 지역 창업 상담하기
        </button>
      </div>
    </section>
  );
};

export default CharacterHeroConcept;
