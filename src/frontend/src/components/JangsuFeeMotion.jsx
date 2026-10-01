import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import './JangsuFeeMotion.css';

const poses = ['01-introduce', '02-ready', '03-press', '04-rest'];
const sources = poses.map(pose => assetPath(`/rebrand/poses/fee-waiver-v1/${pose}.png`));
const beats = [[0, 0], [.45, 0], [.5, 1], [.58, 2], [.7, 2], [.86, 3], [1, 3]];
const duration = 4000;

export default function JangsuFeeMotion() {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    const stage = root.closest('.jangsu-stage');
    const story = root.closest('.jangsu-story');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let loaded = false;
    let onScreen = true;
    let animations = [];
    root.dataset.phase = 'loading';
    const start = () => {
      const options = { duration, fill: 'both' };
      const mobile = window.innerWidth <= 700;
      const arrivalX = mobile ? 34 : 96;
      animations = [...root.querySelectorAll('.jangsu-fee-pose')].map((image, index) =>
        image.animate(beats.map(([offset, pose]) => ({ offset, opacity: index === pose ? 1 : 0, easing: 'steps(1, end)' })), options)
      );
      animations.push(root.querySelector('.jangsu-fee-actor').animate([
        { offset: 0, opacity: 0, transform: `translate(${arrivalX}px, 26px) scale(.82) rotate(5deg)`, easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .16, opacity: 1, transform: 'translate(-10px, -7px) scale(1.035) rotate(-1deg)', easing: 'ease-out' },
        { offset: .26, opacity: 1, transform: 'translate(0, 0) scale(1) rotate(0)' },
        { offset: .5, opacity: 1, transform: 'translate(-5px, -12px) scale(1.015) rotate(-1.8deg)', easing: 'cubic-bezier(.5,0,.8,.4)' },
        { offset: .58, opacity: 1, transform: 'translate(0, 6px) scale(1.02,.97) rotate(.6deg)', easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .66, opacity: 1, transform: 'translate(0, -5px) scale(.995,1.012) rotate(-.3deg)', easing: 'ease-out' },
        { offset: .8, opacity: 1, transform: 'translate(0, 0) scale(1) rotate(0)', easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: 1, opacity: 1, transform: mobile ? 'translate(0, 0) scale(1) rotate(0)' : 'translate(26px, 0) scale(.9) rotate(0)' },
      ], options));
      const title = stage.querySelector('.fee-waiver-title');
      if (title) animations.push(title.animate([
        { offset: 0, transform: 'scale(1)', color: '#241f1b' },
        { offset: .5, transform: 'translateY(-6px) scale(1.055) rotate(-1deg)', color: '#241f1b', easing: 'cubic-bezier(.5,0,.8,.4)' },
        { offset: .58, transform: 'translateY(5px) scale(.9) rotate(.4deg)', color: '#b74623', easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .66, transform: 'translateY(-3px) scale(1.04) rotate(-.3deg)', color: '#b74623', easing: 'ease-out' },
        { offset: .8, transform: 'scale(1)', color: '#241f1b' },
        { offset: 1, transform: 'scale(1)', color: '#241f1b' },
      ], options));
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
    const visibility = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    visibility.observe(root);
    const changes = new MutationObserver(sync);
    if (story) changes.observe(story, { attributes: true, attributeFilter: ['data-motion-paused'] });
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    Promise.all(sources.map(source => {
      const image = new Image(); image.src = source; return image.decode();
    })).then(() => { if (!disposed) { loaded = true; sync(); } }).catch(() => { if (!disposed) root.dataset.phase = 'static'; });
    return () => {
      disposed = true;
      animations.forEach(animation => animation.cancel());
      visibility.disconnect(); changes.disconnect();
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', sync);
    };
  }, []);
  return (
    <div className="jangsu-fee-motion" ref={rootRef} aria-hidden="true">
      <div className="jangsu-fee-actor">
        {sources.map((source, index) => <img key={source} className={`jangsu-fee-pose jangsu-fee-pose--${index}`} src={source} alt="" width="1122" height="1402" decoding="async" draggable="false" />)}
      </div>
    </div>
  );
}
