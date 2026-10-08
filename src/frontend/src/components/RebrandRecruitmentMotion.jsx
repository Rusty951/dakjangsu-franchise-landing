import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';

const sources = ['01-behind', '02-reach', '03-raise', '04-extend', '05-point']
  .map(pose => assetPath(`/rebrand/poses/recruitment-v1/${pose}.webp`));
const duration = 2200;
// Hold the opening pose, then make each hand transition brief and settle on the point.
const cues = [0, .3, .44, .58, .72];
const blend = .025;

export default function RebrandRecruitmentMotion({ active, reducedMotion }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const story = root.closest('.jangsu-story');
    let disposed = false;
    let onScreen = true;
    let animations = [];
    if (!active || reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.dataset.phase = 'static';
      return;
    }
    root.dataset.phase = 'loading';
    const sync = () => {
      const paused = !onScreen || document.hidden || story?.dataset.motionPaused === 'true';
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

    Promise.all([...root.querySelectorAll('img')].map(image => image.decode())).then(() => {
      if (disposed) return;
      animations = [...root.querySelectorAll('img')].map((image, index) => {
        const frames = [{ offset: 0, opacity: index === 0 ? 1 : 0 }];
        if (index > 0) frames.push(
          { offset: cues[index] - blend, opacity: 0 },
          { offset: cues[index] + blend, opacity: 1 },
        );
        if (index < sources.length - 1) frames.push(
          { offset: cues[index + 1] - blend, opacity: 1 },
          { offset: cues[index + 1] + blend, opacity: 0 },
        );
        frames.push({ offset: 1, opacity: index === sources.length - 1 ? 1 : 0 });
        return image.animate(frames, { duration, fill: 'both', easing: 'linear' });
      });
      const epoch = document.timeline.currentTime;
      animations.forEach(animation => { animation.startTime = epoch; });
      root.dataset.phase = 'playing';
      animations.at(-1).onfinish = () => { root.dataset.phase = 'settled'; };
      sync();
    }).catch(() => { if (!disposed) root.dataset.phase = 'static'; });

    return () => {
      disposed = true;
      animations.forEach(animation => animation.cancel());
      visibility.disconnect();
      changes.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [active, reducedMotion]);

  return <div className="recruitment-motion" ref={rootRef} data-phase="loading" role="img" aria-label="뒷짐에서 손을 꺼내 당신을 지목하는 닭장수">
    {sources.map((source, index) => <img key={source} src={source} alt="" aria-hidden="true" width="900" height="955" fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" draggable="false" />)}
  </div>;
}
