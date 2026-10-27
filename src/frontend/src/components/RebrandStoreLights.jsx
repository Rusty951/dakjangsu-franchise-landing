import { useEffect, useRef, useState } from 'react';
import { storeLocations } from '../data/storeLocations.mjs';
import './RebrandStoreLights.css';

const origin = storeLocations.find(store => store.name === '동문점');
// Distance controls the illustration, not actual referral or opening order.
const spreadLights = storeLocations.map(store => ({
  ...store,
  distance: Math.hypot(store.x - origin.x, store.y - origin.y),
})).sort((a, b) => a.distance - b.distance).map((store, index) => ({
  ...store,
  arrival: 180 + 3600 * (index / Math.max(1, storeLocations.length - 1)) ** .62,
}));

export default function RebrandStoreLights() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [motionPaused, setMotionPaused] = useState(true);
  const [replay, setReplay] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (window.location.hash !== '#rebrand-store-lights') return;
    let cancelled = false;
    let frame;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (!cancelled) sectionRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
        });
      });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    let frame;
    let previousTime = null;
    let elapsed = 0;
    let litCount = 0;
    let complete = false;
    const tick = now => {
      if (previousTime !== null) elapsed += now - previousTime;
      previousTime = now;
      let nextCount = litCount;
      while (nextCount < spreadLights.length && elapsed >= spreadLights[nextCount].arrival) nextCount += 1;
      if (nextCount !== litCount) {
        litCount = nextCount;
        setVisibleCount(litCount);
      }
      complete = litCount === spreadLights.length;
      frame = complete ? undefined : requestAnimationFrame(tick);
    };
    const sync = () => {
      const paused = !inView || document.hidden || motion.matches;
      setMotionPaused(paused);
      if (paused) {
        cancelAnimationFrame(frame);
        frame = undefined;
        previousTime = null;
      }
      if (motion.matches) {
        complete = true;
        setVisibleCount(spreadLights.length);
      }
      if (!paused) {
        setStarted(true);
        if (!complete && frame === undefined) frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      sync();
    }, { threshold: 0.2 });
    observer.observe(sectionRef.current);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [replay]);

  const restart = () => {
    setVisibleCount(0);
    setReplay(value => value + 1);
  };

  return <section className="store-lights" id="rebrand-store-lights" ref={sectionRef} aria-labelledby="store-lights-title" data-started={started} data-motion-paused={motionPaused}>
    <div className="store-lights__inner">
      <header className="store-lights__heading">
        <p className="store-lights__eyebrow">닭장수후라이드 和</p>
        <h2 id="store-lights-title" aria-label={`입소문이 켠 닭장수의 불빛. 매장 ${storeLocations.length}곳`}>
          <span>입소문이 켠</span>
          <span className="store-lights__title-row">
            <span>닭장수의 <em>불빛</em></span>
            <span className="store-lights__count" aria-hidden="true"><strong>{visibleCount}</strong><span>곳</span></span>
          </span>
        </h2>
        <p className="store-lights__message">서산의 작은 매장에서 퍼진 입소문<br />먹어본 손님이 사장님이 됐습니다.</p>
      </header>

      <div className="store-lights__visual">
        <div key={replay} className="store-lights__map" role="img" aria-label="서산부터 주변 매장으로 불빛이 점점 빠르게 켜지는 입소문 도식">
          <svg viewBox="0 0 560 540" aria-hidden="true" focusable="false">
            <defs>
              <pattern id="store-lights-grid" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="currentColor" />
              </pattern>
              <radialGradient id="store-lights-fade">
                <stop offset="30%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </radialGradient>
              <mask id="store-lights-mask"><rect width="560" height="540" fill="url(#store-lights-fade)" /></mask>
              <radialGradient id="store-lights-aura">
                <stop offset="0%" stopColor="#ffc58f" stopOpacity=".85" />
                <stop offset="35%" stopColor="#ef946b" stopOpacity=".45" />
                <stop offset="100%" stopColor="#ec7c51" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="560" height="540" fill="url(#store-lights-grid)" mask="url(#store-lights-mask)" className="store-lights__grid" />
            {spreadLights.map((store, index) => <g
              key={store.id}
              className={`store-lights__light${index < visibleCount ? ' is-lit' : ''}${store.id === origin.id ? ' is-origin' : ''}`}
              data-store-id={store.id}
              data-origin={store.id === origin.id ? store.id : undefined}
              transform={`translate(${store.x} ${store.y})`}
            >
              {store.id === origin.id && <circle className="store-lights__origin-aura" r="38" />}
              <circle className="store-lights__relay" r="23" />
              <circle className="store-lights__halo" r="14" />
              <circle className="store-lights__point" r={store.id === origin.id ? 6.5 : 4.5} />
              {store.id === origin.id && <circle className="store-lights__origin-ring" r="12" />}
            </g>)}
            <path className="store-lights__origin-leader" d={`M${origin.x} ${origin.y - 15} V247 L90 235 H31`} />
          </svg>
          <span className="store-lights__origin-label">서산</span>
        </div>
        <div className="store-lights__map-footer">
          <button type="button" className="store-lights__replay" onClick={restart}>
            <span aria-hidden="true">↻</span> 다시 보기
          </button>
        </div>
      </div>
    </div>
  </section>;
}
