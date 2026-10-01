import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import './JangsuHeroMotion.css';

const poses = ['01-neutral', '02-ready', '03-half-open', '04-present'];
const sources = poses.map(pose => assetPath(`/rebrand/poses/hero-presentation-v1/${pose}.png`));
const duration = 4200;
// Swap during the gesture; never fade two faces together.
const beats = [[0, 0], [.12, 0], [.22, 1], [.32, 2], [.42, 3], [.66, 3], [.76, 2], [.86, 1], [.94, 0], [1, 0]];

export default function JangsuHeroMotion() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const story = root.closest('.jangsu-story');
    const stage = root.closest('.jangsu-stage');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let loaded = false;
    let onScreen = true;
    let animations = [];
    root.dataset.phase = 'loading';

    const start = () => {
      const options = { duration, fill: 'both' };
      animations = [...root.querySelectorAll('.jangsu-hero-pose')].map((image, index) =>
        image.animate(beats.map(([offset, pose]) => ({
          offset, opacity: pose === index ? 1 : 0, easing: 'steps(1, end)',
        })), options)
      );
      animations.push(root.querySelector('.jangsu-hero-arrival').animate([
        { offset: 0, transform: 'translateY(8px)', easing: 'ease-out' },
        { offset: .12, transform: 'translateY(0)', easing: 'ease-in-out' },
        { offset: .22, transform: 'translateY(3px)', easing: 'ease-out' },
        { offset: .42, transform: 'translateY(-3px)' },
        { offset: .66, transform: 'translateY(-3px)', easing: 'ease-in-out' },
        { offset: .94, transform: 'translateY(0)' },
        { offset: 1, transform: 'translateY(0)' },
      ], options));
      stage.querySelectorAll('.hero-offer-amount').forEach(amount => {
        animations.push(amount.animate([
          { offset: 0, transform: 'scale(1)' },
          { offset: .22, transform: 'scale(.975)', easing: 'cubic-bezier(.16,1,.3,1)' },
          { offset: .42, transform: 'scale(1.012)', easing: 'ease-out' },
          { offset: .52, transform: 'scale(1)' },
          { offset: 1, transform: 'scale(1)' },
        ], options));
      });
      const epoch = document.timeline.currentTime;
      animations.forEach(animation => { animation.startTime = epoch; });
      root.dataset.phase = 'playing';
      animations[0].onfinish = () => { root.dataset.phase = 'settled'; };
    };

    const sync = () => {
      if (disposed || !loaded) return;
      if (preference.matches) {
        animations.forEach(animation => animation.cancel());
        animations = [];
        root.dataset.phase = 'static';
        return;
      }
      if (!animations.length) start();
      const paused = document.hidden || !onScreen || story?.dataset.motionPaused === 'true';
      root.dataset.paused = String(paused);
      animations.forEach(animation => {
        if (paused && animation.playState === 'running') animation.pause();
        else if (!paused && animation.playState === 'paused') animation.play();
      });
    };

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    visibility.observe(root);
    const changes = new MutationObserver(sync);
    if (story) changes.observe(story, { attributes: true, attributeFilter: ['data-motion-paused'] });
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    Promise.all(sources.map(source => {
      const image = new Image();
      image.src = source;
      return image.decode();
    })).then(() => {
      if (disposed) return;
      loaded = true;
      sync();
    }).catch(() => { if (!disposed) root.dataset.phase = 'static'; });

    return () => {
      disposed = true;
      animations.forEach(animation => animation.cancel());
      visibility.disconnect();
      changes.disconnect();
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div className="jangsu-hero-motion" ref={rootRef} aria-hidden="true">
      <div className="jangsu-hero-arrival">
        {sources.map((source, index) => <img key={source} className={`jangsu-hero-pose jangsu-hero-pose--${index}`} src={source} alt="" width="1122" height="1402" decoding="async" draggable="false" />)}
      </div>
    </div>
  );
}
