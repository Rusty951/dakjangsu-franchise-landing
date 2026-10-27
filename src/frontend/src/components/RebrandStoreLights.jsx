import { useEffect, useRef, useState } from 'react';
import { storeAsOf, storeLocations } from '../data/storeLocations.mjs';
import './RebrandStoreLights.css';

const regions = [
  { name: '서울', x: 325, y: 67 },
  { name: '경기', x: 92, y: 164 },
  { name: '충남', x: 34, y: 220 },
  { name: '충북', x: 397, y: 234 },
  { name: '세종', x: 357, y: 303 },
  { name: '대전', x: 368, y: 377 },
  { name: '전북', x: 101, y: 465 },
  { name: '경남', x: 464, y: 459 },
].map(region => ({ ...region, stores: storeLocations.filter(store => store.region === region.name) }));

// A regional reveal is a visual sequence, not the stores' opening chronology.
const revealOrder = regions.flatMap(region => region.stores);
const waveDelays = { 서울: 1, 경기: 1.6, 충남: 2.6, 세종: 3.1, 대전: 3.6, 충북: 4.1, 전북: 5.3, 경남: 5.9 };
const firstStore = storeLocations.find(store => store.name === '석림점');

export default function RebrandStoreLights() {
  const sectionRef = useRef(null);
  const finishRef = useRef(() => {});
  const [visibleCount, setVisibleCount] = useState(storeLocations.length);
  const [selectedId, setSelectedId] = useState(firstStore.id);
  const [hasSelected, setHasSelected] = useState(false);
  const [replay, setReplay] = useState(0);
  const [phase, setPhase] = useState('still');
  const [motionPaused, setMotionPaused] = useState(true);
  const selected = storeLocations.find(store => store.id === selectedId);

  useEffect(() => {
    if (window.location.hash !== '#rebrand-store-lights') return;
    let cancelled = false;
    let frame;
    // Initial hydration replaces the hero layout. Resolve the direct section link
    // after fonts and that layout have settled instead of leaving it at the hero.
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
    const section = sectionRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let cancelled = false;
    let inView = false;
    let started = false;
    let count = storeLocations.length;

    const finish = () => {
      clearTimeout(timer);
      started = true;
      count = storeLocations.length;
      setVisibleCount(storeLocations.length);
      setPhase(motion.matches ? 'still' : 'complete');
    };
    finishRef.current = finish;
    const tick = () => {
      if (cancelled || !inView || document.hidden || count >= storeLocations.length) return;
      count += 1;
      setVisibleCount(count);
      if (count < storeLocations.length) timer = setTimeout(tick, 82);
      else setPhase('complete');
    };
    const start = () => {
      if (motion.matches) return;
      started = true;
      count = 0;
      setVisibleCount(count);
      setPhase('reveal');
      timer = setTimeout(tick, 180);
    };
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      setMotionPaused(!inView || document.hidden || motion.matches);
      clearTimeout(timer);
      if (!inView || motion.matches) return;
      if (!started) start();
      else if (count < storeLocations.length) timer = setTimeout(tick, 82);
    }, { threshold: 0.25 });
    observer.observe(section);
    const visibilityChange = () => {
      clearTimeout(timer);
      setMotionPaused(!inView || document.hidden || motion.matches);
      if (!document.hidden && inView && started) tick();
    };
    const motionChange = () => {
      finish();
      setMotionPaused(!inView || document.hidden || motion.matches);
    };
    motion.addEventListener('change', motionChange);
    document.addEventListener('visibilitychange', visibilityChange);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      observer?.disconnect();
      motion.removeEventListener('change', motionChange);
      document.removeEventListener('visibilitychange', visibilityChange);
    };
  }, [replay]);

  const selectRegion = region => {
    setSelectedId(region.stores[0].id);
    setHasSelected(true);
    finishRef.current();
  };

  return <section className="store-lights" id="rebrand-store-lights" ref={sectionRef} aria-labelledby="store-lights-title" data-phase={phase} data-motion-paused={motionPaused}>
    <div className="store-lights__inner">
      <header className="store-lights__heading">
        <p className="store-lights__eyebrow">닭장수후라이드 和</p>
        <h2 id="store-lights-title">동네마다 켜진<br />닭장수의 <em>불빛</em></h2>
        <p className="store-lights__total" aria-label={`${regions.length}개 시도, ${storeLocations.length}개 매장`}>
          <span aria-hidden="true"><strong>{visibleCount}</strong><span>곳</span></span>
          <span className="store-lights__total-caption" aria-hidden="true">8개 시도에서 만나는 닭장수</span>
        </p>
        <p className="store-lights__message">동네의 저녁을,<br />따뜻하게 밝힙니다.</p>
      </header>

      <div className="store-lights__visual">
        <div className="store-lights__map" role="group" aria-label="지역별 매장 분포. 지역 이름을 누르면 매장을 확인할 수 있습니다.">
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
            <g className="store-lights__leaders">
              <path d="M270 91H300L313 78 M153 164H181 M60 236L73 250 M361 233H383 M273 302H345 M314 377H355 M143 465H166 M428 459H452" />
            </g>
            {revealOrder.map((store, index) => <g
              key={store.id}
              className={`store-lights__light${index < visibleCount ? ' is-lit' : ''}${hasSelected && store.region === selected.region ? ' is-region' : ''}${hasSelected && store.id === selected.id ? ' is-selected' : ''}`}
              data-store-id={store.id}
              style={{ '--wave-delay': `${waveDelays[store.region] + (index % 4) * 0.06}s` }}
              transform={`translate(${store.x} ${store.y})`}
            >
              <circle className="store-lights__wave-glow" r="23" />
              <circle className="store-lights__halo" r="14" />
              <circle className="store-lights__arrival" r="9" />
              <circle className="store-lights__wave" r="9" />
              <circle className="store-lights__point" r="5" />
              <circle className="store-lights__ring" r="12" />
            </g>)}
          </svg>
          {regions.map(region => <button
            className="store-lights__region"
            key={region.name}
            style={{ left: `${region.x / 560 * 100}%`, top: `${region.y / 540 * 100}%`, '--wave-delay': `${waveDelays[region.name]}s` }}
            type="button"
            aria-label={`${region.name} 매장 ${region.stores.length}곳 보기`}
            aria-pressed={hasSelected && selected.region === region.name}
            onClick={() => selectRegion(region)}
          ><span>{region.name}</span><strong>{region.stores.length}</strong></button>)}
        </div>
        <div className="store-lights__map-footer">
          <button type="button" className="store-lights__replay" onClick={() => setReplay(value => value + 1)}>
            <span aria-hidden="true">↻</span> 다시 불 켜기
          </button>
        </div>
      </div>

      <div className="store-lights__location">
        <div className="store-lights__select-wrap">
          <label htmlFor="store-lights-select">우리 동네 닭장수</label>
          <div className="store-lights__select-field">
            <select id="store-lights-select" value={selectedId} onChange={event => { finishRef.current(); setSelectedId(event.target.value); setHasSelected(true); }}>
              {regions.map(region => <optgroup label={`${region.name} ${region.stores.length}곳`} key={region.name}>
                {region.stores.map(store => <option key={store.id} value={store.id}>{store.region} {store.name}</option>)}
              </optgroup>)}
            </select>
            <span aria-hidden="true">⌄</span>
          </div>
        </div>
        <p className="store-lights__address" aria-live="polite">{selected.address}</p>
        <p className="store-lights__note"><time dateTime={storeAsOf}>2026.10.27</time> 매장 목록 기준 <br />위치는 지역 기준으로 표시했습니다.</p>
      </div>
    </div>
  </section>;
}
