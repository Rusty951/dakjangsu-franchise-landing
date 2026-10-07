import { heroGestureStill } from '../utils/heroGesture';
import { supportCalculation as example, formatSupportAmount as format } from '../utils/supportExample.mjs';

export default function RebrandHeroOffer({ onExplore, portrait = false }) {
  return (
    <div className="hero-offer">
      <header className="hero-offer-heading">
        <h1 tabIndex={-1}>사장님, <span>시작부터 부담을 덜어드릴게요.</span></h1>
      </header>

      <section className="hero-offer-total" aria-label="조건부 혜택 합산 계산 예시">
        <p className="hero-offer-label"><span>조건 충족 가정</span><b>2년 합산 계산 예시</b></p>
        <strong className="hero-offer-amount"><b className="hero-offer-numeral">{format(example.total)}</b><small>만원 상당</small></strong>
        <dl className="hero-offer-parts" aria-label="지원 금액 구성">
          <div><dt>오픈 지원</dt><dd>{format(example.opening)}<small>만원 상당</small></dd></div>
          <div><dt>주방 지원</dt><dd>{format(example.kitchen)}<small>만원 상당</small></dd></div>
          <div><dt>조건부 물류</dt><dd>{format(example.logistics)}<small>만원</small></dd></div>
        </dl>
        <p className="hero-offer-basis">월매출 가정: 첫 12개월 3,000만원,<br />다음 12개월 4,000만원.</p>
        {portrait && <p className="hero-offer-calculated"><span>지원 조건과 기간 확인 중</span><span>현금 지급액 아님</span></p>}
        {portrait && <div className="portrait-character-slot" data-character-scene="0" aria-hidden="true"><img src={heroGestureStill} alt="" width="1254" height="1254" /></div>}
      </section>

      <section className="hero-offer-zero" aria-label="가맹비와 교육비, 첫 2년 로열티 면제 조건">
        <p className="hero-offer-label"><span>조건 충족 시 면제</span><b><span>가맹비, 교육비</span><span>첫 2년 로열티</span></b></p>
        <strong className="hero-offer-amount"><b className="hero-offer-numeral">0</b><small>원</small></strong>
        <p className="hero-offer-waiver-details"><span>가맹비와 교육비 440만원은 오픈 지원에 포함.</span><span>로열티 면제는 합산 금액에서 제외.</span></p>
        <p className="hero-offer-scope">전체 창업비 0원 아님<br /><span>임대, 인테리어 등 별도</span></p>
      </section>

      <div className="hero-offer-bottom">
        {!portrait && <p className="hero-offer-calculated"><span>지원 조건과 기간 확인 중</span><span>현금 지급액 아님</span></p>}
        <button className="hero-offer-explore" type="button" onClick={onExplore}>
          <span>새로운 닭장수 이야기 <span className="hero-offer-explore-icon" aria-hidden="true" /></span>
        </button>
      </div>
    </div>
  );
}
