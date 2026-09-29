import { useEffect, useRef, useState } from 'react';
import { assetPath } from '../assetPath';
import JangsuMotion from './JangsuMotion';
import './RebrandScrollStory.css';

const chapters = ['닭장수', '후라이드', '공간', '시작', '우리 동네'];
const desktopFrames = [
  [50, 83, -1], [81, 88, -8], [88, 48, -3], [22, 77, -5], [50, 76, -31],
];
const mobileFrames = [
  [65, 65, 1], [70, 49, -3], [78, 39, -2], [75, 47, -2], [57, 58, 3],
];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function RebrandScrollStory() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const characterRef = useRef(null);
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

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
      const progress = clamp((header - track.getBoundingClientRect().top) / travel, 0, 1) * 4;
      const current = Math.round(progress);
      if (lastActive !== current) {
        lastActive = current;
        setActive(current);
      }
      const frames = window.innerWidth <= 700 ? mobileFrames : desktopFrames;
      const from = Math.floor(progress);
      const to = Math.min(4, from + 1);
      const fraction = progress - from;
      const eased = fraction * fraction * (3 - 2 * fraction);
      const values = frames[from].map((value, i) => value + (frames[to][i] - value) * eased);
      character.style.left = `${values[0]}%`;
      character.style.height = `${values[1]}%`;
      character.style.bottom = `${values[2]}%`;
      stage.style.setProperty('--chapter-progress', `${progress / 4 * 100}%`);
      panels.forEach((panel, i) => {
        if (panel) panel.style.opacity = String(clamp(1 - Math.abs(progress - i) * 1.7, 0, 1));
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
    const top = window.scrollY + track.getBoundingClientRect().top - header;
    window.scrollTo({ top: top + (track.offsetHeight - stage.offsetHeight) * index / 4, behavior: 'smooth' });
  };
  const panelProps = (index) => ({
    'aria-hidden': reducedMotion ? undefined : active !== index,
    inert: !reducedMotion && active !== index,
  });

  return (
    <section className="jangsu-story" ref={trackRef} aria-label="스크롤로 만나는 닭장수" data-reduced={reducedMotion}>
      <div className="jangsu-stage" ref={stageRef} data-scene={active}>
        <div className="jangsu-stage-kicker"><span>DAKJANGSU FRIED CHICKEN</span><span>닭장수가 보여드릴게요</span></div>
        <article className="jangsu-panel jangsu-panel--welcome" {...panelProps(0)}>
          <img className="jangsu-story-logo" src={assetPath('/rebrand/bi-warm-ink.png')} alt="닭장수후라이드 和" width="1024" height="256" fetchPriority="high" />
          <img className="jangsu-reduced-character" src={assetPath('/rebrand/character-cutout.png')} alt="닭장수 캐릭터" width="1122" height="1402" />
          <h1>반갑습니다.<br />저는<br />닭장수입니다.</h1>
          <div className="jangsu-welcome-copy"><p>어떤 치킨을 팔고,<br />어떤 가게를 열지.<br />저와 함께 둘러보시죠.</p><a href="#rebrand-menu">자세한 메뉴 보기 ↗</a></div>
        </article>
        <article className="jangsu-panel jangsu-panel--chicken" {...panelProps(1)}>
          <span className="jangsu-scene-number">01 / THE CHICKEN</span>
          <h2>시작은,<br /><em>후라이드.</em></h2>
          <figure><img src={assetPath('/images/dakjangsu-product-showcase-real.jpg')} alt="닭장수 매장에 준비된 후라이드 치킨" width="2400" height="1600" /><figcaption>포장 한 상자에도. 홀의 한 접시에도.</figcaption></figure>
        </article>
        <article className="jangsu-panel jangsu-panel--space" {...panelProps(2)}>
          <img className="jangsu-space-backdrop" src={assetPath('/rebrand/interior-35-45.jpg')} alt="벽돌과 스테인리스로 구성한 닭장수의 매장 공간 콘셉트" width="1400" height="788" />
          <div className="jangsu-space-caption"><span className="jangsu-scene-number">02 / THE SPACE</span><h2>한 마리 포장도.<br />한잔할 자리도.</h2><p>어떤 동네에서, 어떤 손님을 만날까요?<br />가게 안으로 들어가 보시죠.</p><a href="#rebrand-space">공간 콘셉트 자세히 보기 ↗</a></div>
          <small>공간 콘셉트 시각화 / 실제 시공 사진 아님</small>
        </article>
        <article className="jangsu-panel jangsu-panel--support" {...panelProps(3)}>
          <div><span className="jangsu-scene-number">03 / THE START</span><h2>시작의 부담,<br />함께 살펴봅시다.</h2><p className="jangsu-support-amount"><strong>440</strong><span>만원<br />면제안</span></p><p>가맹비 275만원 + 교육비 165만원, 부가세 포함. <br />2026년 8월 초안이며, 시행과 적용 조건은 본사 확인이 필요합니다.</p><a href="#rebrand-benefits">전체 지원 항목과 조건 보기 ↗</a></div>
        </article>
        <article className="jangsu-panel jangsu-panel--invite" {...panelProps(4)}>
          <span className="jangsu-scene-number">04 / YOUR NEIGHBORHOOD</span><h2>어느 동네에<br />문을 열까요?</h2><div className="jangsu-invite-copy"><p>점포가 있어도, 아직 없어도.<br />희망 지역부터 알려주세요.</p><a href="#lead-capture">내 지역 창업 상담 <span aria-hidden="true">↗</span></a></div>
        </article>
        <div className="jangsu-traveler" ref={characterRef} aria-hidden="true"><JangsuMotion scene={active} /></div>
        <div className="jangsu-stage-footer"><span>SCROLL TO EXPLORE ↓</span><nav aria-label="닭장수 이야기 장면">{chapters.map((label, index) => <button key={label} type="button" aria-current={active === index ? 'step' : undefined} onClick={() => goToChapter(index)}><small>0{index + 1}</small><span>{label}</span></button>)}</nav></div>
      </div>
    </section>
  );
}
