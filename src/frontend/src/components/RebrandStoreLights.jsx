import { useEffect, useRef, useState } from 'react';
import { storeLocations } from '../data/storeLocations.mjs';
import './RebrandStoreLights.css';

const origin = storeLocations.find(store => store.name === '동문점');
// Distance controls the illustration's wave, not actual referral or opening order.
const spreadLights = storeLocations.map(store => ({
  ...store,
  distance: Math.hypot(store.x - origin.x, store.y - origin.y),
})).sort((a, b) => a.distance - b.distance);
const spreadRadius = Math.max(...spreadLights.map(store => store.distance)) + 48;

export default function RebrandStoreLights() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [motionPaused, setMotionPaused] = useState(true);
  const [replay, setReplay] = useState(0);

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
    const sync = () => {
      setMotionPaused(!inView || document.hidden || motion.matches);
      if (inView && !motion.matches) setStarted(true);
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
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return <section className="store-lights" id="rebrand-store-lights" ref={sectionRef} aria-labelledby="store-lights-title" data-started={started} data-motion-paused={motionPaused}>
    <div className="store-lights__inner">
      <header className="store-lights__heading">
        <p className="store-lights__eyebrow">닭장수후라이드 和</p>
        <h2 id="store-lights-title" aria-label="먹어본 손님이, 닭장수 사장님이 됐습니다.">
          <span>먹어본 손님이,</span>
          <span><em>닭장수 사장님</em>이 <span className="store-lights__title-ending">됐습니다.</span></span>
        </h2>
        <p className="store-lights__message">먹어본 손님이 가맹을 선택하고,<br />그 선택이 입소문을 타고 이어졌습니다.</p>
      </header>

      <div className="store-lights__visual">
        <div key={replay} className="store-lights__map" role="img" aria-label="서산 동문점에서 빛이 퍼져 다른 매장의 불빛으로 이어지는 입소문 도식">
          <svg viewBox="0 0 560 540" aria-hidden="true" focusable="false" style={{ '--spread-scale': spreadRadius / 12 }}>
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
            <g transform={`translate(${origin.x} ${origin.y})`} className="store-lights__spread" data-origin={origin.id}>
              <circle className="store-lights__origin-aura" r="36" />
              <circle className="store-lights__origin-wave" r="12" />
              <circle className="store-lights__origin-wave store-lights__origin-wave--second" r="12" />
              <circle className="store-lights__origin-wave store-lights__origin-wave--third" r="12" />
            </g>
            {spreadLights.map(store => <g
              key={store.id}
              className={`store-lights__light${store.id === origin.id ? ' is-origin' : ''}`}
              data-store-id={store.id}
              style={{ '--arrival-delay': `${0.4 + store.distance / spreadRadius * 5.76}s` }}
              transform={`translate(${store.x} ${store.y})`}
            >
              <circle className="store-lights__relay" r="23" />
              <circle className="store-lights__halo" r="14" />
              <circle className="store-lights__point" r={store.id === origin.id ? 6.5 : 4.5} />
              {store.id === origin.id && <circle className="store-lights__origin-ring" r="12" />}
            </g>)}
            <path className="store-lights__origin-leader" d={`M${origin.x} ${origin.y - 15} V247 L90 235 H31`} />
          </svg>
          <span className="store-lights__origin-label">서산 동문점</span>
        </div>
        <div className="store-lights__map-footer">
          <p className="store-lights__note">매장 위치를 지역 기준으로 표현한 도식입니다.</p>
          <button type="button" className="store-lights__replay" onClick={() => setReplay(value => value + 1)}>
            <span aria-hidden="true">↻</span> 다시 보기
          </button>
        </div>
      </div>
    </div>
  </section>;
}
