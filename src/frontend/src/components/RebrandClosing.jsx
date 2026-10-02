import { assetPath } from '../assetPath';
import './RebrandClosing.css';

const menuItems = [
  ['fried-chicken', '후라이드치킨', '기본부터 바삭하게'],
  ['half-half-chicken', '반반치킨', '두 가지 맛을 한 접시에'],
  ['garlic-pepper-chicken', '마늘후추치킨', '마늘과 후추로 더한 풍미'],
];

const questions = [
  ['점포를 구하기 전에도 상담할 수 있나요?', '네. 희망 지역을 남겨주세요. 아직 점포를 찾는 중이라면 신청서의 ‘남기실 말’에 적어주세요.'],
  ['기존 가게를 바꿔서 시작할 수 있나요?', '점포의 면적과 주방, 설비 상태를 보고 전환 가능 여부를 검토합니다. 주방 지원안은 전환 점포도 전체 인테리어 신규 시공과 본사 검수가 필요합니다.'],
  ['전체 창업비는 얼마인가요?', '임대 조건과 면적, 기존 시설과 공사 범위에 따라 달라집니다. 위에 나온 지원 금액은 전체 창업비나 현금 지급액이 아닙니다. 점포 조건을 보고 항목별 견적을 받아야 합니다.'],
];

export default function RebrandClosing({ conditionsRef }) {
  return <>
    <section className="rebrand-menu-story" id="rebrand-menu" aria-labelledby="menu-title">
      <div className="rebrand-menu-story-intro">
        <div className="rebrand-menu-story-copy">
          <p className="rebrand-closing-label">닭장수후라이드 / 대표 메뉴</p>
          <h2 id="menu-title"><span>치킨집이니까,</span>맛부터<br />보시죠.</h2>
          <p className="rebrand-menu-story-description">특제 파우더로 튀긴 후라이드.<br />반반과 마늘후추치킨도 함께 준비했습니다.</p>
        </div>
        <figure className="rebrand-menu-story-photo">
          <img src={assetPath('/images/dakjangsu-product-showcase-real.jpg')} alt="매장 진열대에 준비된 닭장수 후라이드 치킨" width="2400" height="1600" loading="lazy" />
        </figure>
      </div>
      <ul className="rebrand-menu-lineup" aria-label="대표 메뉴 세 가지">
        {menuItems.map(([image, name, description], index) => <li key={image}>
          <img src={assetPath(`/images/menu-showcase/${image}.webp`)} alt={name} width="520" height="360" loading="lazy" />
          <div><span className="rebrand-menu-order" aria-hidden="true">0{index + 1}</span><h3>{name}</h3><p>{description}</p></div>
        </li>)}
      </ul>
    </section>

    <section className="rebrand-closing-faq" id="rebrand-faq" aria-labelledby="faq-title">
      <div className="rebrand-closing-faq-grid">
        <header><p className="rebrand-closing-label">자주 묻는 질문</p><h2 id="faq-title">상담 전에,<br />세 가지만.</h2></header>
        <div className="rebrand-closing-questions">
          {questions.map(([question, answer], index) => <details key={question}>
            <summary><span aria-hidden="true">0{index + 1}</span><strong>{question}</strong></summary>
            <p>{answer}</p>
          </details>)}
        </div>
      </div>
      <details ref={conditionsRef} className="rebrand-support-terms" id="rebrand-benefits">
        <summary><span>지원 조건과 유의사항</span><small>본사 확인 전 초안</small></summary>
        <div className="rebrand-support-content">
          <p className="rebrand-support-status">2026년 8월에 정리한 신규 10개점 대상 지원 초안입니다. 시행 여부와 남은 모집 수량, 최종 적용 조건은 본사 상담에서 확인해 주세요.</p>
          <h3>지원안 요약</h3>
          <dl>
            <div><dt>오픈 패키지 740만원 상당</dt><dd>가맹비 275만원과 교육비 165만원 면제(합계 440만원, 부가세 포함), 오픈행사 생닭 200수 100만원 상당, 지역 커뮤니티와 블로그 체험단 등 오픈 마케팅 200만원 상당으로 구성된 안입니다.</dd></div>
            <div><dt>주방 설비 500만원 상당</dt><dd>간냉식 냉장고 300만원 상당과 최신형 튀김기 200만원 상당. 조건을 충족한 매장 중 선착순 5개점 대상안입니다.</dd></div>
            <div><dt>첫 2년 로열티 면제안</dt><dd>최초 가맹계약 2년간 월 매출액 3.3%인 정상 로열티를 면제하는 안입니다. 실제 면제액은 매장 매출에 따라 달라집니다.</dd></div>
            <div><dt>물류 크레딧 지원안</dt><dd>월 매출 3,000만원 이상이면 30만원, 4,000만원 이상이면 100만원. 개점월부터 12개월 내 기준을 달성한 월에 적용하며, 다음 달 물류대금에서 차감합니다.</dd></div>
          </dl>
          <h3>주방 패키지 지원 조건</h3>
          <ul>
            <li>반경 500m 내 아파트 3,000세대 이상인 도보 생활 상권. 초등학교, 중학교와 학원가 인접 단지 우대.</li>
            <li>전용면적 15평 이상이며 홀, 포장, 배달을 함께 운영하는 매장. 배달 전용 매장은 제외.</li>
            <li>본사 표준 사양에 따른 전체 인테리어 신규 시공과 본사 검수 완료. 기존 점포 전환에도 동일 적용하며 간판 교체나 부분 보수만으로는 해당하지 않음.</li>
            <li>지원일부터 24개월 의무 운영. 가맹점 사유로 조기 종료하면 잔여 기간에 비례해 지원액 환수.</li>
          </ul>
          <h3>운영 지원과 금액 안내</h3>
          <ul>
            <li>물류 크레딧 매출 기준은 부가세를 포함한 POS와 배달앱 정산 매출 합산. 매출 증빙 제출 필요.</li>
            <li>비용 면제, 현물과 마케팅 지원, 물류대금 차감으로 구성된 안이며 현금 지급이 아님. ‘상당’ 금액은 공급가 기준이며, 항목마다 조건이 달라 모두에게 같은 금액이 적용되는 것은 아님.</li>
            <li>프로모션 기간, 적용 대상과 최종 혜택은 본사 확인 및 가맹계약서와 특약서 기준.</li>
          </ul>
          <p className="rebrand-support-extra">초안에 적힌 기타 비용: 계약이행보증금 0원, 가맹금 예치금 0원, 재계약비 0원.</p>
        </div>
      </details>
    </section>
  </>;
}
