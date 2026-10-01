import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import './JangsuOpeningMotion.css';

const poses = ['01-prepare', '02-offer', '03-present', '04-rest'];
const sources = poses.map(pose => assetPath(`/rebrand/poses/opening-package-v1/${pose}.png`));
const duration = 4600;
const beats = [[0,0],[.1,1],[.18,2],[.24,0],[.29,1],[.35,2],[.4,0],[.45,1],[.51,2],[.82,2],[.9,3],[1,3]];

export default function JangsuOpeningMotion() {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    const stage = root.closest('.jangsu-stage');
    const story = root.closest('.jangsu-story');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, loaded = false, onScreen = true;
    let animations = [];
    root.dataset.phase = 'loading';
    const start = () => {
      const options = { duration, fill: 'both' };
      const mobile = window.innerWidth <= 700;
      animations = [...root.querySelectorAll('.jangsu-opening-pose')].map((image,index) =>
        image.animate(beats.map(([offset,pose]) => ({ offset, opacity: index === pose ? 1 : 0, easing: 'steps(1,end)' })),options)
      );
      animations.push(root.querySelector('.jangsu-opening-actor').animate([
        { offset: 0, opacity: 0, transform: `translate(${mobile ? -28 : -76}px, 22px) scale(.85) rotate(-4deg)`, easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .1, opacity: 1, transform: 'translate(4px,-4px) scale(1.025) rotate(.5deg)', easing: 'ease-out' },
        { offset: .18, opacity: 1, transform: 'translate(8px,0) scale(1) rotate(.5deg)', easing: 'ease-in-out' },
        { offset: .24, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)', easing: 'ease-in-out' },
        { offset: .35, opacity: 1, transform: 'translate(8px,-3px) scale(1.012) rotate(.5deg)', easing: 'ease-in-out' },
        { offset: .4, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)', easing: 'ease-in-out' },
        { offset: .51, opacity: 1, transform: 'translate(8px,-3px) scale(1.012) rotate(.5deg)', easing: 'ease-out' },
        { offset: .66, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)' },
        { offset: 1, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)' },
      ],options));
      stage.querySelectorAll('.opening-package-card').forEach((card,index) => {
        const cue = .08 + index * .15;
        animations.push(card.animate([
          { offset: 0, opacity: .55, transform: 'translateX(-20px) scale(.97) rotate(-1deg)' },
          { offset: cue, opacity: .55, transform: 'translateX(-20px) scale(.97) rotate(-1deg)', easing: 'cubic-bezier(.16,1,.3,1)' },
          { offset: cue + .08, opacity: 1, transform: 'translateX(3px) scale(1.02) rotate(.35deg)', easing: 'ease-out' },
          { offset: cue + .17, opacity: 1, transform: 'translateX(0) scale(1) rotate(0)' },
          { offset: 1, opacity: 1, transform: 'translateX(0) scale(1) rotate(0)' },
        ],options));
      });
      const total = stage.querySelector('.benefit-scene--opening h2 > strong');
      if (total) animations.push(total.animate([
        { offset: 0, transform: 'scale(1)' },
        { offset: .44, transform: 'scale(1)', easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .52, transform: 'scale(1.04)', easing: 'ease-out' },
        { offset: .66, transform: 'scale(1)' },
        { offset: 1, transform: 'scale(1)' },
      ],options));
      const epoch = document.timeline.currentTime;
      animations.forEach(animation => { animation.startTime = epoch; });
      root.dataset.phase = 'playing';
      animations[0].onfinish = () => { root.dataset.phase = 'settled'; };
    };
    const sync = () => {
      if (disposed || !loaded) return;
      if (preference.matches) { animations.forEach(a=>a.cancel()); animations=[]; root.dataset.phase='static'; return; }
      if (!animations.length) start();
      const paused = document.hidden || !onScreen || story?.dataset.motionPaused === 'true';
      root.dataset.paused = String(paused);
      animations.forEach(a=>{
        if (paused && a.playState === 'running') a.pause();
        else if (!paused && a.playState === 'paused') a.play();
      });
    };
    const visibility = new IntersectionObserver(([entry])=>{ onScreen=entry.isIntersecting; sync(); });
    visibility.observe(root);
    const changes = new MutationObserver(sync);
    if (story) changes.observe(story,{attributes:true,attributeFilter:['data-motion-paused']});
    document.addEventListener('visibilitychange',sync);
    preference.addEventListener('change',sync);
    Promise.all(sources.map(source=>{ const image=new Image(); image.src=source; return image.decode(); }))
      .then(()=>{ if(!disposed){ loaded=true; sync(); } })
      .catch(()=>{ if(!disposed) root.dataset.phase='static'; });
    return ()=>{
      disposed=true; animations.forEach(a=>a.cancel()); visibility.disconnect(); changes.disconnect();
      document.removeEventListener('visibilitychange',sync); preference.removeEventListener('change',sync);
    };
  },[]);
  return <div className="jangsu-opening-motion" ref={rootRef} aria-hidden="true">
    <div className="jangsu-opening-actor">{sources.map((source,index)=><img key={source} className={`jangsu-opening-pose jangsu-opening-pose--${index}`} src={source} alt="" width="1122" height="1402" decoding="async" draggable="false" />)}</div>
  </div>;
}
