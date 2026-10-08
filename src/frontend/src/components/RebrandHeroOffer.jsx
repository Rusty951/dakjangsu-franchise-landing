import RebrandRecruitmentMotion from './RebrandRecruitmentMotion';
import { supportCalculation as example, formatSupportAmount as format } from '../utils/supportExample.mjs';

export default function RebrandHeroOffer({ portrait = false, active = false, reducedMotion = false }) {
  const parts = (
    <dl className="recruitment-parts">
      <div><dt>오픈 지원</dt><dd>{format(example.opening)}<small>만원 상당</small></dd></div>
      <div><dt>주방 지원</dt><dd>{format(example.kitchen)}<small>만원 상당</small></dd></div>
      <div><dt>물류 지원</dt><dd>{format(example.logistics)}<small>만원</small></dd></div>
    </dl>
  );
  return (
    <div className="recruitment-hero" data-portrait={portrait}>
      <div className="recruitment-first-screen">
        <figure className="recruitment-character">
          <RebrandRecruitmentMotion active={active} reducedMotion={reducedMotion} />
        </figure>
        <h1 className="recruitment-title" tabIndex={-1}>
          <span>새로운 닭장수가</span>
          <strong>당신을 원합니다.</strong>
        </h1>
        <section className="recruitment-support" aria-label="조건 충족 가정, 2년 합산 지원 계산 예시">
          <p className="recruitment-support-label">조건 충족 가정, 2년 합산 계산 예시</p>
          <p className="recruitment-amount"><b>{format(example.total)}</b><span>만원 상당</span></p>
          {!portrait && parts}
        </section>
      </div>
      <div className="recruitment-notes">
        {portrait && parts}
        <p>월매출 가정: 첫 12개월 3,000만원,<br />다음 12개월 4,000만원.</p>
        <p>지원 조건과 기간 확인 중<br />현금 지급액 아님</p>
      </div>
      <section className="recruitment-zero" aria-label="가맹비와 교육비, 첫 2년 로열티 면제 조건">
        <p className="recruitment-support-label">조건 충족 시 면제</p>
        <h2>가맹비, 교육비<br />첫 2년 로열티</h2>
        <p className="recruitment-amount"><b>0</b><span>원</span></p>
        <p className="recruitment-waiver">가맹비와 교육비 440만원은 오픈 지원에 포함.<br />로열티 면제는 합산 금액에서 제외.</p>
        <p className="recruitment-scope">전체 창업비 0원 아님<br /><span>임대, 인테리어 등 별도</span></p>
      </section>
    </div>
  );
}
