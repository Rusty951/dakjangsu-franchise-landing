import { heroGestureStill } from '../utils/heroGesture';
import { supportCalculation as example, formatSupportAmount as format } from '../utils/supportExample.mjs';

export default function RebrandHeroOffer({ onExplore, portrait = false }) {
  return (
    <div className="hero-offer">
      <header className="hero-offer-heading">
        <h1 tabIndex={-1}>사장님, <span>시작부터 부담을 덜어드릴게요.</span></h1>
        <p className="hero-offer-intro">가맹비와 교육비, 주방 설비부터<br />매출 기준에 따른 물류 지원까지.</p>
      </header>

      <section className="hero-offer-total" aria-label="조건부 혜택 합산 계산 예시">
        <p className="hero-offer-label"><span>2년 합산 계산 예시</span><b>조건 충족 가정</b>{portrait && <span className="hero-offer-noncash">현금 지급액 아님</span>}</p>
        <strong className="hero-offer-amount"><b className="hero-offer-numeral">{format(example.total)}</b><small>만원 상당</small></strong>
        <dl className="hero-offer-parts" aria-label="지원 금액 구성">
          <div><dt>오픈 지원</dt><dd>{format(example.opening)}<small>만원 상당</small></dd></div>
          <div><dt>주방 지원</dt><dd>{format(example.kitchen)}<small>만원 상당</small></dd></div>
          <div><dt>조건부 물류</dt><dd>{format(example.logistics)}<small>만원</small></dd></div>
        </dl>
        <p className="hero-offer-basis">매출 가정: 첫 12개월 월 3,000만원,<br />다음 12개월 월 4,000만원.<br />물류 월 30만원 × 12개월 + 월 100만원 × 12개월.</p>
        <p className="hero-offer-calculated"><span>지원 조건과 기간 확인 중</span>{!portrait && <span>현금 지급액 아님</span>}</p>
        {portrait && <div className="portrait-character-slot" data-character-scene="0" aria-hidden="true"><img src={heroGestureStill} alt="" width="1254" height="1254" /></div>}
      </section>

      <section className="hero-offer-zero" aria-label="가맹비와 교육비 면제 조건">
        <p className="hero-offer-label"><span>440만원 면제 조건</span><b>가맹비, 교육비</b></p>
        <strong className="hero-offer-amount"><b className="hero-offer-numeral">0</b><small>원</small></strong>
        <p className="hero-offer-scope">전체 창업비 0원 아님<br /><span>임대, 인테리어 등 별도</span></p>
      </section>

      <div className="hero-offer-bottom">
        <p className="hero-offer-breakdown">
          <span>오픈 740만원에 가맹비와 교육비 면제 440만원 포함.</span>
          <span>로열티 면제는 별도 혜택으로 합산에서 제외.</span>
          <span>오픈과 주방 조건 충족 가정, 실제 지원 기간과 조건 확인 중.</span>
        </p>
        <button className="hero-offer-explore" type="button" onClick={onExplore}>
          <span>새로운 닭장수 이야기 <span className="hero-offer-explore-icon" aria-hidden="true" /></span>
        </button>
      </div>
    </div>
  );
}
