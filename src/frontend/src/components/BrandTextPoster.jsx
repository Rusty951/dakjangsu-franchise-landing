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
    const animations = [...root.querySelectorAll('.brand-text-line')].map((line, index) => line.animate([
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 450, delay: index * 100, fill: 'both', easing: 'cubic-bezier(.16,1,.3,1)' }));
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
      <p className="brand-text-conditions">매장 디자인과 지원안은 준비 중입니다.<br />적용 가능한 혜택은 점포 조건을 확인한 뒤 안내합니다.</p>
    </div>
  );
}

export default function BrandTextPoster({ portrait, children, ...props }) {
  const desktop = useSyncExternalStore(subscribeViewport, () => window.matchMedia(desktopQuery).matches, () => true);
  return portrait && !desktop ? <TextPoster {...props} /> : children;
}
