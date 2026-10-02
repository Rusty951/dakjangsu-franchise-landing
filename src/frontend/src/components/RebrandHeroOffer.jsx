// Review-only scenario: these sales are an assumption, never a store result.
const example = {
  monthlySales: 2500,
  royaltyRate: 0.033,
  royaltyMonths: 24,
  opening: 740,
  kitchen: 500,
  creditMonths: 12,
};
const royalty = example.monthlySales * example.royaltyRate * example.royaltyMonths;
// Apply the proposal's sales thresholds to this example, not the maximum credit.
const monthlyCredit = example.monthlySales >= 4000 ? 100 : example.monthlySales >= 3000 ? 30 : 0;
const credit = monthlyCredit * example.creditMonths;
const total = example.opening + example.kitchen + credit + royalty;
const roundedTotal = Math.round(total / 1000) * 1000;
const format = value => new Intl.NumberFormat('ko-KR').format(value);

import { assetPath } from '../assetPath';

export default function RebrandHeroOffer({ onExplore, portrait = false }) {
  return (
    <div className="hero-offer">
      <header className="hero-offer-heading">
        <p className="hero-offer-status"><b>검토용 지원안</b><span>본사 확인 전 초안</span></p>
        <h1>사장님, <span>지원 내용을 하나씩 볼까요?</span></h1>
        <p className="hero-offer-assumption">
          월매출 <b>{format(example.monthlySales)}만원 × {example.royaltyMonths}개월</b> 유지{portrait ? <><br />오픈과 주방 조건 충족 가정</> : ', 오픈과 주방 조건 충족 가정'}
        </p>
      </header>

      <section className="hero-offer-total" aria-label="조건부 혜택 합산 계산 예시">
        <p className="hero-offer-label"><span>2년 합산 계산 예시</span><b>조건 충족 가정, 약</b>{portrait && <span className="hero-offer-noncash">현금 지급액 아님</span>}</p>
        <strong className="hero-offer-amount"><b className="hero-offer-numeral">{format(roundedTotal)}</b><small>만원 상당</small></strong>
        {portrait && <div className="portrait-character-slot" aria-hidden="true"><img src={assetPath('/rebrand/poses/hero-presentation-v1/01-neutral.png')} alt="" width="1122" height="1402" /></div>}
        <p className="hero-offer-calculated"><span>계산값 {format(total)}만원</span><span>매출 가정 포함</span>{!portrait && <span>현금 지급액 아님</span>}</p>
      </section>

      <section className="hero-offer-zero" aria-label="가맹비와 교육비 면제안">
        <p className="hero-offer-label"><span>440만원 면제안</span><b>가맹비, 교육비</b></p>
        <strong className="hero-offer-amount"><b className="hero-offer-numeral">0</b><small>원</small></strong>
        <p className="hero-offer-scope">전체 창업비 0원 아님<br /><span>임대, 인테리어 등 별도</span></p>
      </section>

      <div className="hero-offer-bottom">
        <p className="hero-offer-breakdown">
          <span>오픈 {example.opening} + 주방 {example.kitchen} + 물류 {format(credit)} + 로열티 {format(royalty)}만원</span>
          <span>주방: 조건 충족, 선착순 5개점 / 물류: 이 예시는 월매출 3,000만원 미만이라 제외</span>
          <span>혜택 시행 여부와 최종 조건은 본사에서 확인해 주세요.</span>
        </p>
        <button type="button" onClick={onExplore}>지원 항목 살펴보기 <span aria-hidden="true">↓</span></button>
      </div>
    </div>
  );
}
