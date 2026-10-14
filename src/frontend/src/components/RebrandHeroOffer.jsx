import { useEffect, useRef, useSyncExternalStore } from 'react';
import RebrandRecruitmentMotion from './RebrandRecruitmentMotion';
import SlotNumber from './SlotNumber';
import DesktopRebrandHeroOffer from './DesktopRebrandHeroOffer';
import { supportCalculation as example, formatSupportAmount as format } from '../utils/supportExample.mjs';

const desktopQuery = '(min-width: 1025px)';
const isDesktopViewport = () => window.matchMedia(desktopQuery).matches;
const subscribeViewport = onChange => {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

function MobileRebrandHeroOffer({ portrait = true, active = false, reducedMotion = false }) {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    const story = root.closest('.jangsu-story');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, onScreen = true, animations = [];
    if (reducedMotion || preference.matches) {
      root.dataset.intro = 'static';
      return;
    }
    if (!active) {
      root.dataset.intro = 'parked';
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
      const actor = root.querySelector('.recruitment-character');
      animations.push(root.querySelector('.recruitment-intro--support').animate([
        { offset: 0, opacity: 1 },
        { offset: 1750 / 4750, opacity: 1 },
        { offset: 1900 / 4750, opacity: 0 },
        { offset: 1, opacity: 0 },
      ], { duration: 4750, fill: 'both', easing: 'linear' }));
      const waiver = root.querySelector('.recruitment-intro--waiver');
      const zero = waiver.animate([
        { offset: 0, opacity: 0 },
        { offset: 1850 / 4750, opacity: 0 },
        { offset: 2100 / 4750, opacity: 1 },
        { offset: 2950 / 4750, opacity: 1 },
        { offset: 3150 / 4750, opacity: 0 },
        { offset: 1, opacity: 0 },
      ], { duration: 4750, fill: 'both', easing: 'linear' });
      animations.push(zero);
      fadeIn(actor, 3150, 350);
      fadeIn(root.querySelector('.recruitment-title span'), 3200, 350, 8);
      // The final pointing pose starts at 3150 + .72 * 1200 ms.
      fadeIn(root.querySelector('.recruitment-title strong'), 4020, 400, 8);
      const epoch = document.timeline.currentTime;
      animations.forEach(animation => { animation.startTime = epoch; });
      root.dataset.intro = 'playing';
      zero.onfinish = () => { if (!disposed) root.dataset.intro = 'settled'; };
      sync();
    }).catch(() => { if (!disposed) root.dataset.intro = 'static'; });
    return () => {
      disposed = true;
      animations.forEach(animation => animation.cancel());
      visibility.disconnect(); changes.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [active, reducedMotion]);
  return (
    <div className="recruitment-hero" ref={rootRef} data-portrait={portrait} data-mobile-intro="true" data-intro="loading">
      <div className="recruitment-first-screen">
        <div className="recruitment-visual-stage">
          <div className="recruitment-intro recruitment-intro--support" aria-hidden="true">
            <p className="recruitment-intro-label">조건 충족 가정, 2년 합산 계산 예시</p>
            <p className="recruitment-intro-amount"><b><SlotNumber value={format(example.total)} active={active} reducedMotion={reducedMotion} duration={.76} stagger={.08} /></b><span>만원</span></p>
          </div>
          <div className="recruitment-intro recruitment-intro--waiver" aria-hidden="true">
            <p className="recruitment-intro-label">조건 충족 시 면제</p>
            <p className="recruitment-waiver-intro-title">가맹비, 교육비<br />첫 2년 로열티</p>
            <p className="recruitment-intro-amount"><b><SlotNumber value="0" active={false} reducedMotion /></b><span>원</span></p>
          </div>
          <figure className="recruitment-character">
            <RebrandRecruitmentMotion active={active} reducedMotion={reducedMotion} delay={3150} duration={1200} />
          </figure>
        </div>
        <h1 className="recruitment-title" tabIndex={-1}>
          <span>새로운 닭장수가</span>
          <strong>당신을 원합니다.</strong>
        </h1>
      </div>
    </div>
  );
}

export default function RebrandHeroOffer(props) {
  const desktop = useSyncExternalStore(subscribeViewport, isDesktopViewport, () => true);
  return props.portrait && !desktop ? <MobileRebrandHeroOffer {...props} /> : <DesktopRebrandHeroOffer {...props} />;
}
