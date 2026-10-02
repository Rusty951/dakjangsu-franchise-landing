import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { assetPath } from '../assetPath';
import JangsuMotion from './JangsuMotion';
import JangsuHeroMotion from './JangsuHeroMotion';
import JangsuFeeMotion from './JangsuFeeMotion';
import JangsuOpeningMotion from './JangsuOpeningMotion';
import JangsuKitchenMotion from './JangsuKitchenMotion';
import JangsuRoyaltyMotion from './JangsuRoyaltyMotion';
import JangsuInviteMotion from './JangsuInviteMotion';
import JangsuLiftMotion from './JangsuLiftMotion';
import SlotNumber from './SlotNumber';
import RebrandHeroOffer from './RebrandHeroOffer';
import './RebrandScrollStory.css';
import './JangsuBenefitScenes.css';

const chapters = ['닭장수', '가맹비', '오픈', '주방', '로열티', '운영', '상담'];
const desktopFrames = [
  [51, 78, 4], [84, 67, -8], [17, 70, -8], [84, 67, -8], [18, 71, -8], [85, 65, -8], [81, 80, 8],
];
const mobileFrames = [
  [73, 44, 35], [85, 30, -2], [18, 26, -2], [85, 30, -2], [18, 26, -2], [85, 30, -2], [78, 46, 20],
];
const benefits = [
  { id: 'fee', label: '가맹비와 교육비', amount: '440', unit: '만원', title: '전액 면제안', facts: [['가맹비', '275만원'], ['교육비', '165만원']], detail: '부가세를 포함한 합계입니다.', note: '2026년 8월 신규 가맹 혜택 초안. 시행 여부와 적용 조건은 본사 확인이 필요합니다.' },
  { id: 'opening', label: '문을 열 때 필요한 지원', amount: '740', unit: '만원 상당', title: '오픈 지원안', facts: [['가맹비 + 교육비 면제', '440만원'], ['오픈행사 생닭 200수', '100만원 상당'], ['오픈 마케팅', '200만원 상당']], note: '440만원 면제를 포함한 금액입니다. 면제와 현물, 마케팅 지원안이며 현금으로 지급하지 않습니다.' },
  { id: 'kitchen', label: '냉장고와 튀김기', amount: '500', unit: '만원 상당', title: '주방 지원안', facts: [['간냉식 냉장고', '300만원 상당'], ['최신형 튀김기', '200만원 상당']], note: '조건을 충족한 선착순 5개점 대상안입니다. 15평 이상, 상권 조건, 전체 신규 인테리어와 본사 검수, 24개월 의무 운영 조건이 있습니다.' },
  { id: 'royalty', label: '매달 내는 로열티', amount: '0', unit: '원', title: '첫 2년 전액 면제안', facts: [['정상 로열티', '월 매출액 3.3%']], note: '최초 계약 2년간 면제하는 혜택 초안입니다. 시행 여부와 최종 적용 조건은 본사 확인이 필요합니다.' },
  { id: 'growth', label: '매출 기준을 달성하면, 월 최대', amount: '100', unit: '만원', title: '물류 크레딧 지원안', tiers: [{ sales: '3,000만원', credit: '30만원' }, { sales: '4,000만원', credit: '100만원' }], detail: '개점월부터 12개월 내 기준을 달성한 월에 적용하는 안입니다.', note: '매출 증빙을 제출하면 다음 달 물류대금에서 차감합니다. 현금 지급이나 매출 보장은 아닙니다.' },
];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
// Use the readable, flowing composition for narrow portrait and short viewports.
const flowingStoryQuery = '(max-width: 1024px) and (orientation: portrait), (max-height: 640px)';

