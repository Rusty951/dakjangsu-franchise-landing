import { useEffect, useRef, useState } from 'react';
import { assetPath } from '../assetPath';
import SlotNumber from './SlotNumber';
import MobileSupportLift from './MobileSupportLift';
import SupportGesture from './SupportGesture';
import './MobileSupportPanel.css';

const offers = {
  opening: {
    title: '오픈', heading: ['오픈 준비부터', '첫 홍보까지.'], amount: '740', unit: '만원 상당',
    pose: '/rebrand/poses/opening-package-v1/03-present.png',
    facts: [['가맹비와 교육비 면제', '440만원'], ['오픈행사 생닭 200수', '100만원 상당'], ['오픈 마케팅', '200만원 상당']],
  },
  kitchen: {
    title: '주방', heading: ['냉장고와 튀김기,', '준비에 보태세요.'], amount: '500', unit: '만원 상당',
    pose: '/rebrand/poses/kitchen-support-v1/04-rest.png',
    facts: [['간냉식 냉장고', '300만원 상당'], ['튀김기', '200만원 상당']],
  },
  operating: {
    title: '로열티', heading: ['첫 2년,', '로열티 면제안'], amount: '0', unit: '원',
    pose: '/rebrand/poses/royalty-zero-v1/03-push.png',
  },
  growth: {
    title: '물류', heading: ['매달 나가는', '물류비까지 지원.'], prefix: '월 최대', amount: '100', unit: '만원 크레딧',
    pose: '/rebrand/character-cutout.png',
    facts: [['월매출 3,000만원 이상', '30만원'], ['월매출 4,000만원 이상', '100만원']],
  },
};

export default function MobileSupportPanel({ kind, index, active, reducedMotion, onConditionsClick, replay = 0 }) {
  const rootRef = useRef(null);
  const [gestureReady, setGestureReady] = useState(false);
  const offer = offers[kind];
  const hasGesture = kind === 'opening' || kind === 'kitchen';
  useEffect(() => {
    const root = rootRef.current;
    if (kind === 'growth' || hasGesture || !active || reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const story = root.closest('.jangsu-story');
    const actor = root.querySelector('.mobile-support-character');
    let disposed = false, onScreen = true, animations = [];
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
    actor.decode().then(() => {
      if (disposed) return;
      animations.push(actor.animate([
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 1100, delay: 250, fill: 'both', easing: 'cubic-bezier(.22,.7,.3,1)' }));
      sync();
    }).catch(() => {});
    return () => {
      disposed = true;
      animations.forEach(animation => animation.cancel());
      observer.disconnect(); changes.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [kind, active, reducedMotion, hasGesture]);
  return (
    <article className={`jangsu-panel mobile-support-panel mobile-support-panel--${kind}`} ref={rootRef} data-portrait-active={active} data-gesture-ready={hasGesture ? gestureReady : undefined}>
      <div className="mobile-support-copy">
        <p className="mobile-support-index">0{index + 1} / {offer.title} 지원</p>
        <div className="mobile-support-hero">
          <h2 tabIndex={-1}>{offer.heading.map(line => <span key={line}>{line}</span>)}</h2>
          <p className="mobile-support-amount">{offer.prefix && <span className="mobile-support-prefix">{offer.prefix}</span>}<b><SlotNumber key={replay} value={offer.amount} active={active && kind !== 'operating'} reducedMotion={reducedMotion} delay={hasGesture ? 1 : 0} duration={hasGesture ? 1.06 : 1.6} /></b><span>{offer.unit}</span></p>
          {hasGesture
            ? <SupportGesture kind={kind} label={`${offer.title} 지원을 안내하는 닭장수`} active={active} reducedMotion={reducedMotion} onReady={setGestureReady} layout="mobile" replay={replay} />
            : <img className="mobile-support-character" src={assetPath(offer.pose)} alt={`${offer.title} 지원을 안내하는 닭장수`} width="1122" height="1402" loading="lazy" />}
          {kind === 'growth' && <MobileSupportLift active={active} reducedMotion={reducedMotion} />}
        </div>
        {offer.facts && <dl className="mobile-support-facts" aria-label={kind === 'growth' ? '월매출별 물류 크레딧 지원 기준' : `${offer.title} 지원 구성`}>{offer.facts.map(([label, amount]) => <div key={label}><dt>{label}</dt><dd>{amount}</dd></div>)}</dl>}
        <a className="mobile-support-link" href="#rebrand-benefits" onClick={onConditionsClick}>지원 조건 확인하기 <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}
