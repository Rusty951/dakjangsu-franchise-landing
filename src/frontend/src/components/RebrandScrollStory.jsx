import { useEffect, useRef, useState } from 'react';
import { assetPath } from '../assetPath';
import JangsuMotion from './JangsuMotion';
import JangsuLiftMotion from './JangsuLiftMotion';
import SlotNumber from './SlotNumber';
import './RebrandScrollStory.css';
import './JangsuBenefitScenes.css';

const chapters = ['닭장수', '가맹비', '오픈', '주방', '로열티', '운영', '상담'];
const desktopFrames = [
  [50, 83, -1], [84, 67, -8], [17, 70, -8], [84, 67, -8], [18, 71, -8], [85, 65, -8], [50, 76, -31],
];
const mobileFrames = [
  [66, 64, 0], [85, 30, -2], [18, 26, -2], [85, 30, -2], [18, 26, -2], [85, 30, -2], [57, 58, 3],
];
const benefits = [
  { id: 'fee', label: '가맹비와 교육비', amount: '440', unit: '만원', title: '전액 면제안', detail: '가맹비 275만원 + 교육비 165만원. 부가세를 포함한 합계입니다.', note: '2026년 8월 신규 가맹 혜택 초안. 시행 여부와 적용 조건은 본사 확인이 필요합니다.' },
  { id: 'opening', label: '문 여는 준비를 함께', amount: '740', unit: '만원 상당', title: '오픈 패키지안', detail: '앞서 본 440만원 면제에, 생닭 200수 100만원 상당과 오픈 마케팅 200만원 상당을 포함한 합계입니다.', note: '440만원과 별도로 더해지는 금액이 아닙니다. 현금 지급이 아닌 면제와 현물, 마케팅 지원안입니다.' },
  { id: 'kitchen', label: '주방을 준비할 때도', amount: '500', unit: '만원 상당', title: '주방 지원안', detail: '간냉식 냉장고 300만원 상당 + 최신형 튀김기 200만원 상당.', note: '조건 충족 매장 중 선착순 5개점 대상안. 15평 이상, 상권 조건, 전체 신규 인테리어와 본사 검수, 24개월 의무 운영 조건이 있습니다.' },
  { id: 'royalty', label: '매달 내는 로열티,', amount: '0', unit: '원', title: '첫 2년 전액 면제안', note: '정상 로열티 월 매출액 3.3%를 최초 계약 2년간 면제하는 안입니다. 시행 여부와 최종 적용 조건은 본사 확인이 필요합니다.' },
  { id: 'growth', label: '매출 기준 달성 시, 월 최대', amount: '100', unit: '만원', title: '물류 크레딧 지원안', detail: '월 매출 3,000만원 이상은 30만원, 4,000만원 이상은 100만원. 개점월부터 12개월 내 달성 월에 적용하는 안입니다.', note: '매출 증빙 제출 후 익월 물류대금에서 차감합니다. 현금 지급이나 매출 보장을 뜻하지 않습니다.' },
];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function RebrandScrollStory() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const characterRef = useRef(null);
  const [active, setActive] = useState(0);
  const [settled, setSettled] = useState(-1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [liftAssets, setLiftAssets] = useState('loading');
  const [liftReplay, setLiftReplay] = useState(0);
  const [liftParked, setLiftParked] = useState(false);
  const liftReady = liftAssets === 'ready' && !reducedMotion;
  const liftStatus = reducedMotion ? 'static' : liftAssets === 'ready' ? (liftParked ? 'parked' : 'playing') : liftAssets;

  useEffect(() => {
    let disposed = false;
    // Decode all keys before starting the act so the raised hands never pop in late.
    const images = ['ready', 'mid', 'push'].map(pose => {
      const image = new Image();
      image.src = assetPath(`/rebrand/character-lift-${pose}.webp`);
      return image.decode();
    });
    Promise.all(images).then(() => {
      if (!disposed) setLiftAssets('ready');
    }).catch(() => {
      if (!disposed) setLiftAssets('error');
    });
    return () => { disposed = true; };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const panels = [...stageRef.current.querySelectorAll('.jangsu-panel')];
    const track = trackRef.current;
    let onScreen = true;
    const syncMotion = () => {
      track.dataset.motionPaused = String(!onScreen || document.hidden || preference.matches);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      syncMotion();
    });
    visibility.observe(track);
    document.addEventListener('visibilitychange', syncMotion);
    preference.addEventListener('change', syncMotion);
    syncMotion();
    let frame = 0;
    let lastActive = -1;
    const paint = () => {
      frame = 0;
      const track = trackRef.current;
      const stage = stageRef.current;
      const character = characterRef.current;
      if (!track || !stage || !character) return;
      const reduced = preference.matches;
      setReducedMotion(reduced);
      if (reduced) {
        panels.forEach(panel => panel?.style.removeProperty('opacity'));
        return;
      }
      const header = document.querySelector('.rebrand-header')?.offsetHeight ?? 80;
      const travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
      const progress = clamp((header - track.getBoundingClientRect().top) / travel, 0, 1) * (chapters.length - 1);
      const current = Math.round(progress);
      if (lastActive !== current) {
        lastActive = current;
        setActive(current);
        setSettled(-1);
        setLiftParked(false);
      }
      const frames = window.innerWidth <= 700 ? mobileFrames : desktopFrames;
      // Keep the host in the active chapter's reserved lane at every scroll offset.
      // The lift actor uses this same lane after its opening performance.
      const values = [...frames[current]];
      if (current >= 1 && current <= 5) {
        values[0] = window.innerWidth <= 700 ? frames[current][0] : (current % 2 ? 85 : 16);
        values[2] = window.innerWidth <= 700 ? 9 : 2;
        values[1] = window.innerWidth <= 700 ? 19 : 68;
        if (window.innerWidth <= 700) {
          const copy = panels[current].querySelector('.benefit-scene-copy');
          const copyBottom = copy.getBoundingClientRect().bottom - stage.getBoundingClientRect().top;
          const available = Math.max(0, stage.offsetHeight * .91 - 12 - copyBottom);
          values[1] = Math.min(values[1], available / stage.offsetHeight * 100);
        }
      }
      character.style.left = `${values[0]}%`;
      character.style.height = `${values[1]}%`;
      character.style.bottom = `${values[2]}%`;
      stage.style.setProperty('--chapter-progress', `${progress / (chapters.length - 1) * 100}%`);
      // Keep the reading surface opaque even when scrolling stops between
      // chapter centers. Only the character interpolates continuously.
      panels.forEach((panel, i) => {
        panel.style.opacity = i === current ? '1' : '0';
      });
    };
    const requestPaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    window.addEventListener('scroll', requestPaint, { passive: true });
    window.addEventListener('resize', requestPaint);
    preference.addEventListener('change', requestPaint);
    const observer = new ResizeObserver(requestPaint);
    observer.observe(trackRef.current);
    panels.forEach(panel => {
      const copy = panel.querySelector('.benefit-scene-copy');
      if (copy) observer.observe(copy);
    });
    paint();
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestPaint);
      window.removeEventListener('resize', requestPaint);
      preference.removeEventListener('change', requestPaint);
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', syncMotion);
      preference.removeEventListener('change', syncMotion);
    };
  }, []);

  const goToChapter = (index) => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const header = document.querySelector('.rebrand-header')?.offsetHeight ?? 80;
    if (reducedMotion) {
      const panel = stage.querySelectorAll('.jangsu-panel')[index];
      window.scrollTo({ top: window.scrollY + panel.getBoundingClientRect().top - header, behavior: 'instant' });
      return;
    }
    if (index === 5 && active === 5) {
      setSettled(-1);
      setLiftParked(false);
      setLiftReplay(replay => replay + 1);
      return;
    }
    const top = window.scrollY + track.getBoundingClientRect().top - header;
    window.scrollTo({ top: top + (track.offsetHeight - stage.offsetHeight) * index / (chapters.length - 1), behavior: 'smooth' });
  };
  const panelProps = (index) => ({
    'aria-hidden': reducedMotion ? undefined : active !== index,
    inert: !reducedMotion && active !== index,
  });

  return (
    <section className="jangsu-story" ref={trackRef} aria-label="스크롤로 만나는 닭장수" data-reduced={reducedMotion}>
      <div className="jangsu-stage" ref={stageRef} data-scene={active} data-settled={reducedMotion || settled === active} data-lift-ready={liftReady} data-lift-status={liftStatus}>
        <div className="jangsu-stage-kicker"><span>DAKJANGSU FRIED CHICKEN</span><span>닭장수가 보여드릴게요</span></div>
        <img className="jangsu-story-logo hero-stage-logo" src={assetPath('/rebrand/bi-warm-ink.png')} alt="닭장수후라이드 和" width="1024" height="256" fetchPriority="high" />
        <article className="jangsu-panel jangsu-panel--welcome" {...panelProps(0)}>
          <img className="jangsu-reduced-character" src={assetPath('/rebrand/character-cutout.png')} alt="닭장수 캐릭터" width="1122" height="1402" />
          <div className="benefits-intro"><h1>창업 혜택,<br />이만큼.</h1><button type="button" onClick={() => goToChapter(1)}>스크롤해서 혜택 보기 ↓</button></div>
          <div className="benefits-preview" aria-label="주요 창업 혜택 초안">
            <button type="button" onClick={() => goToChapter(1)}><span>가맹비와 교육비 면제안</span><strong>440<small>만원</small></strong></button>
            <button type="button" onClick={() => goToChapter(3)}><span>조건 충족 매장 주방 지원안</span><strong>500<small>만원 상당</small></strong></button>
            <button type="button" onClick={() => goToChapter(4)}><span>첫 2년 로열티 면제안</span><strong>0<small>원</small></strong></button>
          </div>
          <p className="benefits-intro-note">2026년 8월 신규 가맹 혜택 초안<br />시행 여부와 적용 조건은 본사 확인이 필요합니다.</p>
        </article>
        {benefits.map((benefit, index) => (
          <article key={benefit.id} className={`jangsu-panel jangsu-panel--benefit benefit-scene--${benefit.id}`} {...panelProps(index + 1)}>
            <div className="benefit-scene-copy">
              <span className="benefit-scene-index">0{index + 1} / 05 OPENING BENEFITS</span>
              <h2>
                <span>{benefit.label}</span>
                <strong>{benefit.id === 'growth' ? <span className="growth-lift-number" key={liftReplay}>
                  <SlotNumber value={benefit.amount} active={active === 5 && liftAssets !== 'loading'} reducedMotion={reducedMotion} delay={liftReady ? .76 : 0} onComplete={() => setSettled(5)} /><small>{benefit.unit}</small>
                </span> : <><SlotNumber value={benefit.amount} active={active === index + 1} reducedMotion={reducedMotion} onComplete={() => setSettled(index + 1)} /><small>{benefit.unit}</small></>}</strong>
                <b>{benefit.title}</b>
              </h2>
              {benefit.detail && <p className="benefit-scene-detail">{benefit.detail}</p>}
              <p className="benefit-scene-note">{benefit.note}</p>
              <a href="#rebrand-benefits">전체 지원 내용과 조건 보기 ↗</a>
            </div>
          </article>
        ))}
        <article className="jangsu-panel jangsu-panel--invite" {...panelProps(6)}>
          <span className="jangsu-scene-number">YOUR NEIGHBORHOOD</span><h2>내 점포에는<br />어떤 혜택이?</h2><div className="jangsu-invite-copy"><p>점포가 있어도, 아직 없어도.<br />희망 지역부터 알려주세요.</p><a href="#lead-capture">내 점포 혜택 상담 <span aria-hidden="true">↗</span></a></div>
        </article>
        <div className="jangsu-traveler" ref={characterRef} aria-hidden="true">{(active !== 5 || liftAssets === 'error') && <JangsuMotion scene={active} greeting={active === 0 || active === 6} />}</div>
        {active === 5 && liftAssets !== 'error' && <JangsuLiftMotion key={liftReplay} stageRef={stageRef} characterRef={characterRef} ready={liftReady} onComplete={() => setLiftParked(true)} />}
        <div className="jangsu-stage-footer"><span>SCROLL TO EXPLORE ↓</span><nav aria-label="닭장수 이야기 장면">{chapters.map((label, index) => <button key={label} type="button" aria-current={active === index ? 'step' : undefined} onClick={() => goToChapter(index)}><small>0{index + 1}</small><span>{label}</span></button>)}</nav></div>
      </div>
    </section>
  );
}