export default function RebrandScrollStory({ onConditionsClick }) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const characterRef = useRef(null);
  const lastReadingPosition = useRef({ index: 0, withinStory: true });
  const orientationRestore = useRef(null);
  const headingFocusTarget = useRef(null);
  const [active, setActive] = useState(0);
  const [portrait, setPortrait] = useState(false);

  useLayoutEffect(() => {
    const query = window.matchMedia(flowingStoryQuery);
    let initial = true;
    const update = () => {
      if (!initial) orientationRestore.current = { ...lastReadingPosition.current };
      initial = false;
      setPortrait(query.matches);
    };
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const [settled, setSettled] = useState(-1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [liftAssets, setLiftAssets] = useState('loading');
  const [liftReplay, setLiftReplay] = useState(0);
  const [heroReplay, setHeroReplay] = useState(0);
  const [feeReplay, setFeeReplay] = useState(0);
  const [openingReplay, setOpeningReplay] = useState(0);
  const [kitchenReplay, setKitchenReplay] = useState(0);
  const [royaltyReplay, setRoyaltyReplay] = useState(0);
  const [inviteReplay, setInviteReplay] = useState(0);
  const [liftParked, setLiftParked] = useState(false);
  const liftReady = liftAssets === 'ready' && !reducedMotion;
  const liftStatus = reducedMotion ? 'static' : liftAssets === 'ready' ? (liftParked ? 'parked' : 'playing') : liftAssets;

  useEffect(() => {
    let disposed = false;
    // Decode all keys before starting the act so the raised hands never pop in late.
    const sources = [...['ready', 'mid', 'push'].map(pose => `/rebrand/character-lift-${pose}.webp`), '/rebrand/character-cutout.png'];
    const images = sources.map(source => {
      const image = new Image();
      image.src = assetPath(source);
      return image.decode();
    });
    Promise.all(images).then(() => {
      if (!disposed) setLiftAssets('ready');
    }).catch(() => {
      if (!disposed) setLiftAssets('error');
    });
    return () => { disposed = true; };
  }, []);

  useLayoutEffect(() => {
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
      // A resize can arrive before React switches layouts. Preserve the last valid reading position.
      if (window.matchMedia(flowingStoryQuery).matches !== portrait) return;
      const reduced = preference.matches;
      setReducedMotion(reduced);
      const header = document.querySelector('.rebrand-header')?.offsetHeight ?? 80;
      if (portrait || reduced) {
        // Flowing and reduced-motion chapters track their real document positions.
        const navHeight = stage.querySelector('.jangsu-stage-footer').offsetHeight;
        const readingLine = header + navHeight + Math.min(180, window.innerHeight * .24);
        const nextPanel = panels.findIndex(panel => panel.getBoundingClientRect().bottom > readingLine);
        const index = nextPanel === -1 ? panels.length - 1 : nextPanel;
        lastReadingPosition.current = { index, withinStory: track.getBoundingClientRect().top <= header + 52 && track.getBoundingClientRect().bottom > header + 52 };
        if (lastActive !== index) {
          lastActive = index;
          setActive(index);
          setSettled(-1);
          setLiftParked(false);
        }
        panels.forEach(panel => panel.style.removeProperty('opacity'));
        const slot = panels[index].querySelector('.portrait-character-slot');
        if (slot && !reduced) {
          const box = slot.getBoundingClientRect();
          const stageBox = stage.getBoundingClientRect();
          stage.style.setProperty('--portrait-host-top', `${box.top - stageBox.top}px`);
          stage.style.setProperty('--portrait-host-height', `${box.height}px`);
          stage.style.setProperty('--portrait-host-width', `${box.width}px`);
          stage.style.setProperty('--portrait-host-left', `${box.left + box.width / 2 - stageBox.left}px`);
          stage.style.setProperty('--portrait-host-clip', `inset(${box.top - stageBox.top}px 0 ${stage.offsetHeight - (box.bottom - stageBox.top)}px 0)`);
        }
        return;
      }
      const travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
      const progress = clamp((header - track.getBoundingClientRect().top) / travel, 0, 1) * (chapters.length - 1);
      const current = Math.round(progress);
      lastReadingPosition.current = { index: current, withinStory: track.getBoundingClientRect().top <= header && track.getBoundingClientRect().bottom > header };
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
        values[0] = window.innerWidth <= 700 ? (current === 1 ? 75 : frames[current][0]) : ((current === 1 || current === 3) ? 82 : (current === 2 || current === 4) ? 18 : current % 2 ? 85 : 16);
        values[2] = window.innerWidth <= 700 ? 9 : 2;
        values[1] = window.innerWidth <= 700 ? 19 : (current >= 1 && current <= 4 ? 78 : 68);
        if (window.innerWidth <= 700) {
          const copy = panels[current].querySelector('.benefit-scene-copy');
          const copyBottom = copy.getBoundingClientRect().bottom - stage.getBoundingClientRect().top;
          const available = Math.max(0, stage.offsetHeight * .91 - 12 - copyBottom);
          values[1] = Math.min(values[1], available / stage.offsetHeight * 100);
          if (current === 1) {
            const footerTop = stage.querySelector('.jangsu-stage-footer').getBoundingClientRect().top - stage.getBoundingClientRect().top;
            const actorBottom = footerTop - 12;
            values[1] = Math.min(30, Math.max(0, actorBottom - copyBottom - 12) / stage.offsetHeight * 100);
            values[2] = (stage.offsetHeight - actorBottom) / stage.offsetHeight * 100;
            {
              const actorTop = copy.querySelector('h2').getBoundingClientRect().bottom - stage.getBoundingClientRect().top + 16;
              const portraitHeight = Math.min(230, Math.max(0, actorBottom - actorTop));
              values[0] = 80;
              values[1] = portraitHeight / stage.offsetHeight * 100;
              values[2] = (stage.offsetHeight - actorTop - portraitHeight) / stage.offsetHeight * 100;
            }
          }
          if (current === 2) {
            const actorTop = copy.querySelector('h2').getBoundingClientRect().bottom - stage.getBoundingClientRect().top + 16;
            const footerTop = stage.querySelector('.jangsu-stage-footer').getBoundingClientRect().top - stage.getBoundingClientRect().top;
            const portraitHeight = Math.min(window.innerHeight <= 700 ? 180 : 230, Math.max(0, footerTop - 12 - actorTop));
            values[0] = 16;
            values[1] = portraitHeight / stage.offsetHeight * 100;
            values[2] = (stage.offsetHeight - actorTop - portraitHeight) / stage.offsetHeight * 100;
          }
          if (current === 3) {
            const actorTop = copy.querySelector('h2').getBoundingClientRect().bottom - stage.getBoundingClientRect().top + 16;
            const noteTop = copy.querySelector('.benefit-scene-note').getBoundingClientRect().top - stage.getBoundingClientRect().top;
            const portraitHeight = Math.min(230, Math.max(0, noteTop - 12 - actorTop));
            values[0] = 80;
            values[1] = portraitHeight / stage.offsetHeight * 100;
            values[2] = (stage.offsetHeight - actorTop - portraitHeight) / stage.offsetHeight * 100;
          }
          if (current === 4) {
            const number = copy.querySelector('h2 > strong').getBoundingClientRect();
            const actorTop = number.top - stage.getBoundingClientRect().top + 8;
            const portraitHeight = Math.max(0, Math.min(250, number.height - 16));
            values[0] = 18;
            values[1] = portraitHeight / stage.offsetHeight * 100;
            values[2] = (stage.offsetHeight - actorTop - portraitHeight) / stage.offsetHeight * 100;
          }
        } else if (current < 5) {
          if (current === 4) values[0] = 17.5;
          const stageTop = stage.getBoundingClientRect().top;
          const copyBottom = panels[current].querySelector('.benefit-scene-copy').getBoundingClientRect().bottom - stageTop;
          const footerTop = stage.querySelector('.jangsu-stage-footer').getBoundingClientRect().top - stageTop;
          const visualHeight = Math.min(stage.offsetHeight * (current >= 1 && current <= 4 ? .78 : .68), window.innerWidth * (current >= 1 && current <= 4 ? .35 : .27) * 1402 / 1122);
          const number = current === 4 ? panels[current].querySelector('h2 > strong') : null;
          let numberTop = 0;
          for (let node = number; node && node !== stage; node = node.offsetParent) numberTop += node.offsetTop;
          // The presenting palm sits about 42% down the image. Keep it beside the zero,
          // independent of the note/table height, with room above chapter navigation.
          const presentationBottom = number ? numberTop + number.offsetHeight * .65 + visualHeight * .58 : null;
          const characterBottom = Math.min(footerTop - 12, presentationBottom ?? Math.max(copyBottom + 24, visualHeight + 50));
          values[2] = (stage.offsetHeight - characterBottom) / stage.offsetHeight * 100;
        }
      }
      if (current === 6) {
        const stageTop = stage.getBoundingClientRect().top;
        const invite = panels[current];
        if (window.innerWidth <= 700) {
          const headingBottom = invite.querySelector('h2').getBoundingClientRect().bottom - stageTop;
          const actionTop = invite.querySelector('.jangsu-invite-copy a').getBoundingClientRect().top - stageTop;
          values[1] = Math.min(280, Math.max(0, actionTop - headingBottom - 32)) / stage.offsetHeight * 100;
          values[2] = (stage.offsetHeight - actionTop + 12) / stage.offsetHeight * 100;
        } else {
          const copyBottom = invite.querySelector('.jangsu-invite-content').getBoundingClientRect().bottom - stageTop;
          const footerTop = stage.querySelector('.jangsu-stage-footer').getBoundingClientRect().top - stageTop;
          const visualHeight = Math.min(stage.offsetHeight * .8, Math.min(window.innerWidth * .4, 760) * 1402 / 1122);
          const characterBottom = Math.min(footerTop - 16, Math.max(copyBottom + 36, visualHeight + 60));
          values[2] = (stage.offsetHeight - characterBottom) / stage.offsetHeight * 100;
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
      const copy = panel.querySelector('.benefit-scene-copy, .jangsu-invite-content');
      if (copy) observer.observe(copy);
    });
    const restore = orientationRestore.current;
    orientationRestore.current = null;
    if (restore?.withinStory) {
      const header = document.querySelector('.rebrand-header')?.offsetHeight ?? 80;
      const top = window.scrollY + track.getBoundingClientRect().top - header;
      const destination = portrait
        ? window.scrollY + panels[restore.index].getBoundingClientRect().top - header - stageRef.current.querySelector('.jangsu-stage-footer').offsetHeight
        : top + (track.offsetHeight - stageRef.current.offsetHeight) * restore.index / (chapters.length - 1);
      window.scrollTo({ top: destination, behavior: 'instant' });
    }
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
  }, [portrait]);

  useEffect(() => {
    if (headingFocusTarget.current === active) {
      stageRef.current.querySelectorAll('.jangsu-panel')[active].querySelector('h2')?.focus({ preventScroll: true });
      headingFocusTarget.current = null;
    }
  }, [active]);

  const goToChapter = (index, focusHeading = false) => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const header = document.querySelector('.rebrand-header')?.offsetHeight ?? 80;
    if (portrait) {
      if (active === index) {
        if (index === 0) setHeroReplay(replay => replay + 1);
        if (index === 1) setFeeReplay(replay => replay + 1);
        if (index === 2) setOpeningReplay(replay => replay + 1);
        if (index === 3) setKitchenReplay(replay => replay + 1);
        if (index === 4) setRoyaltyReplay(replay => replay + 1);
        if (index === 5) { setLiftReplay(replay => replay + 1); setLiftParked(false); }
        if (index === 6) setInviteReplay(replay => replay + 1);
      }
      const panel = stage.querySelectorAll('.jangsu-panel')[index];
      if (focusHeading) panel.querySelector('h2')?.focus({ preventScroll: true });
      const navHeight = stage.querySelector('.jangsu-stage-footer').offsetHeight;
      window.scrollTo({ top: window.scrollY + panel.getBoundingClientRect().top - header - navHeight, behavior: reducedMotion ? 'instant' : 'smooth' });
      return;
    }
    if (reducedMotion) {
      const panel = stage.querySelectorAll('.jangsu-panel')[index];
      if (focusHeading) panel.querySelector('h2')?.focus({ preventScroll: true });
      window.scrollTo({ top: window.scrollY + panel.getBoundingClientRect().top - header, behavior: 'instant' });
      return;
    }
    if (index === 0 && active === 0) {
      setHeroReplay(replay => replay + 1);
      return;
    }
    if (index === 1 && active === 1) {
      setSettled(-1);
      setFeeReplay(replay => replay + 1);
      return;
    }
    if (index === 2 && active === 2) {
      setSettled(-1);
      setOpeningReplay(replay => replay + 1);
      return;
    }
    if (index === 3 && active === 3) {
      setSettled(-1);
      setKitchenReplay(replay => replay + 1);
      return;
    }
    if (index === 4 && active === 4) {
      setSettled(-1);
      setRoyaltyReplay(replay => replay + 1);
      return;
    }
    if (index === 6 && active === 6) {
      setInviteReplay(replay => replay + 1);
    }
    if (index === 5 && active === 5) {
      setSettled(-1);
      setLiftParked(false);
      setLiftReplay(replay => replay + 1);
      return;
    }
    const top = window.scrollY + track.getBoundingClientRect().top - header;
    if (focusHeading) headingFocusTarget.current = index;
    window.scrollTo({ top: top + (track.offsetHeight - stage.offsetHeight) * index / (chapters.length - 1), behavior: 'smooth' });
  };
  const panelProps = (index) => ({
    'aria-hidden': portrait || reducedMotion ? undefined : active !== index,
    inert: !portrait && !reducedMotion && active !== index,
    'data-portrait-active': portrait && !reducedMotion && active === index,
  });

  return (
    <section className={`jangsu-story${portrait ? ' jangsu-story--portrait' : ''}`} id="rebrand-story" ref={trackRef} aria-label="스크롤로 만나는 닭장수" data-reduced={reducedMotion}>
      <div className="jangsu-stage" ref={stageRef} data-scene={active} data-settled={reducedMotion || settled === active} data-lift-ready={liftReady} data-lift-status={liftStatus}>
        <div className="jangsu-stage-kicker"><span>DAKJANGSU FRIED CHICKEN</span><span>닭장수가 보여드릴게요</span></div>
        <img className="jangsu-story-logo hero-stage-logo" src={assetPath('/rebrand/bi-warm-ink.png')} alt="닭장수후라이드 和" width="1024" height="256" fetchPriority="high" />
        <article className="jangsu-panel jangsu-panel--welcome" {...panelProps(0)}>
          <img className="jangsu-reduced-character" src={assetPath('/rebrand/poses/hero-presentation-v1/01-neutral.png')} alt="닭장수 캐릭터" width="1122" height="1402" />
          <RebrandHeroOffer onExplore={event => goToChapter(1, event.detail === 0)} portrait={portrait} />
        </article>
        {benefits.map((benefit, index) => (
          <article key={benefit.id} className={`jangsu-panel jangsu-panel--benefit benefit-scene--${benefit.id}`} {...panelProps(index + 1)}>
            {benefit.id === 'fee' && <img className="fee-static-character" loading="lazy" src={assetPath('/rebrand/poses/fee-waiver-v1/04-rest.png')} alt="닭장수 캐릭터" width="1122" height="1402" />}
            {benefit.id === 'opening' && <img className="opening-static-character" loading="lazy" src={assetPath('/rebrand/poses/opening-package-v1/04-rest.png')} alt="닭장수 캐릭터" width="1122" height="1402" />}
            {benefit.id === 'kitchen' && <img className="kitchen-static-character" loading="lazy" src={assetPath('/rebrand/poses/kitchen-support-v1/04-rest.png')} alt="닭장수 캐릭터" width="1122" height="1402" />}
            {benefit.id === 'royalty' && <img className="royalty-static-character" loading="lazy" src={assetPath('/rebrand/poses/royalty-zero-v1/04-present.png')} alt="닭장수 캐릭터" width="1122" height="1402" />}
            <div className="benefit-scene-copy">
              <span className="benefit-scene-index">0{index + 1} / {chapters[index + 1]} 지원</span>
              <h2 tabIndex={-1}>
                <span>{benefit.label}</span>
                <strong>{benefit.id === 'growth' ? <span className="growth-lift-number" key={liftReplay}>
                  <SlotNumber value={benefit.amount} active={active === 5 && liftAssets !== 'loading'} reducedMotion={reducedMotion} delay={liftReady ? .76 : 0} onComplete={() => setSettled(5)} /><small>{benefit.unit}</small>
                </span> : <><SlotNumber key={benefit.id === 'fee' ? feeReplay : benefit.id === 'opening' ? openingReplay : benefit.id === 'kitchen' ? kitchenReplay : benefit.id === 'royalty' ? royaltyReplay : undefined} value={benefit.amount} active={active === index + 1} reducedMotion={reducedMotion} onComplete={() => setSettled(index + 1)} /><small>{benefit.unit}</small></>}</strong>
                {portrait && <PortraitCharacterSlot scene={index + 1} />}
                <b className={benefit.id === 'fee' ? 'fee-waiver-title' : benefit.id === 'royalty' ? 'royalty-waiver-title' : undefined}>{benefit.id === 'growth' ? <><span>물류 크레딧</span>{' '}<span>지원안</span></> : benefit.title}</b>
              </h2>
              {benefit.id === 'growth' ? <div className="benefit-scene-detail growth-support">
                <dl aria-label="월 매출별 물류 크레딧 지원 기준">
                  {benefit.tiers.map(tier => <div key={tier.sales}><dt>월 매출 {tier.sales} 이상</dt><dd>{tier.credit}</dd></div>)}
                </dl>
                <p className="growth-support-term">{benefit.detail}</p>
              </div> : <div className="benefit-scene-detail benefit-facts">
                <dl aria-label={`${benefit.title} 구성`}>
                  {benefit.facts.map(([label, value]) => <div key={label} className={benefit.id === 'opening' ? 'opening-package-card' : benefit.id === 'kitchen' ? 'kitchen-support-card' : benefit.id === 'royalty' ? 'royalty-rate-card' : undefined}><dt>{label}</dt><dd>{value}</dd></div>)}
                </dl>
                {benefit.detail && <p className="benefit-facts-term">{benefit.detail}</p>}
              </div>}
              <p className="benefit-scene-note">{benefit.note}</p>
              <a href="#rebrand-benefits" onClick={onConditionsClick}>지원 조건 자세히 보기 ↗</a>
            </div>
          </article>
        ))}
        <article className="jangsu-panel jangsu-panel--invite" {...panelProps(6)}>
          <div className="jangsu-invite-content">
            <span className="jangsu-scene-number">창업 상담</span>
            <h2>내 점포에는<br />어떤 혜택이?</h2>
            <div className="jangsu-invite-copy">
              <p>점포를 구하기 전에도 상담할 수 있습니다.<br />희망 지역부터 남겨주세요.</p>
              {portrait && <PortraitCharacterSlot scene={6} />}
              <a href="#lead-capture">창업 상담하기 <span aria-hidden="true">↗</span></a>
              <ol aria-label="상담에서 함께 확인할 내용"><li>희망 지역</li><li>점포 조건</li><li>적용 혜택</li></ol>
            </div>
          </div>
          <img className="jangsu-invite-static" src={assetPath('/rebrand/poses/consultation-invite-v1/04-rest.png')} alt="" width="1122" height="1402" loading="lazy" />
        </article>
        <div className="jangsu-traveler" ref={characterRef} aria-hidden="true">{active === 0 ? <JangsuHeroMotion key={heroReplay} /> : active === 1 ? <JangsuFeeMotion key={feeReplay} /> : active === 2 ? <JangsuOpeningMotion key={openingReplay} /> : active === 3 ? <JangsuKitchenMotion key={kitchenReplay} /> : active === 4 ? <JangsuRoyaltyMotion key={royaltyReplay} /> : active === 6 ? <JangsuInviteMotion key={inviteReplay} /> : (active !== 5 || liftAssets === 'error') && <JangsuMotion scene={active} greeting={active === 6} />}</div>
        {active === 5 && liftAssets !== 'error' && <JangsuLiftMotion key={liftReplay} stageRef={stageRef} characterRef={characterRef} ready={liftReady} onComplete={() => setLiftParked(true)} />}
        <div className="jangsu-stage-footer"><span>아래로 스크롤 ↓</span><nav aria-label="닭장수 이야기 장면">{chapters.map((label, index) => <button key={label} type="button" aria-current={active === index ? 'step' : undefined} onClick={() => goToChapter(index)}><small>0{index + 1}</small><span>{label}</span></button>)}</nav></div>
      </div>
    </section>
  );
}

const portraitPoses = [
  '/rebrand/poses/hero-presentation-v1/01-neutral.png',
  '/rebrand/poses/fee-waiver-v1/04-rest.png',
  '/rebrand/poses/opening-package-v1/04-rest.png',
  '/rebrand/poses/kitchen-support-v1/04-rest.png',
  '/rebrand/poses/royalty-zero-v1/04-present.png',
  '/rebrand/character-cutout.png',
  '/rebrand/poses/consultation-invite-v1/04-rest.png',
];
function PortraitCharacterSlot({ scene }) {
  return <span className="portrait-character-slot" aria-hidden="true"><img src={assetPath(portraitPoses[scene])} loading="lazy" alt="" width="1122" height="1402" /></span>;
}
