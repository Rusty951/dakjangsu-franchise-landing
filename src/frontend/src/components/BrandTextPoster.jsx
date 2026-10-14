import { useEffect, useRef, useSyncExternalStore } from 'react';
import './BrandTextPoster.css';

const desktopQuery = '(min-width: 1025px)';
const subscribeViewport = notify => {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};

function TextPoster({ active, reducedMotion }) {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!active || reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const story = root.closest('.jangsu-story');
    const cues = [
      {
        selector: '.brand-text-line:first-child', duration: 900, delay: 0,
        frames: [
          { opacity: 0, transform: 'translateX(-28px)', clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, transform: 'translateX(0)', clipPath: 'inset(0 0% 0 0)' },
        ],
      },
      {
        selector: '.brand-text-emphasis', duration: 1000, delay: 1150,
        frames: [
          { opacity: 0, transform: 'scale(1.1) rotate(-1deg)', offset: 0 },
          { opacity: 1, transform: 'scale(.99) rotate(.2deg)', offset: .6 },
          { opacity: 1, transform: 'scale(1.01) rotate(0)', offset: .82 },
          { opacity: 1, transform: 'scale(1) rotate(0)', offset: 1 },
        ],
      },
      {
        selector: '.brand-text-close', duration: 900, delay: 2350,
        frames: [
          { opacity: 0, transform: 'translateY(26px)', clipPath: 'inset(0 0 100% 0)' },
          { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0% 0)' },
        ],
      },
      {
        selector: '.brand-text-support', duration: 700, delay: 3250,
        frames: [
          { opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
      },
    ];
    const animations = cues.map(({ selector, frames, duration, delay }) => root.querySelector(selector).animate(
      frames, { duration, delay, fill: 'both', easing: 'cubic-bezier(.22,.7,.3,1)' },
    ));
    let onScreen = true;
    const sync = () => {
      const paused = !onScreen || document.hidden || story?.dataset.motionPaused === 'true';
      animations.forEach(animation => {
        if (paused && animation.playState === 'running') animation.pause();
        else if (!paused && animation.playState === 'paused') animation.play();
      });
    };
    const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    observer.observe(root);
    const changes = new MutationObserver(sync);
    if (story) changes.observe(story, { attributes: true, attributeFilter: ['data-motion-paused'] });
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      animations.forEach(animation => animation.cancel());
      observer.disconnect(); changes.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [active, reducedMotion]);
  return (
    <div className="benefit-scene-copy brand-text-poster" ref={rootRef}>
      <p className="brand-text-index">02 / 새로운 닭장수</p>
      <p className="brand-text-name">새롭게 시작하는 닭장수후라이드.</p>
      <h2 tabIndex={-1} aria-label="함께, 제대로 장사해 봅시다.">
        <span className="brand-text-line">함께,</span>
        <span className="brand-text-line brand-text-emphasis">제대로</span>
        <span className="brand-text-line brand-text-close">장사해 봅시다.</span>
      </h2>
      <p className="brand-text-support">새 출발을 위한<br /><strong>창업 지원을 준비했습니다.</strong></p>
    </div>
  );
}

export default function BrandTextPoster({ portrait, children, ...props }) {
  const desktop = useSyncExternalStore(subscribeViewport, () => window.matchMedia(desktopQuery).matches, () => true);
  return portrait && !desktop ? <TextPoster {...props} /> : children;
}
