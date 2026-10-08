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
    let disposed = false, loaded = false, onScreen = true, animations = [];
    const animate = (element, frames, options = {}) => {
      if (element) animations.push(element.animate(frames, { duration: motion.duration, fill: 'both', easing: 'cubic-bezier(.16,1,.3,1)', ...options }));
    };
    const start = () => {
      animate(root, motion.frames);
      if (scene === 'brand') {
        stage.querySelectorAll('.brand-story-headline > span').forEach((line, index) => {
          animate(line, [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 600, delay: index * 160 });
        });
        animate(stage.querySelector('.brand-story-intro'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 300 });
        stage.querySelectorAll('.brand-story-beats > li').forEach((beat, index) => {
          animate(beat, [{ opacity: 0, transform: 'translateX(-12px)' }, { opacity: 1, transform: 'translateX(0)' }], { duration: 460, delay: 500 + index * 240 });
        });
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
        if (paused && animation.playState === 'running') animation.pause();
        else if (!paused && animation.playState === 'paused') animation.play();
      });
    };
    const visibility = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    // The brand story sits above its character on mobile, so either part being
    // visible must allow the text sequence to play.
    visibility.observe(scene === 'brand' ? stage.querySelector('.jangsu-panel--brand') : root);
    const changes = new MutationObserver(sync);
    if (story) changes.observe(story, { attributes: true, attributeFilter: ['data-motion-paused'] });
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    image.decode().then(() => { loaded = true; sync(); }).catch(() => { if (!disposed) root.dataset.phase = 'static'; });
    return () => {
      disposed = true; animations.forEach(animation => animation.cancel());
      visibility.disconnect(); changes.disconnect();
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', sync);
    };
  }, [scene, motion, onSettled]);
  return <div className="jangsu-chapter-motion" data-chapter-scene={scene} data-phase="loading" ref={rootRef} aria-hidden="true">
    <img src={assetPath(motion.source)} alt="" width="1122" height="1402" draggable="false" decoding="async" />
  </div>;
}
