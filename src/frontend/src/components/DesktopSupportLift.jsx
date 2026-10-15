import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import SlotNumber from './SlotNumber';

const sources = ['ready', 'mid', 'push'].map(pose => `/rebrand/character-lift-${pose}.webp`);
export default function DesktopSupportLift({ active, reducedMotion }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    const panel = root.closest('.dks-support');
    const story = root.closest('.dks-desktop-story');
    let disposed = false, onScreen = true, animations = [], resize;
    panel.dataset.lift = 'static';
    if (!active || reducedMotion) return;
    const sync = () => {
      const paused = !onScreen || document.hidden || story.dataset.motionPaused === 'true';
      animations.forEach(animation => {
        if (paused && animation.playState === 'running') animation.pause();
        else if (!paused && animation.playState === 'paused') animation.play();
      });
    };
    const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    observer.observe(panel);
    const changes = new MutationObserver(sync);
    changes.observe(story, { attributes: true, attributeFilter: ['data-motion-paused'] });
    document.addEventListener('visibilitychange', sync);
    Promise.all([...root.querySelectorAll('img')].map(image => image.decode())).then(() => {
      if (disposed) return;
      panel.dataset.lift = 'playing';
      const number = root.querySelector('.dks-lift-number');
      const actor = root.querySelector('.dks-lift-actor');
      const actorHeight = Math.min(root.offsetHeight * .7, 620, (root.offsetHeight - number.offsetTop - number.offsetHeight * .88 - 8) / .92);
      actor.style.height = `${actorHeight}px`;
      actor.style.top = `${number.offsetTop + number.offsetHeight * .88 - actorHeight * .08}px`;
      const animate = (element, frames) => {
        const animation = element.animate(frames, { duration: 5200, fill: 'both', easing: 'linear' });
        animations.push(animation);
        return animation;
      };
      [number, actor].forEach(element => animate(element, [
        { offset: 0, opacity: 0, transform: 'translate(-50%, 70px)' },
        { offset: .18, opacity: 1, transform: 'translate(-50%, 70px)', easing: 'cubic-bezier(.2,.8,.2,1)' },
        { offset: .34, opacity: 1, transform: 'translate(-50%, 0)' },
        { offset: .86, opacity: 1, transform: 'translate(-50%, 0)' },
        { offset: 1, opacity: 0, transform: 'translate(-50%, 0)' },
      ]));
      const cues = [
        [[0, 1], [.2, 1], [.20001, 0], [1, 0]],
        [[0, 0], [.2, 0], [.20001, 1], [.28, 1], [.28001, 0], [1, 0]],
        [[0, 0], [.28, 0], [.28001, 1], [1, 1]],
      ];
      root.querySelectorAll('img').forEach((image, index) => animate(image, cues[index].map(([offset, opacity]) => ({ offset, opacity }))));
      const epoch = document.timeline.currentTime;
      animations.forEach(animation => { animation.startTime = epoch; });
      animations[0].onfinish = () => { if (!disposed) panel.dataset.lift = 'settled'; };
      const initialSize = `${root.offsetWidth}:${root.offsetHeight}`;
      resize = new ResizeObserver(() => {
        if (`${root.offsetWidth}:${root.offsetHeight}` !== initialSize && panel.dataset.lift === 'playing') {
          animations.forEach(animation => animation.cancel()); panel.dataset.lift = 'static';
        }
      });
      resize.observe(root);
      sync();
    }).catch(() => { if (!disposed) panel.dataset.lift = 'static'; });
    return () => {
      disposed = true;
      animations.forEach(animation => animation.cancel());
      observer.disconnect(); changes.disconnect(); resize?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      panel.dataset.lift = 'static';
    };
  }, [active, reducedMotion]);
  return <div className="dks-lift" ref={ref} aria-hidden="true">
    <div className="dks-lift-number"><span>월 최대</span><b><SlotNumber value="100" active={active} reducedMotion={reducedMotion} delay={.76} /></b><span>만원<br />크레딧</span></div>
    <div className="dks-lift-actor">{sources.map(source => <img key={source} src={assetPath(source)} alt="" width="1024" height="1536" />)}</div>
  </div>;
}
