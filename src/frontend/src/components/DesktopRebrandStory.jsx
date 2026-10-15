import { useEffect, useRef, useState } from 'react';
import { assetPath } from '../assetPath';
import SlotNumber from './SlotNumber';
import RebrandRecruitmentMotion from './RebrandRecruitmentMotion';
import DesktopSupportLift from './DesktopSupportLift';
import './DesktopRebrandStory.css';

const chapters = ['닭장수', '브랜드', '오픈', '주방', '물류'];
const offers = [
  { kind: 'opening', heading: ['오픈 준비부터', '첫 홍보까지.'], amount: '740', unit: '만원 상당', pose: '/rebrand/poses/opening-package-v1/03-present.png', facts: [['가맹비와 교육비 면제', '440만원'], ['오픈행사 생닭 200수', '100만원 상당'], ['오픈 마케팅', '200만원 상당']] },
  { kind: 'kitchen', heading: ['냉장고와 튀김기,', '준비에 보태세요.'], amount: '500', unit: '만원 상당', pose: '/rebrand/poses/kitchen-support-v1/04-rest.png', facts: [['간냉식 냉장고', '300만원 상당'], ['튀김기', '200만원 상당']] },
  { kind: 'growth', heading: ['매달 나가는', '물류비까지 지원.'], prefix: '월 최대', amount: '100', unit: '만원 크레딧', pose: '/rebrand/character-cutout.png', facts: [['월매출 3,000만원 이상', '30만원'], ['월매출 4,000만원 이상', '100만원']] },
];

// Each desktop act shares the page's visibility pause without changing mobile motion.
function useDesktopAct(ref, active, reducedMotion, build) {
  const [phase, setPhase] = useState('loading');
  useEffect(() => {
    const root = ref.current;
    let disposed = false, onScreen = true, animations = [];
    root.dataset.motion = !active || reducedMotion ? 'static' : 'loading';
    setPhase(root.dataset.motion);
    if (!active || reducedMotion) return;
    const story = root.closest('.dks-desktop-story');
    const sync = () => {
      const paused = !onScreen || document.hidden || story.dataset.motionPaused === 'true';
      animations.forEach(animation => {
        if (paused && animation.playState === 'running') animation.pause();
        else if (!paused && animation.playState === 'paused') animation.play();
      });
    };
    const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    observer.observe(root);
    const changes = new MutationObserver(sync);
    changes.observe(story, { attributes: true, attributeFilter: ['data-motion-paused'] });
    document.addEventListener('visibilitychange', sync);
    Promise.all([...root.querySelectorAll('img')].map(image => image.decode())).then(() => {
      if (disposed) return;
      const animate = (element, frames, options) => {
        const animation = element.animate(frames, { fill: 'both', easing: 'cubic-bezier(.22,.7,.3,1)', ...options });
        animations.push(animation);
        return animation;
      };
      build(root, animate, () => setPhase('settled'));
      const epoch = document.timeline.currentTime;
      animations.forEach(animation => { animation.startTime = epoch; });
      root.dataset.motion = 'playing';
      setPhase('playing');
      sync();
    }).catch(() => { if (!disposed) { root.dataset.motion = 'static'; setPhase('static'); } });
    return () => {
      disposed = true;
      animations.forEach(animation => animation.cancel());
      observer.disconnect(); changes.disconnect();
      document.removeEventListener('visibilitychange', sync);
      root.dataset.motion = 'static';
    };
  }, [ref, active, reducedMotion, build]);
  return phase;
}

function animateHero(root, animate, onFinished) {
  const offer = animate(root.querySelector('.dks-hero-offers'), [
    { offset: 0, opacity: 1 }, { offset: 4050 / 5850, opacity: 1 },
    { offset: 4250 / 5850, opacity: 0 }, { offset: 1, opacity: 0 },
  ], { duration: 5850, easing: 'linear' });
  animate(root.querySelector('.dks-zero b'), [
    { transform: 'perspective(600px) rotateY(0deg) scale(1)' },
    { transform: 'perspective(600px) rotateY(180deg) scale(1.06)' },
    { transform: 'perspective(600px) rotateY(360deg) scale(1)' },
  ], { delay: 1050, duration: 1400, easing: 'cubic-bezier(.4,0,.2,1)' });
  animate(root.querySelector('.dks-zero-shine'), [
    { offset: 0, opacity: 0, backgroundPosition: '100% 50%' },
    { offset: .15, opacity: 1 }, { offset: .85, opacity: 1 },
    { offset: 1, opacity: 0, backgroundPosition: '0% 50%' },
  ], { delay: 2550, duration: 850, easing: 'linear' });
  animate(root.querySelector('.dks-hero-recruitment'), [{ opacity: 0 }, { opacity: 1 }], { delay: 4250, duration: 400 });
  offer.onfinish = () => { root.dataset.motion = 'settled'; onFinished(); };
}

