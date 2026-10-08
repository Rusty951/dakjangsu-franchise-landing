import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import { chapterMotions } from '../utils/chapterMotion.mjs';

export default function JangsuChapterMotion({ scene, onSettled }) {
  const rootRef = useRef(null);
  const motion = chapterMotions[scene];
  useEffect(() => {
    const root = rootRef.current, image = root.querySelector('img');
    const story = root.closest('.jangsu-story'), stage = root.closest('.jangsu-stage');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, loaded = false, onScreen = true, actorOnScreen = false, actorAnimation, animations = [];
    const animate = (element, frames, options = {}) => {
      if (!element) return;
      const animation = element.animate(frames, { duration: motion.duration, fill: 'both', easing: 'cubic-bezier(.16,1,.3,1)', ...options });
      animations.push(animation);
      return animation;
    };
    const start = () => {
      animate(root, motion.frames);
      if (scene === 'brand') {
        // One small acknowledgement, with the feet anchored, then stillness.
        actorAnimation = animate(image, [
          { transform: 'rotate(0deg) scaleY(1)' },
          { transform: 'rotate(0deg) scaleY(1)', offset: .18 },
          { transform: 'rotate(1.6deg) scaleY(.975)', offset: .48 },
          { transform: 'rotate(0deg) scaleY(1)', offset: .85 },
          { transform: 'rotate(0deg) scaleY(1)' },
        ], { duration: 1800, delay: 160, easing: 'ease-in-out' });
        stage.querySelectorAll('.brand-story-headline > span').forEach((line, index) => {
          animate(line, [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], { duration: 720, delay: index * 280 });
        });
        animate(stage.querySelector('.brand-story-underline'), [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 560, delay: 760 });
        animate(stage.querySelector('.brand-story-reason'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 1000 });
        animate(stage.querySelector('.brand-story-rail'), [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 400, delay: 920 });
      }
      if (scene === 2) stage.querySelectorAll('.opening-package-card').forEach((card, index) => {
        animate(card, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 420, delay: 140 + index * 140 });
      });
      if (scene === 4) animate(stage.querySelector('.benefit-scene--royalty h2 > strong'),
        [{ transform: 'scale(1)' }, { transform: 'scale(1.06)', offset: .4 }, { transform: 'scale(1)' }],
        { duration: 600, delay: 250, easing: 'ease-in-out' });
      if (scene === 6) animate(stage.querySelector('.jangsu-invite-copy > a'),
        [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 400, delay: 350 });
      const epoch = document.timeline.currentTime;
      animations.forEach(animation => { animation.startTime = epoch; });
      root.dataset.phase = 'playing';
      Promise.all(animations.map(animation => animation.finished)).then(() => {
        if (!disposed) {
          root.dataset.phase = 'settled';
          onSettled?.(scene + 1);
        }
      }).catch(() => {});
    };
    const sync = () => {
      if (disposed || !loaded) return;
      if (preference.matches) {
        animations.forEach(animation => animation.cancel()); animations = [];
        root.dataset.phase = 'static'; return;
      }
      if (!animations.length) start();
      const paused = document.hidden || !onScreen || story?.dataset.motionPaused === 'true';
      root.dataset.paused = String(paused);
      animations.forEach(animation => {
        const animationPaused = paused || (animation === actorAnimation && !actorOnScreen);
        if (animation === actorAnimation) root.dataset.actorPaused = String(animationPaused);
        if (animationPaused && animation.playState === 'running') animation.pause();
        else if (!animationPaused && animation.playState === 'paused') animation.play();
      });
    };
    const visibility = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    // The brand story sits above its character on mobile, so either part being
    // visible must allow the text sequence to play.
    visibility.observe(scene === 'brand' ? stage.querySelector('.jangsu-panel--brand') : root);
    // On mobile the character follows the copy. Save its gesture until it is visible.
    const actorVisibility = scene === 'brand' ? new IntersectionObserver(([entry]) => {
      actorOnScreen = entry.intersectionRatio >= .25; sync();
    }, { threshold: [0, .25] }) : null;
    actorVisibility?.observe(root);
    const changes = new MutationObserver(sync);
    if (story) changes.observe(story, { attributes: true, attributeFilter: ['data-motion-paused'] });
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    image.decode().then(() => { loaded = true; sync(); }).catch(() => { if (!disposed) root.dataset.phase = 'static'; });
    return () => {
      disposed = true; animations.forEach(animation => animation.cancel());
      visibility.disconnect(); actorVisibility?.disconnect(); changes.disconnect();
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', sync);
    };
  }, [scene, motion, onSettled]);
  return <div className="jangsu-chapter-motion" data-chapter-scene={scene} data-phase="loading" ref={rootRef} aria-hidden="true">
    <img src={assetPath(motion.source)} alt="" width="1122" height="1402" draggable="false" decoding="async" />
  </div>;
}
