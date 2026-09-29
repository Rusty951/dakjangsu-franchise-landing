import './RebrandLanding.css';
import { assetPath } from '../assetPath';
import LeadCapture from './LeadCapture';
import SiteFooter from './SiteFooter';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';
import { useState } from 'react';
import RebrandScrollStory from './RebrandScrollStory';

const RebrandLanding = ({ onKakaoClick, socialLinks }) => {
  const [spaceView, setSpaceView] = useState(0);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="rebrand-page" id="top">
      <a className="rebrand-skip" href="#rebrand-menu">본문 바로가기</a>
      <header className="rebrand-header">
        <a href="#top" className="rebrand-logo" aria-label="닭장수후라이드 가맹 안내 첫 화면">
          <img src={assetPath('/rebrand/bi-warm-ink.png')} alt="닭장수후라이드 和" width="512" height="128" />
        </a>
        <nav aria-label="페이지 메뉴">
          <a href="#rebrand-menu">메뉴</a>
          <a href="#rebrand-benefits">가맹 혜택</a>
          <a href="#rebrand-space">공간 콘셉트</a>
          <a href="#lead-capture" className="rebrand-header-cta">가맹 상담</a>
        </nav>
      </header>

      <main>
        <RebrandScrollStory />

        <section className="rebrand-menu rebrand-container" id="rebrand-menu" aria-labelledby="menu-title">
          <div className="rebrand-section-heading"><span>01 / THE CHICKEN</span><h2 id="menu-title">이제, 메뉴를<br />살펴보시죠.</h2><p>특제 파우더로 튀긴 후라이드.<br />포장 한 상자에도, 홀의 한 접시에도<br />닭장수가 가장 먼저 내놓는 메뉴입니다.</p></div>
          <figure className="rebrand-food-photo"><img src={assetPath('/images/dakjangsu-product-showcase-real.jpg')} alt="매장 진열대에 준비된 닭장수 후라이드 치킨" width="2400" height="1600" loading="lazy" /><figcaption><span>THE ORIGINAL</span><strong>후라이드가 중심입니다.</strong></figcaption></figure>
          <div className="rebrand-menu-grid">
            {[['fried-chicken','후라이드치킨','기본부터 바삭하게'],['half-half-chicken','반반치킨','두 가지 맛을 한 접시에'],['garlic-pepper-chicken','마늘후추치킨','마늘과 후추로 더한 풍미']].map(([image,name,desc],i)=><article key={image}><div><span>0{i+1}</span><img src={assetPath(`/images/menu-showcase/${image}.webp`)} alt={name} width="520" height="360" loading="lazy" /></div><h3>{name}</h3><p>{desc}</p></article>)}
          </div>
        </section>

        <section className="rebrand-space" id="rebrand-space" aria-labelledby="rebrand-space-title">
          <div className="rebrand-container">
            <div className="rebrand-section-heading"><span>02 / THE NEIGHBORHOOD</span><h2 id="rebrand-space-title">한 마리 포장도,<br />한잔할 자리도.</h2><p>퇴근길에 들르고, 마주 앉아 먹는 공간.<br />따뜻한 벽돌과 스테인리스, 테이블 위의 조명으로<br />닭장수의 새로운 매장 분위기를 잡았습니다.</p></div>

            <div className="rebrand-space-selector" aria-label="공간 콘셉트 선택">
              <button type="button" aria-pressed={spaceView===0} onClick={()=>setSpaceView(0)}>01 <span>좁고 긴 홀</span> <small>18평형 예시</small></button>
              <button type="button" aria-pressed={spaceView===1} onClick={()=>setSpaceView(1)}>02 <span>넓은 홀</span> <small>35~45평형 예시</small></button>
            </div>
            <figure className="rebrand-space-stage" aria-live="polite"><img src={assetPath(spaceView===0?'/rebrand/interior-18.jpg':'/rebrand/interior-35-45.jpg')} alt={spaceView===0?'좁고 긴 홀과 오른쪽 주방의 18평형 공간 콘셉트':'좌석군과 개방형 주방의 35~45평형 공간 콘셉트'} width="1400" height="900" loading="lazy" /><figcaption><span>SPACE CONCEPT {spaceView===0?'01':'02'}</span><span>공간 시각화 / 실제 시공 사진 아님</span></figcaption></figure>
            <div className="rebrand-operation"><article><span>TAKE OUT</span><h3>집으로 가져가는 한 마리</h3><p>주문과 픽업이 자연스럽게 이어지는 입구를 생각합니다.</p></article><article><span>DINE IN</span><h3>마주 앉는 저녁 한 끼</h3><p>후라이드와 한잔을 놓을 테이블, 머물 자리를 생각합니다.</p></article><article><span>DELIVERY</span><h3>동네로 이어지는 주문</h3><p>홀과 포장 동선에 맞춰 배달 운영 방식도 함께 검토합니다.</p></article></div>
            <p className="rebrand-space-note">현재 공간 콘셉트입니다. 실제 좌석 수, 치수, 설비와 공사비는 점포 실측 후 정합니다.</p>
          </div>
        </section>

        <section className="rebrand-benefits" id="rebrand-benefits" aria-labelledby="benefits-title">
          <div className="rebrand-container">
            <div className="benefits-heading">
              <div><span className="rebrand-eyebrow">03 / OPENING SUPPORT</span><h2 id="benefits-title">지원은 구체적으로.<br />조건은 분명하게.</h2></div>
              <p className="benefits-status">2026년 8월 혜택 초안 기준<br />신규 10개점 대상안이며, 시행 여부와 모집 잔여 수량은 상담에서 확인합니다.</p>
            </div>

            <div className="benefit-lead">
              <div><span className="benefit-number">01 / OPEN START</span><h3>가맹비와 교육비<br />440만원 면제안</h3><p>가맹비 275만원 + 교육비 165만원<br />부가세 포함 합계 440만원 면제안</p></div>
              <div className="benefit-zero"><span>가맹비 + 교육비 면제</span><strong>440<small>만원</small></strong><span>프로모션 적용 시</span></div>
            </div>
            <div className="benefit-grid">
              <article><span className="benefit-number">02 / OPENING</span><h3>첫 손님을 맞이할 준비</h3><strong>생닭 200수 + 마케팅</strong><p>오픈행사 생닭 100만원 상당과 지역 커뮤니티, 블로그 체험단 등 마케팅 200만원 상당 지원안.</p><p className="benefit-caption">가맹비와 교육비 면제를 포함한 오픈 패키지 합계 740만원 상당</p></article>
              <article><span className="benefit-number">03 / KITCHEN</span><h3>주방도 함께 준비합니다</h3><strong>500만원 상당</strong><p>간냉식 냉장고 300만원 상당, 최신형 튀김기 200만원 상당 지원안.</p><p className="benefit-caption">조건 충족 매장 중 선착순 5개점 대상안</p></article>
              <article><span className="benefit-number">04 / ROYALTY</span><h3>운영에 집중할 첫 2년</h3><strong>로열티 전액 면제</strong><p>최초 가맹계약 2년 동안 정상 로열티율인 월 매출액 3.3%를 면제하는 안입니다.</p><p className="benefit-caption">실제 면제액은 매장 매출에 따라 달라집니다.</p></article>
              <article><span className="benefit-number">05 / GROWTH</span><h3>성장에 맞춰 더하는 지원</h3><strong>월 최대 100만원</strong><p>월 매출 3,000만원 이상은 30만원, 4,000만원 이상은 100만원의 물류 크레딧 지원안.</p><p className="benefit-caption">개점월부터 12개월 내 달성 월에 적용, 익월 물류대금에서 차감</p></article>
            </div>
            <div className="benefit-zero-fees"><span>초안에 기재된 추가 비용</span><p>계약이행보증금 <b>0원</b></p><p>가맹금 예치금 <b>0원</b></p><p>재계약비 <b>0원</b></p></div>
            <details className="benefit-terms">
              <summary>지원 대상과 세부 조건 확인하기</summary>
              <div>
                <h4>주방 패키지 지원 조건</h4>
                <ul><li>반경 500m 내 아파트 3,000세대 이상인 도보 생활 상권. 초등학교, 중학교와 학원가 인접 단지 우대.</li><li>전용면적 15평 이상이며 홀, 포장, 배달을 함께 운영하는 매장. 배달 전용 매장은 제외.</li><li>본사 표준 사양에 따른 전체 인테리어 신규 시공과 본사 검수 완료. 기존 점포 전환에도 동일 적용하며 간판 교체나 부분 보수만으로는 해당하지 않음.</li><li>지원일부터 24개월 의무 운영. 가맹점 사유로 조기 종료하면 잔여 기간에 비례해 지원액 환수.</li></ul>
                <h4>운영 지원과 금액 안내</h4>
                <ul><li>물류 크레딧 매출 기준은 부가세를 포함한 POS와 배달앱 정산 매출 합산. 매출 증빙 제출 필요.</li><li>‘상당’ 금액은 공급가 기준이며 현금 지급이 아님. 각 항목에는 별도 조건이 있어 모두에게 같은 금액이 적용되는 것은 아님.</li><li>프로모션 기간, 적용 대상과 최종 혜택은 본사 확인 및 가맹계약서와 특약서 기준.</li></ul>
              </div>
            </details>
          </div>
        </section>

        <section className="rebrand-fit rebrand-container" aria-labelledby="rebrand-fit-title">
          <div className="rebrand-section-heading">
            <span>04 / YOUR NEXT STEP</span>
            <h2 id="rebrand-fit-title">점포가 있어도,<br />아직 없어도.<br />여기서 시작하세요.</h2>

          </div>
          <div className="rebrand-fit-list">
            <article><span>01</span><div><h3>희망 지역</h3><p>포장과 홀 이용을 기대할 수 있는 위치와 주변 생활 동선을 살펴봅니다.</p></div></article>
            <article><span>02</span><div><h3>점포 조건</h3><p>면적, 기존 주방과 설비, 재사용할 수 있는 시설을 확인합니다.</p></div></article>
            <article><span>03</span><div><h3>운영 방식</h3><p>직접 운영 계획과 예산에 맞춰 적용할 매장 형태를 논의합니다.</p></div></article>
          </div>
        </section>

        <section className="rebrand-faq rebrand-container" aria-labelledby="faq-title"><div className="rebrand-section-heading"><span>BEFORE WE TALK</span><h2 id="faq-title">상담 전에<br />궁금한 것들.</h2></div><div>
          <details><summary>점포를 구하기 전에도 상담할 수 있나요?</summary><p>희망 지역을 먼저 남겨주세요. 점포가 정해지지 않았다면 상담 신청서의 남기실 말에 적어주시면 됩니다.</p></details>
          <details><summary>기존 가게를 바꿔서 시작할 수 있나요?</summary><p>기존 점포의 면적과 주방, 설비 상태를 확인한 뒤 전환 가능 여부를 검토합니다. 주방 지원안은 전환 점포도 본사 기준에 따른 전체 인테리어 신규 시공과 검수가 필요합니다.</p></details>
          <details><summary>혜택 금액만큼 현금으로 지원받나요?</summary><p>가맹비 면제, 현물과 마케팅 지원, 물류대금 차감으로 구성된 안입니다. 현금 지급액을 뜻하지 않습니다. 항목별 적용 조건과 최종 시행 여부는 본사 확인이 필요합니다.</p></details>
          <details><summary>전체 창업비는 얼마인가요?</summary><p>임대 조건, 면적, 기존 시설과 공사 범위에 따라 달라집니다. 위 지원 금액은 전체 창업비가 아닙니다. 점포 조건을 확인한 뒤 항목별 견적이 필요합니다.</p></details>
        </div></section>

        <LeadCapture onKakaoClick={onKakaoClick} rebrandCopy hideKakao />
      </main>

      <SiteFooter socialLinks={socialLinks} onPrivacyClick={() => setIsPrivacyOpen(true)} />
      {isPrivacyOpen && <PrivacyPolicyDialog onClose={() => setIsPrivacyOpen(false)} />}
    </div>
  );
};

export default RebrandLanding;
