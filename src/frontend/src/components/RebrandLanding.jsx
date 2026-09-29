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
          <a href="#rebrand-benefits">가맹 혜택</a>
          <a href="#rebrand-space">공간 콘셉트</a>
          <a href="#lead-capture" className="rebrand-header-cta">가맹 상담</a>
        </nav>
      </header>

      <main>
        <section className="rebrand-hero" aria-labelledby="rebrand-hero-title">
          <div className="rebrand-hero-topline"><span>FRIED CHICKEN & GOOD EVENINGS</span><span>닭장수후라이드 가맹 안내</span></div>
          <img className="rebrand-hero-logo" src={assetPath('/rebrand/bi-warm-ink.png')} alt="닭장수후라이드 和" width="1024" height="256" />
          <div className="rebrand-hero-copy">
            <span className="rebrand-eyebrow">동네 저녁의 시작</span>
            <h1 id="rebrand-hero-title">후라이드로<br />문을 열고,<br /><em>동네와 오래.</em></h1>
            <p>한 마리를 사 가는 손님도,<br />한잔을 나누는 손님도.<br />닭장수가 반갑게 맞이합니다.</p>
          </div>
          <figure className="rebrand-hero-character">
            <img src={assetPath('/rebrand/character-cutout.png')} alt="검은 갓과 앞치마를 입고 손님을 맞이하는 닭장수" width="1122" height="1402" fetchPriority="high" />
          </figure>
          <div className="rebrand-hero-offer">
            <span className="rebrand-eyebrow">새로운 시작을 함께</span>
            <p>어떤 공간에서,<br />어떤 지원으로 시작할까요?</p>
            <a className="rebrand-button rebrand-button--primary" href="#rebrand-benefits">가맹 혜택 살펴보기</a>
            <a className="rebrand-text-link" href="#rebrand-space">새 매장 공간 보기</a>
          </div>
          <div className="rebrand-hero-bottom"><span>맛있는 한 마리. 반가운 한 자리.</span><span>SCROLL TO EXPLORE</span></div>
        </section>

        <section className="rebrand-benefits" id="rebrand-benefits" aria-labelledby="benefits-title">
          <div className="rebrand-container">
            <div className="benefits-heading">
              <div><span className="rebrand-eyebrow">신규 가맹 혜택안</span><h2 id="benefits-title">시작할 때부터,<br />자리 잡을 때까지.</h2></div>
              <p className="benefits-status">2026년 8월 혜택 초안 기준<br />신규 10개점 대상안이며, 시행 여부와 모집 잔여 수량은 상담에서 확인합니다.</p>
            </div>
            <div className="benefit-lead">
              <div><span className="benefit-number">01 / OPEN START</span><h3>가맹비와 교육비,<br />시작의 부담을 덜다.</h3><p>가맹비 275만원 + 교육비 165만원<br />부가세 포함 합계 440만원 면제안</p></div>
              <div className="benefit-zero"><span>가맹비 + 교육비</span><strong>0<small>원</small></strong><span>프로모션 적용 시</span></div>
            </div>
            <div className="benefit-grid">
              <article><span className="benefit-number">02 / OPENING</span><h3>첫 손님을 맞이할 준비</h3><strong>생닭 200수 + 마케팅</strong><p>오픈행사 생닭 100만원 상당과 지역 커뮤니티, 블로그 체험단 등 마케팅 200만원 상당 지원안.</p><p className="benefit-caption">가맹비와 교육비 면제를 포함한 오픈 패키지 합계 740만원 상당</p></article>
              <article><span className="benefit-number">03 / KITCHEN</span><h3>주방도 함께 준비합니다</h3><strong>500만원 상당</strong><p>간냉식 냉장고 300만원 상당, 최신형 튀김기 200만원 상당 지원안.</p><p className="benefit-caption">조건 충족 매장 중 선착순 5개점 대상안</p></article>
              <article><span className="benefit-number">04 / ROYALTY</span><h3>운영에 집중할 첫 2년</h3><strong>로열티 전액 면제</strong><p>최초 가맹계약 2년 동안 정상 로열티율인 월 매출액 3.3%를 면제하는 안입니다.</p><p className="benefit-caption">약 1,800만원은 과거 평균 매출로 산정한 예시이며 실제 면제액은 매장 매출에 따라 달라집니다.</p></article>
              <article><span className="benefit-number">05 / GROWTH</span><h3>성장에 맞춰 더하는 지원</h3><strong>월 최대 100만원</strong><p>월 매출 3,000만원 이상은 30만원, 4,000만원 이상은 100만원의 물류 크레딧 지원안.</p><p className="benefit-caption">개점월부터 12개월 내 달성 월에 적용, 익월 물류대금에서 차감</p></article>
            </div>
            <div className="benefit-zero-fees"><span>초안에 기재된 추가 비용</span><p>계약이행보증금 <b>0원</b></p><p>가맹금 예치금 <b>0원</b></p><p>재계약비 <b>0원</b></p></div>
            <details className="benefit-terms">
              <summary>지원 대상과 세부 조건 확인하기</summary>
              <div>
                <h4>주방 패키지 지원 조건</h4>
                <ul><li>반경 500m 내 아파트 3,000세대 이상인 도보 생활 상권. 초등학교, 중학교와 학원가 인접 단지 우대.</li><li>전용면적 15평 이상이며 홀, 포장, 배달을 함께 운영하는 매장. 배달 전용 매장은 제외.</li><li>본사 표준 사양에 따른 전체 인테리어 신규 시공과 본사 검수 완료. 기존 점포 전환에도 동일 적용하며 간판 교체나 부분 보수만으로는 해당하지 않음.</li><li>지원일부터 24개월 의무 운영. 가맹점 사유로 조기 종료하면 잔여 기간에 비례해 지원액 환수.</li></ul>
                <h4>운영 지원과 금액 안내</h4>
                <ul><li>물류 크레딧 매출 기준은 부가세를 포함한 POS와 배달앱 정산 매출 합산. 매출 증빙 제출 필요.</li><li>로열티 면제 예시는 2025년 가맹점 연평균 매출액 273,028천원을 기준으로 산정. 개별 점포의 미래 매출을 보장하지 않음.</li><li>‘상당’ 금액은 공급가 기준이며 현금 지급이 아님. 각 항목에는 별도 조건이 있어 모두에게 같은 금액이 적용되는 것은 아님.</li><li>프로모션 기간, 적용 대상과 최종 혜택은 본사 확인 및 가맹계약서와 특약서 기준.</li></ul>
              </div>
            </details>
          </div>
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