function DesktopHero({ active, reducedMotion, onConditionsClick }) {
  const ref = useRef(null);
  const phase = useDesktopAct(ref, active, reducedMotion, animateHero);
  return <div className="dks-hero-frame" ref={ref} data-motion="loading">
    <div className="dks-hero-offers" aria-hidden="true">
      <div className="dks-hero-offer">
        <p className="dks-offer-number"><b><SlotNumber value="2,800" active={active} reducedMotion={reducedMotion} duration={.76} stagger={.08} /></b><span>만원</span></p>
        <p className="dks-offer-note">조건 충족 가정, 2년 합산 계산 예시</p>
      </div>
      <div className="dks-hero-offer">
        <p className="dks-waiver-heading">가맹비, 교육비<br />첫 2년 로열티</p>
        <p className="dks-offer-number dks-zero"><b><SlotNumber value="0" active={false} reducedMotion /><span className="dks-zero-shine">0</span></b><span>원</span></p>
        <p className="dks-offer-note">조건 충족 시 면제</p>
      </div>
    </div>
    <div className="dks-hero-recruitment" inert={phase === 'loading' || phase === 'playing'}>
      <figure className="dks-hero-character"><RebrandRecruitmentMotion active={active} reducedMotion={reducedMotion} delay={4250} duration={1200} /></figure>
      <h1 tabIndex={-1}><span>닭장수가</span><span><strong>장사에 진심인</strong> 사장님을 원합니다.</span></h1>
      <a className="dks-condition-button" href="#rebrand-benefits" onClick={onConditionsClick}>지원 조건 확인하기 <span aria-hidden="true">↗</span></a>
    </div>
  </div>;
}

