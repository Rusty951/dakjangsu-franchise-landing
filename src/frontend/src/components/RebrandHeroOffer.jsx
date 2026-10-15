import { useEffect, useRef, useSyncExternalStore } from 'react';
import RebrandRecruitmentMotion from './RebrandRecruitmentMotion';
import SlotNumber from './SlotNumber';
import DesktopRebrandHeroOffer from './DesktopRebrandHeroOffer';
import { supportCalculation as example, formatSupportAmount as format } from '../utils/supportExample.mjs';

const desktopQuery = '(min-width: 1025px)';
const introDuration = 5850;
const characterDelay = 4250;
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
      const offer = root.querySelector('.recruitment-offer-intro').animate([
        { offset: 0, opacity: 1 },
        { offset: 4050 / introDuration, opacity: 1 },
        { offset: characterDelay / introDuration, opacity: 0 },
        { offset: 1, opacity: 0 },
      ], { duration: introDuration, fill: 'both', easing: 'linear' });
      animations.push(offer);
      animations.push(root.querySelector('.recruitment-intro--waiver .recruitment-intro-amount b').animate([
        { offset: 0, transform: 'perspective(600px) rotateY(0deg) scale(1)' },
        { offset: .5, transform: 'perspective(600px) rotateY(180deg) scale(1.06)' },
        { offset: 1, transform: 'perspective(600px) rotateY(360deg) scale(1)' },
      ], { delay: 1050, duration: 1400, fill: 'both', easing: 'cubic-bezier(.4,0,.2,1)' }));
      animations.push(root.querySelector('.recruitment-zero-shine').animate([
        { offset: 0, opacity: 0, backgroundPosition: '100% 50%' },
        { offset: .15, opacity: 1 },
        { offset: .85, opacity: 1 },
        { offset: 1, opacity: 0, backgroundPosition: '0% 50%' },
      ], { delay: 2550, duration: 850, fill: 'both', easing: 'linear' }));
      fadeIn(actor, characterDelay, 350);
      root.querySelectorAll('.recruitment-title > *').forEach(line => fadeIn(line, characterDelay + 50, 350, 8));
      const epoch = document.timeline.currentTime;
      animations.forEach(animation => { animation.startTime = epoch; });
      root.dataset.intro = 'playing';
      offer.onfinish = () => { if (!disposed) root.dataset.intro = 'settled'; };
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
        <div className="recruitment-offer-intro" aria-hidden="true">
            <div className="recruitment-intro recruitment-intro--support">
              <p className="recruitment-intro-label">조건 충족 가정, 2년 합산 계산 예시</p>
              <p className="recruitment-intro-amount"><b><SlotNumber value={format(example.total)} active={active} reducedMotion={reducedMotion} duration={.76} stagger={.08} /></b><span>만원</span></p>
            </div>
            <div className="recruitment-intro recruitment-intro--waiver">
              <p className="recruitment-intro-label">조건 충족 시 면제</p>
              <p className="recruitment-waiver-intro-title">가맹비, 교육비<br />첫 2년 로열티</p>
              <p className="recruitment-intro-amount"><b><SlotNumber value="0" active={false} reducedMotion /><span className="recruitment-zero-shine" aria-hidden="true">0</span></b><span>원</span></p>
            </div>
        </div>
        <div className="recruitment-visual-stage">
          <figure className="recruitment-character">
            <RebrandRecruitmentMotion active={active} reducedMotion={reducedMotion} delay={characterDelay} duration={1200} />
          </figure>
        </div>
        <h1 className="recruitment-title" tabIndex={-1} aria-label="닭장수가 장사에 진심인 사장님을 원합니다.">
          <span>닭장수가</span>
          <strong>장사에 진심인</strong>
          <span>사장님을 원합니다.</span>
        </h1>
      </div>
    </div>
  );
}

export default function RebrandHeroOffer(props) {
  const desktop = useSyncExternalStore(subscribeViewport, isDesktopViewport, () => true);
  return props.portrait && !desktop ? <MobileRebrandHeroOffer {...props} /> : <DesktopRebrandHeroOffer {...props} />;
}
