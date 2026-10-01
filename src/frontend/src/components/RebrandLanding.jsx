import './RebrandLanding.css';
import { assetPath } from '../assetPath';
import LeadCapture from './LeadCapture';
import SiteFooter from './SiteFooter';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';
import { useRef, useState } from 'react';
import RebrandScrollStory from './RebrandScrollStory';
import './RebrandBenefits.css';
import './RebrandRefinement.css';
import './RebrandImpact.css';
import './JangsuLiftMotion.css';
import './RebrandBenefitReadability.css';
import './RebrandJourney.css';
import './RebrandHeroOffer.css';
import './RebrandEditorial.css';
import './RebrandPortraitStory.css';

const RebrandLanding = ({ onKakaoClick, socialLinks }) => {
  const [spaceView, setSpaceView] = useState(0);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  return (
    <div className="rebrand-page" id="top">
      <a className="rebrand-skip" href="#rebrand-story">본문 바로가기</a>
      <header className="rebrand-header" data-menu-open={isMenuOpen} onKeyDown={event => {
        if (event.key === 'Escape' && isMenuOpen) {
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}>
        <a href="#top" className="rebrand-logo" aria-label="닭장수후라이드 가맹 안내 첫 화면">
          <img src={assetPath('/rebrand/bi-warm-ink.png')} alt="닭장수후라이드 和" width="512" height="128" />
        </a>
        <button ref={menuButtonRef} className="rebrand-menu-toggle" type="button" aria-controls="rebrand-navigation" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? '페이지 메뉴 닫기' : '페이지 메뉴 열기'} onClick={() => setIsMenuOpen(open => !open)}>메뉴</button>
        <nav id="rebrand-navigation" aria-label="페이지 메뉴" onClick={event => {
          if (event.target.closest('a')) setIsMenuOpen(false);
        }}>
          <a href="#rebrand-benefits" className="rebrand-benefits-nav">창업 혜택</a>
          <a href="#rebrand-menu">메뉴</a>
          <a href="#rebrand-space">매장 공간</a>
          <a href="#rebrand-fit" className="rebrand-mobile-nav-link">창업 준비</a>
          <a href="#rebrand-faq" className="rebrand-mobile-nav-link">자주 묻는 질문</a>
          <a href="#lead-capture" className="rebrand-header-cta">창업 상담</a>
        </nav>
      </header>

      <main>
        <RebrandScrollStory />

        <section className="rebrand-benefits" id="rebrand-benefits" aria-labelledby="benefits-title">
          <div className="rebrand-container">
            <div className="benefits-heading">
              <div><span className="rebrand-eyebrow">01 / 지원 내용</span><h2 id="benefits-title">문을 열 때부터,<br />첫 2년 운영까지.</h2></div>
              <p className="benefits-status">2026년 8월에 정리한 지원 초안입니다.<br />신규 10개점 대상안으로, 시행 여부와 남은 모집 수량은 본사 상담에서 확인해 주세요.</p>
            </div>

            <div className="benefit-lead">
              <div><span className="benefit-number">01 / 오픈 준비</span><h3>오픈 지원안</h3><p>가맹비와 교육비를 면제하고,<br />오픈행사 생닭과 마케팅을 지원하는 안입니다.</p></div>
              <div className="benefit-zero"><span>오픈 패키지 합계</span><strong>740<small>만원 상당</small></strong><span>면제와 현물, 마케팅 지원 / 현금 지급 아님</span></div>
            </div>
            <div className="benefit-breakdown" aria-label="오픈 패키지 740만원 구성"><p><span>가맹비 + 교육비 면제</span><strong>440<small>만원</small></strong><small>275만원 + 165만원, 부가세 포함</small></p><b aria-hidden="true">+</b><p><span>오픈행사 생닭 200수</span><strong>100<small>만원 상당</small></strong><small>생닭 현물 지원안</small></p><b aria-hidden="true">+</b><p><span>오픈 마케팅</span><strong>200<small>만원 상당</small></strong><small>지역 커뮤니티, 블로그 체험단 등</small></p></div>
            <div className="benefit-grid">
              <article><span className="benefit-number">02 / 주방 설비</span><h3>냉장고와 튀김기</h3><strong>500만원 상당</strong><p>간냉식 냉장고 300만원 상당과 최신형 튀김기 200만원 상당을 지원하는 안입니다.</p><p className="benefit-caption">조건을 충족한 매장 중 선착순 5개점 대상안입니다.</p></article>
              <article><span className="benefit-number">03 / 로열티</span><h3>첫 2년 로열티</h3><strong>첫 2년 전액 면제안</strong><p>최초 가맹계약 2년 동안 월 매출액 3.3%인 정상 로열티를 면제하는 안입니다.</p><p className="benefit-caption">실제 면제액은 매장 매출에 따라 달라집니다.</p></article>
              <article><span className="benefit-number">04 / 운영 지원</span><h3>물류대금에서 차감</h3><strong>월 최대 100만원</strong><p>월 매출 3,000만원 이상이면 30만원, 4,000만원 이상이면 100만원을 지원하는 물류 크레딧안입니다.</p><p className="benefit-caption">개점월부터 12개월 내 기준을 달성한 월에 적용하며, 다음 달 물류대금에서 차감합니다.</p></article>
            </div>
            <div className="benefit-consult"><div><h3>내 점포에 적용되는 지원은?</h3><p>희망 지역과 점포 조건을 알려주세요. 적용할 수 있는 항목을 하나씩 확인합니다.</p></div><a href="#lead-capture">창업 상담하기 ↗</a></div>
            <div className="benefit-zero-fees"><span>초안에 적힌 기타 비용</span><p>계약이행보증금 <b>0원</b></p><p>가맹금 예치금 <b>0원</b></p><p>재계약비 <b>0원</b></p></div>
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

        <section className="rebrand-menu rebrand-container" id="rebrand-menu" aria-labelledby="menu-title">
          <div className="rebrand-section-heading"><span>02 / 대표 메뉴</span><h2 id="menu-title">치킨집이니까,<br />기본부터 보시죠.</h2><p>닭장수의 기본은 특제 파우더로 튀긴 후라이드입니다.<br />후라이드와 반반, 마늘후추치킨을 준비했습니다.</p></div>
          <figure className="rebrand-food-photo"><img src={assetPath('/images/dakjangsu-product-showcase-real.jpg')} alt="매장 진열대에 준비된 닭장수 후라이드 치킨" width="2400" height="1600" loading="lazy" /><figcaption><span>대표 메뉴</span><strong>닭장수 후라이드</strong></figcaption></figure>
          <div className="rebrand-menu-grid">
            {[['fried-chicken','후라이드치킨','기본부터 바삭하게'],['half-half-chicken','반반치킨','두 가지 맛을 한 접시에'],['garlic-pepper-chicken','마늘후추치킨','마늘과 후추로 더한 풍미']].map(([image,name,desc],i)=><article key={image}><div><span>0{i+1}</span><img src={assetPath(`/images/menu-showcase/${image}.webp`)} alt={name} width="520" height="360" loading="lazy" /></div><h3>{name}</h3><p>{desc}</p></article>)}
          </div>
        </section>

        <section className="rebrand-space" id="rebrand-space" aria-labelledby="rebrand-space-title">
          <div className="rebrand-container">
            <div className="rebrand-section-heading"><span>03 / 매장 공간</span><h2 id="rebrand-space-title">한 마리 포장도,<br />한잔할 자리도.</h2><p>포장 손님을 맞는 입구와 치킨을 놓고 앉을 테이블.<br />매장 크기에 맞춰 배치를 달리한 두 가지 공간 예시입니다.</p></div>

            <div className="rebrand-space-selector" aria-label="공간 콘셉트 선택">
              <button type="button" aria-pressed={spaceView===0} onClick={()=>setSpaceView(0)}>01 <span>좁고 긴 홀</span> <small>18평형 예시</small></button>
              <button type="button" aria-pressed={spaceView===1} onClick={()=>setSpaceView(1)}>02 <span>넓은 홀</span> <small>35~45평형 예시</small></button>
            </div>
            <figure className="rebrand-space-stage" aria-live="polite"><img src={assetPath(spaceView===0?'/rebrand/interior-18.jpg':'/rebrand/interior-35-45.jpg')} alt={spaceView===0?'좁고 긴 홀과 오른쪽 주방의 18평형 공간 콘셉트':'좌석군과 개방형 주방의 35~45평형 공간 콘셉트'} width="1400" height="900" loading="lazy" /><figcaption><span>{spaceView===0?'18평형':'35~45평형'} 공간 예시</span><span>실제 시공 사진이 아닙니다.</span></figcaption></figure>
            <div className="rebrand-operation"><article><span>포장</span><h3>입구에서 주문과 픽업</h3><p>포장 손님의 주문과 픽업이 이어지는 동선을 계획합니다.</p></article><article><span>홀</span><h3>치킨과 한잔을 놓을 자리</h3><p>좌석 수와 테이블 간격을 점포 면적에 맞춰 검토합니다.</p></article><article><span>배달</span><h3>홀과 포장에 맞춰 운영</h3><p>주방 동선과 매장 운영 방식을 보고 배달 운영을 검토합니다.</p></article></div>
            <p className="rebrand-space-note">배치와 분위기를 보여드리는 예시입니다. 실제 좌석 수, 치수, 설비와 공사비는 점포 실측 후 정합니다.</p>
          </div>
        </section>

        <section className="rebrand-fit rebrand-container" id="rebrand-fit" aria-labelledby="rebrand-fit-title">
          <div className="rebrand-section-heading">
            <span>04 / 창업 준비</span>
            <h2 id="rebrand-fit-title">어디에서,<br />어떤 가게를<br />운영하고 싶으세요?</h2>

          </div>
          <div className="rebrand-fit-list">
            <article><span>01</span><div><h3>희망 지역</h3><p>어느 동네에서 열고 싶은지 알려주세요. 주변 상권과 손님이 오가는 길을 확인합니다.</p></div></article>
            <article><span>02</span><div><h3>점포 조건</h3><p>점포가 있다면 면적과 주방, 설비 상태를 봅니다. 기존 시설을 다시 쓸 수 있는지도 확인합니다.</p></div></article>
            <article><span>03</span><div><h3>운영 방식</h3><p>직접 운영할지, 가족이나 직원과 함께할지 알려주세요. 운영 계획과 예산에 맞는 매장 형태를 검토합니다.</p></div></article>
          </div>
        </section>

        <section className="rebrand-faq rebrand-container" id="rebrand-faq" aria-labelledby="faq-title"><div className="rebrand-section-heading"><span>자주 묻는 질문</span><h2 id="faq-title">상담 전에<br />궁금한 것들.</h2></div><div>
          <details><summary>점포를 구하기 전에도 상담할 수 있나요?</summary><p>네. 희망 지역을 남겨주세요. 아직 점포를 찾는 중이라면 신청서의 ‘남기실 말’에 적어주세요.</p></details>
          <details><summary>기존 가게를 바꿔서 시작할 수 있나요?</summary><p>기존 점포의 면적과 주방, 설비 상태를 확인한 뒤 전환 가능 여부를 검토합니다. 주방 지원안은 전환 점포도 본사 기준에 따른 전체 인테리어 신규 시공과 검수가 필요합니다.</p></details>
          <details><summary>혜택 금액만큼 현금으로 지원받나요?</summary><p>돈으로 받는 지원은 아닙니다. 비용 면제, 현물과 마케팅 지원, 물류대금 차감으로 구성된 안입니다. 항목마다 조건이 다르며, 시행 여부는 본사 확인이 필요합니다.</p></details>
          <details><summary>전체 창업비는 얼마인가요?</summary><p>임대 조건과 면적, 기존 시설과 공사 범위에 따라 달라집니다. 위에 나온 지원 금액은 전체 창업비가 아닙니다. 점포 조건을 보고 항목별 견적을 받아야 합니다.</p></details>
        </div></section>

        <LeadCapture onKakaoClick={onKakaoClick} rebrandCopy hideKakao />
      </main>

      <SiteFooter socialLinks={socialLinks} onPrivacyClick={() => setIsPrivacyOpen(true)} />
      {isPrivacyOpen && <PrivacyPolicyDialog onClose={() => setIsPrivacyOpen(false)} />}
    </div>
  );
};

export default RebrandLanding;
