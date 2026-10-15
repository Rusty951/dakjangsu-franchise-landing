import { useLayoutEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import './MobileSupportLift.css';

const duration = 5200;
const sources = ['ready', 'mid', 'push'].map(pose => assetPath(`/rebrand/character-lift-${pose}.webp`));

function pointInHero(element, hero) {
  let x = 0, y = 0;
  for (let node = element; node && node !== hero; node = node.offsetParent) {
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  return { x, y };
}

export default function MobileSupportLift({ active, reducedMotion }) {
  const rootRef = useRef(null);
  useLayoutEffect(() => {
    const root = rootRef.current;
    const hero = root.closest('.mobile-support-hero');
    const panel = root.closest('.mobile-support-panel');
    const story = root.closest('.jangsu-story');
    const number = hero.querySelector('.mobile-support-amount b');
    const digits = number.querySelector('.slot-number');
    const rest = hero.querySelector('.mobile-support-character');
    let disposed = false, onScreen = true, animations = [];
    const phase = value => { root.dataset.phase = value; panel.dataset.mobileLift = value; };
    phase('static');
    if (!active || reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
    let size = `${hero.offsetWidth}:${hero.offsetHeight}`;
    const resize = new ResizeObserver(() => {
      const nextSize = `${hero.offsetWidth}:${hero.offsetHeight}`;
      if (nextSize !== size) {
        size = nextSize;
        animations.forEach(animation => animation.cancel());
        phase('static');
      }
    });
    resize.observe(hero);
    Promise.all([...root.querySelectorAll('img')].map(image => image.decode())).then(() => {
      if (disposed) return;
      const numberPoint = pointInHero(digits, hero);
      const height = Math.min(digits.offsetWidth * 1.5 + 32, window.innerHeight * .58, 460);
      const width = height * 2 / 3;
      // Keep the monthly limit below the fixed header even with the larger digits.
      const rise = Math.min(digits.offsetHeight * .84, Math.max(0, numberPoint.y + pointInHero(hero, panel).y - 32));
      // Match the palms to the visible bottom of the original display font.
      const top = numberPoint.y + digits.offsetHeight - rise - height * .08 - digits.offsetHeight * .12;
      const actor = root.querySelector('.mobile-support-lift-actor');
      const base = { left: `calc(50% - ${width / 2}px)`, top: `${top}px`, width: `${width}px`, height: `${height}px` };
      const parked = { left: `calc(50% - ${rest.offsetWidth / 2}px)`, top: `${rest.offsetTop}px`, width: `${rest.offsetWidth}px`, height: `${rest.offsetHeight}px` };
      const limit = root.querySelector('.mobile-support-lift-limit');
      const unit = root.querySelector('.mobile-support-lift-unit');
      Object.assign(limit.style, { left: `${hero.offsetWidth / 2}px`, top: `${numberPoint.y - rise - 24}px` });
      Object.assign(unit.style, { left: `${numberPoint.x + digits.offsetWidth + 8}px`, top: `${numberPoint.y - rise + digits.offsetHeight * .55}px` });
      const animate = (element, frames) => {
        const animation = element.animate(frames, { duration, fill: 'both', easing: 'linear' });
        animations.push(animation);
        return animation;
      };
      phase('playing');
      animate(actor, [
        { ...base, offset: 0, opacity: 0, transform: 'translate(30px, 40px) scale(.96)', easing: 'ease-out' },
        { ...base, offset: .18, opacity: 1, transform: `translateY(${height * .1}px)`, easing: 'cubic-bezier(.2,.8,.2,1)' },
        { ...base, offset: .32, opacity: 1, transform: 'translateY(0)' },
        { ...base, offset: .74, opacity: 1, transform: 'translateY(0)', easing: 'cubic-bezier(.22,.7,.3,1)' },
        { ...parked, offset: 1, opacity: 1, transform: 'translateY(0)' },
      ]);
      animate(number, [
        { offset: 0, opacity: 0, transform: 'translateY(60px)' },
        { offset: .18, opacity: 1, transform: 'translateY(60px)', easing: 'cubic-bezier(.2,.8,.2,1)' },
        { offset: .32, opacity: 1, transform: `translateY(${-rise}px)` },
        { offset: .74, opacity: 1, transform: `translateY(${-rise}px)`, easing: 'cubic-bezier(.22,.7,.3,1)' },
        { offset: 1, opacity: 1, transform: 'translateY(0)' },
      ]);
      [limit, unit].forEach(label => animate(label, [
        { offset: 0, opacity: 0 }, { offset: .18, opacity: 1 },
        { offset: .74, opacity: 1 }, { offset: .84, opacity: 0 }, { offset: 1, opacity: 0 },
      ]));
      const opacityCues = [
        [[0, 1], [.2, 1], [.20001, 0], [.87, 0], [.87001, 1], [.92, 1], [.92001, 0], [1, 0]],
        [[0, 0], [.2, 0], [.20001, 1], [.262, 1], [.26201, 0], [.82, 0], [.82001, 1], [.87, 1], [.87001, 0], [1, 0]],
        [[0, 0], [.262, 0], [.26201, 1], [.82, 1], [.82001, 0], [1, 0]],
        [[0, 0], [.92, 0], [.92001, 1], [1, 1]],
      ];
      root.querySelectorAll('img').forEach((image, index) => animate(image, opacityCues[index].map(([offset, opacity]) => ({ offset, opacity }))));
      const epoch = document.timeline.currentTime;
      animations.forEach(animation => { animation.startTime = epoch; });
      animations[0].onfinish = () => { if (!disposed) phase('settled'); };
      sync();
    }).catch(() => { if (!disposed) phase('static'); });
    return () => {
      disposed = true;
      animations.forEach(animation => animation.cancel());
      observer.disconnect(); changes.disconnect(); resize.disconnect();
      document.removeEventListener('visibilitychange', sync);
      phase('static');
    };
  }, [active, reducedMotion]);
  return <div className="mobile-support-lift" ref={rootRef} data-phase="static" aria-hidden="true">
    <span className="mobile-support-lift-limit">월 최대</span>
    <span className="mobile-support-lift-unit">만원<br />크레딧</span>
    <div className="mobile-support-lift-actor">
      {sources.map(source => <img src={source} key={source} alt="" width="1024" height="1536" draggable="false" />)}
      <img src={assetPath('/rebrand/character-cutout.png')} alt="" width="1122" height="1402" draggable="false" />
    </div>
  </div>;
}