function animateBrand(root, animate) {
  const cues = [
    ['.dks-brand-together', 0, 800, 'translateX(-28px)'],
    ['.dks-brand-emphasis', 950, 900, 'scale(1.08)'],
    ['.dks-brand-close', 1950, 800, 'translateY(26px)'],
    ['.dks-brand-offer', 2700, 650, 'translateY(12px)'],
    ['.dks-brand-invitation', 3600, 700, 'translateY(12px)'],
  ];
  cues.forEach(([selector, delay, duration, transform]) => animate(root.querySelector(selector), [
    { opacity: 0, transform }, { opacity: 1, transform: 'none' },
  ], { delay, duration }));
}
function DesktopBrand({ active, reducedMotion }) {
  const ref = useRef(null);
  useDesktopAct(ref, active, reducedMotion, animateBrand);
  return <div className="dks-brand-layout" ref={ref}>
    <div><p className="dks-index">02 / 새로운 닭장수</p><h2 tabIndex={-1}><span className="dks-brand-together">함께,</span><strong className="dks-brand-emphasis">제대로</strong><span className="dks-brand-close">장사해 봅시다.</span></h2></div>
    <div className="dks-brand-support"><p className="dks-brand-offer">새 출발을 위한<br /><strong>창업지원을 준비했습니다.</strong></p><p className="dks-brand-invitation">이제,<br /><strong><span>사장님</span>{' '}<span>차례입니다.</span></strong></p></div>
  </div>;
}
function animateSupport(root, animate) {
  animate(root.querySelector('.dks-support-character'), [
    { opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' },
  ], { delay: 250, duration: 1100 });
}
function DesktopSupport({ offer, index, active, reducedMotion, onConditionsClick }) {
  const ref = useRef(null);
  useDesktopAct(ref, active && offer.kind !== 'growth', reducedMotion, animateSupport);
  return <div className={`dks-support dks-support--${offer.kind}`} ref={ref} data-lift="static">
    <div className="dks-support-layout">
      <div className="dks-support-copy">
        <p className="dks-index">0{index + 1} / {chapters[index]} 지원</p>
        <h2 tabIndex={-1}>{offer.heading.map(line => <span key={line}>{line}</span>)}</h2>
        <p className="dks-support-amount">{offer.prefix && <span className="dks-amount-prefix">{offer.prefix}</span>}<b><SlotNumber value={offer.amount} active={active && offer.kind !== 'growth'} reducedMotion={reducedMotion} /></b><span className="dks-unit">{offer.unit}</span></p>
        {offer.facts && <dl className="dks-facts" aria-label={offer.kind === 'growth' ? '월매출별 물류 크레딧 지원 기준' : `${chapters[index]} 지원 구성`}>{offer.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
        <a className="dks-condition-button" href="#rebrand-benefits" onClick={onConditionsClick}>지원 조건 확인하기 <span aria-hidden="true">↗</span></a>
      </div>
      <img className="dks-support-character" src={assetPath(offer.pose)} alt={`${chapters[index]} 지원을 안내하는 닭장수`} width="1122" height="1402" loading="lazy" />
    </div>
    {offer.kind === 'growth' && <DesktopSupportLift active={active} reducedMotion={reducedMotion} />}
  </div>;
}

export default function DesktopRebrandStory({ onConditionsClick }) {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [replay, setReplay] = useState(() => chapters.map(() => 0));
  useEffect(() => {
    const root = rootRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const panels = [...root.querySelectorAll('.dks-scene')];
    let frame = 0;
    const paint = () => {
      frame = 0;
      const header = document.querySelector('.rebrand-header').offsetHeight;
      const readingLine = header + Math.min(260, (window.innerHeight - header) * .35);
      const next = panels.findIndex(panel => panel.getBoundingClientRect().bottom > readingLine);
      setActive(next < 0 ? panels.length - 1 : next);
      const bounds = root.getBoundingClientRect();
      setVisible(bounds.top <= header + 2 && bounds.bottom > header + 180);
      root.dataset.motionPaused = String(document.hidden || bounds.bottom < header || bounds.top >= window.innerHeight);
      setReducedMotion(preference.matches);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(paint); };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    document.addEventListener('visibilitychange', request);
    preference.addEventListener('change', request);
    const observer = new ResizeObserver(request);
    observer.observe(root);
    paint();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('scroll', request); window.removeEventListener('resize', request);
      document.removeEventListener('visibilitychange', request); preference.removeEventListener('change', request);
    };
  }, []);
  const goTo = (index, focus) => {
    const panel = rootRef.current.querySelectorAll('.dks-scene')[index];
    if (active === index) setReplay(values => values.map((value, i) => i === index ? value + 1 : value));
    panel.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'instant' : 'smooth' });
    if (focus) panel.querySelector('h1, h2').focus({ preventScroll: true });
  };
  return <section className="dks-desktop-story" id="rebrand-story" aria-label="스크롤로 만나는 닭장수" ref={rootRef} data-reduced={reducedMotion}>
    <article className="dks-scene dks-scene--hero"><DesktopHero key={replay[0]} active={active === 0} reducedMotion={reducedMotion} onConditionsClick={onConditionsClick} /></article>
    <article className="dks-scene dks-scene--brand"><DesktopBrand key={replay[1]} active={active === 1} reducedMotion={reducedMotion} /></article>
    {offers.map((offer, i) => <article className={`dks-scene dks-scene--${offer.kind}`} key={offer.kind}><DesktopSupport key={`${offer.kind}-${replay[i + 2]}`} offer={offer} index={i + 2} active={active === i + 2} reducedMotion={reducedMotion} onConditionsClick={onConditionsClick} /></article>)}
    <nav className="dks-progress" aria-label="닭장수 이야기 진행" data-visible={visible} aria-hidden={!visible} inert={!visible}><ol>{chapters.map((label, i) => <li key={label}><button type="button" aria-label={`${i + 1}번 ${label} 장면`} aria-current={active === i ? 'step' : undefined} onClick={event => goTo(i, event.detail === 0)}><span>{String(i + 1).padStart(2, '0')}</span>{label}</button></li>)}</ol></nav>
  </section>;
}
