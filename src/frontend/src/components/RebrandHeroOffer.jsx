import { heroGestureStill } from '../utils/heroGesture';
import { supportCalculation as example, formatSupportAmount as format } from '../utils/supportExample.mjs';

export default function RebrandHeroOffer({ onExplore, portrait = false }) {
  return (
    <div className="offer-overview">
      <div className="offer-overview-copy">
        <header className="offer-overview-heading">
          <p className="offer-eyebrow">닭장수후라이드 창업 지원안</p>
          <h1 tabIndex={-1}>문을 여는 준비부터,<br />장사를 이어가는 힘까지.</h1>
        </header>
        <section className="offer-summary" aria-label="조건부 지원 합산 계산 예시">
          <p className="offer-summary-label">2년간 조건 충족 시, 합산 예시</p>
          <strong className="offer-summary-amount">{format(example.total)}<small>만원 상당</small></strong>
          <dl className="offer-components" aria-label="지원 금액 구성">
            <div><dt>오픈 지원</dt><dd>{format(example.opening)}<small>만원 상당</small></dd></div>
            <div><dt>주방 지원</dt><dd>{format(example.kitchen)}<small>만원 상당</small></dd></div>
            <div><dt>조건부 물류 크레딧</dt><dd>{format(example.logistics)}<small>만원</small></dd></div>
          </dl>
          <p className="offer-sales-basis">계산 가정: 첫 12개월 월매출 3,000만원, 다음 12개월 월매출 4,000만원.<br />물류 크레딧 월 30만원 × 12개월 + 월 100만원 × 12개월.</p>
          <p className="offer-summary-note">현금 지급액이 아닙니다. 오픈과 주방 지원 조건 충족을 가정하며, 물류 지원 기간과 혜택 적용 조건은 확인 중입니다.</p>
        </section>
        <p className="offer-separate-note">가맹비와 교육비 면제 440만원은 오픈 지원에 포함됩니다.<br />로열티 면제는 별도 혜택으로 안내하며 합산에서 제외했습니다. 임대, 인테리어 등은 별도 비용입니다.</p>
        <button className="offer-next" type="button" onClick={onExplore}>새로운 닭장수 이야기 <span aria-hidden="true">↓</span></button>
      </div>
      {portrait && <div className="portrait-character-slot offer-character-slot" data-character-scene="0" aria-hidden="true"><img src={heroGestureStill} alt="" width="1254" height="1254" /></div>}
    </div>
  );
}
