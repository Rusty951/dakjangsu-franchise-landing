import { useEffect, useRef } from 'react';
import RebrandRecruitmentMotion from './RebrandRecruitmentMotion';
import SlotNumber from './SlotNumber';
import { supportCalculation as example, formatSupportAmount as format } from '../utils/supportExample.mjs';

export default function RebrandHeroOffer({ portrait = false, active = false, reducedMotion = false }) {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    const story = root.closest('.jangsu-story');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, onScreen = true, animations = [];
    if (!active || reducedMotion || preference.matches) {
      root.dataset.intro = 'static';
      return;
    }
    root.dataset.intro = 'loading';
    const sync = () => {
      const paused = !onScreen || document.hidden || story?.dataset.motionPaused === 'true';
      root.dataset.paused = String(paused);
      animations.forEach(animation => {
        if (paused && animation.playState === 'running') animation.pause();
        else if (!paused && animation.playState === 'paused') animation.play();
      });
    };
    const visibility = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    visibility.observe(root.querySelector('.recruitment-character'));
    const changes = new MutationObserver(sync);
    if (story) changes.observe(story, { attributes: true, attributeFilter: ['data-motion-paused'] });
    document.addEventListener('visibilitychange', sync);
    const fadeIn = (element, delay, duration = 350, rise = 0) => {
      animations.push(element.animate([
        { opacity: 0, transform: `translateY(${rise}px)` },
        { opacity: 1, transform: 'translateY(0)' },
      ], { delay, duration, fill: 'both', easing: 'cubic-bezier(.16,1,.3,1)' }));
    };
    Promise.all([...root.querySelectorAll('.recruitment-motion img')].map(image => image.decode())).then(() => {
      if (disposed) return;
      const intro = root.querySelector('.recruitment-intro');
      const actor = root.querySelector('.recruitment-character');
      const rootBox = root.getBoundingClientRect();
      const actorBox = actor.getBoundingClientRect();
      intro.style.left = `${actorBox.left + actorBox.width / 2 - rootBox.left}px`;
      intro.style.top = `${actorBox.top + actorBox.height / 2 - rootBox.top}px`;
      const number = intro.animate([
        { offset: 0, opacity: 1 },
        { offset: 1450 / 3000, opacity: 1 },
        { offset: 1850 / 3000, opacity: 0 },
        { offset: 1, opacity: 0 },
      ], { duration: 3000, fill: 'both', easing: 'ease-in-out' });
      animations.push(number);
      fadeIn(actor, 1600, 350);
      fadeIn(root.querySelector('.recruitment-title'), 2050, 350, 10);
      fadeIn(root.querySelector('.recruitment-support'), 1600, 250);
      fadeIn(root.querySelector('.recruitment-notes'), 1850);
      fadeIn(root.querySelector('.recruitment-zero'), 1850);
      const epoch = document.timeline.currentTime;
      animations.forEach(animation => { animation.startTime = epoch; });
      root.dataset.intro = 'playing';
      number.onfinish = () => { if (!disposed) root.dataset.intro = 'settled'; };
      sync();
    }).catch(() => { if (!disposed) root.dataset.intro = 'static'; });
    return () => {
      disposed = true;
      animations.forEach(animation => animation.cancel());
      visibility.disconnect(); changes.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [active, reducedMotion]);
  const parts = (
    <dl className="recruitment-parts">
      <div><dt>오픈 지원</dt><dd>{format(example.opening)}<small>만원 상당</small></dd></div>
      <div><dt>주방 지원</dt><dd>{format(example.kitchen)}<small>만원 상당</small></dd></div>
      <div><dt>물류 지원</dt><dd>{format(example.logistics)}<small>만원</small></dd></div>
    </dl>
  );
  return (
    <div className="recruitment-hero" ref={rootRef} data-portrait={portrait} data-intro="loading">
      <div className="recruitment-intro" aria-hidden="true">
        <p className="recruitment-intro-label">조건 충족 가정, 2년 합산 계산 예시</p>
        <p className="recruitment-intro-amount"><b><SlotNumber value={format(example.total)} active={active} reducedMotion={reducedMotion} duration={.76} stagger={.08} /></b><span>만원 상당</span></p>
      </div>
      <div className="recruitment-first-screen">
        <figure className="recruitment-character">
          <RebrandRecruitmentMotion active={active} reducedMotion={reducedMotion} delay={1650} duration={1200} />
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
