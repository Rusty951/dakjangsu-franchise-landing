import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import './JangsuRoyaltyMotion.css';

const poses = ['01-neutral', '02-ready', '03-push', '04-present'];
const sources = poses.map(pose => assetPath(`/rebrand/poses/royalty-zero-v1/${pose}.png`));
const duration = 4200;
const beats = [[0,0],[.12,1],[.38,1],[.44,2],[.65,2],[.72,1],[.82,3],[1,3]];

export default function JangsuRoyaltyMotion() {
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
      animations = [...root.querySelectorAll('.jangsu-royalty-pose')].map((image,index) =>
        image.animate(beats.map(([offset,pose]) => ({ offset, opacity: index === pose ? 1 : 0, easing: 'steps(1,end)' })),options)
      );
      animations.push(root.querySelector('.jangsu-royalty-actor').animate([
        { offset: 0, opacity: 0, transform: `translate(${mobile ? -28 : -76}px, 22px) scale(.86) rotate(-4deg)`, easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .12, opacity: 1, transform: 'translate(3px,-4px) scale(1.025) rotate(.5deg)', easing: 'ease-out' },
        { offset: .28, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)', easing: 'ease-in-out' },
        { offset: .38, opacity: 1, transform: 'translate(-7px,3px) scale(.99) rotate(-1deg)', easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .46, opacity: 1, transform: 'translate(14px,-3px) scale(1.02) rotate(1.2deg)', easing: 'ease-out' },
        { offset: .62, opacity: 1, transform: 'translate(8px,0) scale(1) rotate(.5deg)', easing: 'ease-in-out' },
        { offset: .74, opacity: 1, transform: 'translate(-2px,1px) scale(1) rotate(-.3deg)', easing: 'ease-in-out' },
        { offset: .84, opacity: 1, transform: 'translate(2px,-2px) scale(1.008) rotate(.3deg)', easing: 'ease-out' },
        { offset: .94, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)' },
        { offset: 1, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)' },
      ],options));
      const zero = stage.querySelector('.benefit-scene--royalty h2 > strong');
      if (zero) animations.push(zero.animate([
        { offset: 0, transform: `translateX(${mobile ? -16 : -28}px) rotate(-1.3deg)` },
        { offset: .38, transform: `translateX(${mobile ? -16 : -28}px) rotate(-1.3deg)`, easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .48, transform: 'translateX(5px) rotate(.5deg) scale(1.025)', easing: 'ease-out' },
        { offset: .61, transform: 'translateX(-1px) rotate(-.15deg) scale(1)', easing: 'ease-out' },
        { offset: .72, transform: 'translateX(0) rotate(0) scale(1)' },
        { offset: 1, transform: 'translateX(0) rotate(0) scale(1)' },
      ],options));
      const term = stage.querySelector('.royalty-waiver-title');
      if (term) animations.push(term.animate([
        { offset: 0, opacity: .72, transform: 'translateY(8px)' },
        { offset: .65, opacity: .72, transform: 'translateY(8px)', easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .82, opacity: 1, transform: 'translateY(-2px)', easing: 'ease-out' },
        { offset: .95, opacity: 1, transform: 'translateY(0)' },
        { offset: 1, opacity: 1, transform: 'translateY(0)' },
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
  return <div className="jangsu-royalty-motion" ref={rootRef} aria-hidden="true">
    <div className="jangsu-royalty-actor">{sources.map((source,index)=><img key={source} className={`jangsu-royalty-pose jangsu-royalty-pose--${index}`} src={source} alt="" width="1122" height="1402" decoding="async" draggable="false" />)}</div>
  </div>;
}
