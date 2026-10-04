import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import './JangsuInviteMotion.css';

const poses = ['01-neutral', '02-invite', '03-guide', '04-rest'];
const sources = poses.map(pose => assetPath(`/rebrand/poses/consultation-invite-v1/${pose}.png`));
const duration = 4200;
const beats = [[0,0],[.18,1],[.5,1],[.56,2],[.8,2],[.87,3],[1,3]];

export default function JangsuInviteMotion() {
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
      animations = [...root.querySelectorAll('.jangsu-invite-pose')].map((image,index) =>
        image.animate(beats.map(([offset,pose]) => ({ offset, opacity: index === pose ? 1 : 0, easing: 'steps(1,end)' })),options)
      );
      animations.push(root.querySelector('.jangsu-invite-actor').animate([
        { offset: 0, opacity: 0, transform: `translate(${mobile ? 22 : 48}px, 18px) scale(.91) rotate(2deg)`, easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .18, opacity: 1, transform: 'translate(-3px,-7px) scale(1.025) rotate(-1deg)', easing: 'ease-out' },
        { offset: .36, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)', easing: 'ease-in-out' },
        { offset: .5, opacity: 1, transform: 'translate(2px,2px) scale(1) rotate(.4deg)', easing: 'ease-in-out' },
        { offset: .6, opacity: 1, transform: 'translate(-6px,-3px) scale(1.014) rotate(-.7deg)', easing: 'ease-out' },
        { offset: .76, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)', easing: 'ease-in-out' },
        { offset: .87, opacity: 1, transform: 'translate(-2px,-1px) scale(1.005) rotate(-.2deg)', easing: 'ease-out' },
        { offset: .96, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)' },
        { offset: 1, opacity: 1, transform: 'translate(0,0) scale(1) rotate(0)' },
      ],options));
      const action = stage.querySelector('.jangsu-invite-copy a');
      if (action) animations.push(action.animate([
        { offset: 0, transform: 'translateY(8px) scale(.99)', boxShadow: '0 0 0 0 #fff8ed00' },
        { offset: .48, transform: 'translateY(8px) scale(.99)', boxShadow: '0 0 0 0 #fff8ed00', easing: 'cubic-bezier(.16,1,.3,1)' },
        { offset: .63, transform: 'translateY(-2px) scale(1.014)', boxShadow: '0 0 0 5px #fff8ed50', easing: 'ease-out' },
        { offset: .84, transform: 'translateY(0) scale(1)', boxShadow: '0 0 0 0 #fff8ed00' },
        { offset: 1, transform: 'translateY(0) scale(1)', boxShadow: '0 0 0 0 #fff8ed00' },
      ],options));
      stage.querySelectorAll('.jangsu-invite-copy li').forEach((item,index)=>{
        const cue = .16 + index * .13;
        animations.push(item.animate([
          { offset: 0, opacity: .65, transform: 'translateX(8px)' },
          { offset: cue, opacity: .65, transform: 'translateX(8px)', easing: 'cubic-bezier(.16,1,.3,1)' },
          { offset: cue+.12, opacity: 1, transform: 'translateX(0)' },
          { offset: 1, opacity: 1, transform: 'translateX(0)' },
        ],options));
      });
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
  return <div className="jangsu-invite-motion" ref={rootRef} aria-hidden="true">
    <div className="jangsu-invite-actor">{sources.map((source,index)=><img key={source} className={`jangsu-invite-pose jangsu-invite-pose--${index}`} src={source} alt="" width="1122" height="1402" decoding="async" draggable="false" />)}</div>
  </div>;
}
