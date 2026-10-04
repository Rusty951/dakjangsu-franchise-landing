import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import './JangsuKitchenMotion.css';

const poses = ['01-ready', '02-fridge', '03-fryer', '04-rest'];
const sources = poses.map(pose => assetPath(`/rebrand/poses/kitchen-support-v1/${pose}.png`));
const duration = 4600;
const beats = [[0,0],[.13,1],[.38,1],[.43,0],[.5,2],[.76,2],[.86,3],[1,3]];

export default function JangsuKitchenMotion() {
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
      animations = [...root.querySelectorAll('.jangsu-kitchen-pose')].map((image,index) =>
        image.animate(beats.map(([offset,pose]) => ({ offset, opacity: index === pose ? 1 : 0, easing: 'steps(1,end)' })),options)
      );
      animations.push(root.querySelector('.jangsu-kitchen-actor').animate([
        { offset: 0, opacity: 0, transform: `translate(${mobile ? 30 : 80}px, 24px) scale(.87) rotate(4deg)`, easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .13, opacity: 1, transform: 'translate(-5px,-4px) scale(1.025) rotate(-.7deg)', easing: 'ease-out' },
        { offset: .3, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)', easing: 'ease-in-out' },
        { offset: .43, opacity: 1, transform: 'translate(4px,3px) scale(.99) rotate(.6deg)', easing: 'ease-in-out' },
        { offset: .5, opacity: 1, transform: 'translate(-6px,-3px) scale(1.018) rotate(-.7deg)', easing: 'ease-out' },
        { offset: .7, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)', easing: 'ease-in-out' },
        { offset: .79, opacity: 1, transform: 'translate(0,5px) scaleY(.986) rotate(.7deg)', easing: 'ease-in-out' },
        { offset: .88, opacity: 1, transform: 'translate(0,-1px) scale(1) rotate(-.25deg)', easing: 'ease-out' },
        { offset: .96, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)' },
        { offset: 1, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)' },
      ],options));
      stage.querySelectorAll('.kitchen-support-card').forEach((card,index) => {
        const cue = .1 + index * .37;
        animations.push(card.animate([
          { offset: 0, opacity: .55, transform: 'translateX(20px) scale(.97) rotate(1deg)' },
          { offset: cue, opacity: .55, transform: 'translateX(20px) scale(.97) rotate(1deg)', easing: 'cubic-bezier(.16,1,.3,1)' },
          { offset: cue + .08, opacity: 1, transform: 'translateX(3px) scale(1.02) rotate(.35deg)', easing: 'ease-out' },
          { offset: cue + .17, opacity: 1, transform: 'translateX(0) scale(1) rotate(0)' },
          { offset: 1, opacity: 1, transform: 'translateX(0) scale(1) rotate(0)' },
        ],options));
      });
      const total = stage.querySelector('.benefit-scene--kitchen h2 > strong');
      if (total) animations.push(total.animate([
        { offset: 0, transform: 'scale(1)' },
        { offset: .65, transform: 'scale(1)', easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .74, transform: 'scale(1.04)', easing: 'ease-out' },
        { offset: .88, transform: 'scale(1)' },
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
  return <div className="jangsu-kitchen-motion" ref={rootRef} aria-hidden="true">
    <div className="jangsu-kitchen-actor">{sources.map((source,index)=><img key={source} className={`jangsu-kitchen-pose jangsu-kitchen-pose--${index}`} src={source} alt="" width="1122" height="1402" decoding="async" draggable="false" />)}</div>
  </div>;
}
