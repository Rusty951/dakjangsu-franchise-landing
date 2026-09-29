import './RebrandLanding.css';
import { assetPath } from '../assetPath';
import LeadCapture from './LeadCapture';
import SiteFooter from './SiteFooter';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';
import { useState } from 'react';

const RebrandLanding = ({ onKakaoClick, socialLinks }) => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="rebrand-page" id="top">
      <header className="rebrand-header">
        <a href="#top" className="rebrand-logo" aria-label="닭장수후라이드 가맹 안내 첫 화면">
          <img src={assetPath('/rebrand/bi-warm-ink.png')} alt="닭장수후라이드 和" width="512" height="128" />
        </a>
        <nav aria-label="페이지 메뉴">
          <a href="#rebrand-model">매장 방향</a>
          <a href="#rebrand-space">공간 콘셉트</a>
          <a href="#lead-capture" className="rebrand-header-cta">가맹 상담</a>
        </nav>
      </header>

      <main>
        <section className="rebrand-hero" aria-labelledby="rebrand-hero-title">
          <div className="rebrand-hero-copy">
            <span className="rebrand-eyebrow">닭장수후라이드 가맹 안내</span>
            <img className="rebrand-hero-logo" src={assetPath('/rebrand/bi-warm-ink.png')} alt="닭장수후라이드 和" width="512" height="128" />
            <h1 id="rebrand-hero-title">닭장수가 문을 열면,<br /><em>동네 저녁이 시작됩니다.</em></h1>
            <p>
              후라이드 한 마리에서 동네 손님이 머무는 저녁까지.
              새로운 매장 방향을 함께 살펴보세요.
            </p>
            <div className="rebrand-hero-actions">
              <a className="rebrand-button rebrand-button--primary" href="#rebrand-space">
                공간 콘셉트 보기 <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <figure className="rebrand-hero-character">
            <div className="rebrand-character-window">
              <img src={assetPath('/rebrand/character-3d.png')} alt="검은 갓과 앞치마를 입은 닭장수 캐릭터" width="1122" height="1402" fetchPriority="high" />
            </div>
            <figcaption>닭장수</figcaption>
          </figure>
          <div className="rebrand-hero-index" aria-hidden="true">BRAND CHARACTER / DAKJANGSU</div>
        </section>

        <section className="rebrand-intro rebrand-container" id="rebrand-model" aria-labelledby="rebrand-intro-title">
          <div className="rebrand-section-heading">
            <span>매장 방향</span>
            <h2 id="rebrand-intro-title">한 마리를 사 가는 손님부터<br />저녁을 함께 보내는 손님까지</h2>
          </div>
          <div className="rebrand-intro-body">
            <p>닭장수후라이드는 후라이드를 중심에 두고, 포장과 홀 이용을 함께 살펴보는 매장 방향을 개발하고 있습니다.</p>
            <p>배달도 운영의 한 경로입니다. 다만 새 점포를 검토할 때는 주변에 사는 손님이 어떻게 들르고, 먹고, 다시 찾을지까지 함께 봅니다.</p>
          </div>
          <div className="rebrand-model-grid">
            <article><span>01</span><h3>포장</h3><p>퇴근길에 들러 한 마리를 가져가는 손님의 동선</p></article>
            <article><span>02</span><h3>홀</h3><p>후라이드와 한잔, 식사가 이어지는 저녁 자리</p></article>
            <article><span>03</span><h3>배달</h3><p>지역과 점포 조건에 맞춰 검토할 주문 경로</p></article>
          </div>
        </section>

        <section className="rebrand-space" id="rebrand-space" aria-labelledby="rebrand-space-title">
          <div className="rebrand-container">
            <div className="rebrand-section-heading rebrand-section-heading--space">
              <span>파일럿 공간 콘셉트</span>
              <h2 id="rebrand-space-title">닭장수의 저녁을 담을 공간</h2>
              <p>따뜻한 적주황 벽돌, 단순한 스테인리스 가구와 테이블을 비추는 조명으로 새 매장 방향을 살펴보고 있습니다.</p>
            </div>
            <div className="rebrand-space-grid">
              <figure>
                <img src={assetPath('/rebrand/interior-18.jpg')} alt="좁고 긴 홀과 오른쪽 주방을 보여주는 18평형 실내 콘셉트" width="1400" height="933" loading="lazy" />
                <figcaption><strong>18평형 적용 예시</strong><span>좁고 긴 홀</span></figcaption>
              </figure>
              <figure>
                <img src={assetPath('/rebrand/interior-35-45.jpg')} alt="좌석군과 오른쪽 개방형 주방을 보여주는 35~45평형 실내 콘셉트" width="1400" height="788" loading="lazy" />
                <figcaption><strong>35~45평형 적용 예시</strong><span>넓은 홀</span></figcaption>
              </figure>
            </div>
            <p className="rebrand-space-note">위 이미지는 파일럿 공간의 시각화입니다. 실제 점포의 좌석 수, 치수, 재료와 공사비는 현장 확인 후 정합니다.</p>
          </div>
        </section>

        <section className="rebrand-fit rebrand-container" aria-labelledby="rebrand-fit-title">
          <div className="rebrand-section-heading">
            <span>가맹 상담에서 볼 것</span>
            <h2 id="rebrand-fit-title">내 동네에서는<br />어떤 매장이 가능할까요?</h2>
          </div>
          <div className="rebrand-fit-list">
            <article><span>01</span><div><h3>희망 지역</h3><p>포장과 홀 이용을 기대할 수 있는 위치와 주변 생활 동선을 살펴봅니다.</p></div></article>
            <article><span>02</span><div><h3>점포 조건</h3><p>면적, 기존 주방과 설비, 재사용할 수 있는 시설을 확인합니다.</p></div></article>
            <article><span>03</span><div><h3>운영 방식</h3><p>직접 운영 계획과 예산에 맞춰 적용할 매장 형태를 논의합니다.</p></div></article>
          </div>
        </section>

        <LeadCapture onKakaoClick={onKakaoClick} rebrandCopy hideKakao />
      </main>

      <SiteFooter socialLinks={socialLinks} onPrivacyClick={() => setIsPrivacyOpen(true)} />
      {isPrivacyOpen && <PrivacyPolicyDialog onClose={() => setIsPrivacyOpen(false)} />}
    </div>
  );
};

export default RebrandLanding;
