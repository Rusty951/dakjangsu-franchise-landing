import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { assetPath } from '../assetPath';
import { heroGestureStill } from '../utils/heroGesture';
import JangsuMotion from './JangsuMotion';
import JangsuHeroMotion from './JangsuHeroMotion';
import JangsuFeeMotion from './JangsuFeeMotion';
import './JangsuOpeningMotion.css';
import JangsuKitchenMotion from './JangsuKitchenMotion';
import './JangsuRoyaltyMotion.css';
import './JangsuInviteMotion.css';
import JangsuLiftMotion from './JangsuLiftMotion';
import SlotNumber from './SlotNumber';
import RebrandHeroOffer from './RebrandHeroOffer';
import './RebrandScrollStory.css';
import './JangsuBenefitScenes.css';

const chapters = ['닭장수', '브랜드', '가맹비', '오픈', '주방', '로열티', '운영', '상담'];
// Chapter order can change without renumbering the existing character acts.
const chapterScenes = [0, 'brand', 1, 2, 3, 4, 5, 6];
const desktopFrames = [
  [51, 78, 4], [84, 67, -8], [17, 70, -8], [84, 67, -8], [18, 71, -8], [85, 65, -8], [81, 80, 8],
];
const mobileFrames = [
  [73, 44, 35], [85, 30, -2], [18, 26, -2], [85, 30, -2], [18, 26, -2], [85, 30, -2], [78, 46, 20],
];
const benefits = [
  { id: 'fee', label: '가맹비와 교육비', amount: '440', unit: '만원', title: '전액 면제 조건', facts: [['가맹비', '275만원'], ['교육비', '165만원']], detail: '부가세를 포함한 합계입니다.', note: '혜택 적용 여부와 세부 조건은 확인 중입니다. 현재 적용 가능한 내용은 본사 상담에서 확인해 주세요.' },
  { id: 'opening', label: '문을 열 때 필요한 지원', amount: '740', unit: '만원 상당', title: '오픈 지원 조건', facts: [['가맹비 + 교육비 면제', '440만원'], ['오픈행사 생닭 200수', '100만원 상당'], ['오픈 마케팅', '200만원 상당']], note: '440만원 면제를 포함한 금액입니다. 면제와 현물, 마케팅 지원으로 구성된 기준이며 현금 지급액이 아닙니다. 적용 여부는 본사 상담에서 확인해 주세요.' },
  { id: 'kitchen', label: '냉장고와 튀김기', amount: '500', unit: '만원 상당', title: '주방 지원 조건', facts: [['간냉식 냉장고', '300만원 상당'], ['최신형 튀김기', '200만원 상당']], note: '선착순 5개점을 대상으로 검토 중인 지원 기준입니다. 15평 이상, 상권 조건, 전체 신규 인테리어와 본사 검수, 24개월 의무 운영 조건의 적용 여부는 본사 상담에서 확인해 주세요.' },
  { id: 'royalty', label: '매달 내는 로열티', amount: '0', unit: '원', title: '첫 2년 면제 조건', facts: [['정상 로열티', '월 매출액 3.3%']], note: '최초 계약 2년간 면제하는 기준입니다. 혜택 적용 여부와 세부 조건은 본사 상담에서 확인해 주세요.' },
  { id: 'growth', label: '매출 기준을 달성하면, 월 최대', amount: '100', unit: '만원', title: '물류 크레딧 지원 조건', tiers: [{ sales: '3,000만원', credit: '30만원' }, { sales: '4,000만원', credit: '100만원' }], detail: '첫 화면은 24개월간 매출 기준을 달성한 경우의 계산 예시입니다. 실제 지원 기간과 적용 조건은 확인 중입니다.', note: '지원 대상으로 확인되면 매출 증빙 제출 후 다음 달 물류대금에서 차감하는 방식입니다. 현금 지급이나 매출 보장은 아닙니다. 적용 여부와 세부 조건은 본사 상담에서 확인해 주세요.' },
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
  const scene = chapterScenes[active];
  const [portrait, setPortrait] = useState(false);
  const [guideVisible, setGuideVisible] = useState(false);

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
    let lastViewport = { width: window.innerWidth, height: window.innerHeight };
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
      const resized = lastViewport.width !== window.innerWidth || lastViewport.height !== window.innerHeight;
      lastViewport = { width: window.innerWidth, height: window.innerHeight };
      if (resized && !portrait && !reduced && lastReadingPosition.current.withinStory) {
        // Viewport-based track height must not advance the reader on resize.
        const top = window.scrollY + track.getBoundingClientRect().top - header;
        window.scrollTo({ top: top + (track.offsetHeight - stage.offsetHeight) * lastReadingPosition.current.index / (chapters.length - 1), behavior: 'instant' });
      }
      if (portrait || reduced) {
        // Flowing and reduced-motion chapters track their real document positions.
        const navHeight = stage.querySelector('.jangsu-stage-footer').offsetHeight;
        const readingLine = header + navHeight + Math.min(180, window.innerHeight * .24);
        const nextPanel = panels.findIndex(panel => panel.getBoundingClientRect().bottom > readingLine);
        const index = nextPanel === -1 ? panels.length - 1 : nextPanel;
        lastReadingPosition.current = { index, withinStory: track.getBoundingClientRect().top <= header + 52 && track.getBoundingClientRect().bottom > header + 52 };
        setGuideVisible(index > 0 && lastReadingPosition.current.withinStory && track.getBoundingClientRect().bottom > readingLine);
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
      setGuideVisible(current > 0 && lastReadingPosition.current.withinStory);
      if (lastActive !== current) {
        lastActive = current;
        setActive(current);
        setSettled(-1);
        setLiftParked(false);
      }
      const frames = window.innerWidth <= 700 ? mobileFrames : desktopFrames;
      // Keep the host in the active chapter's reserved lane at every scroll offset.
      // The lift actor uses this same lane after its opening performance.
      const currentScene = chapterScenes[current];
      const values = [...(frames[currentScene] ?? frames[0])];
      if (currentScene >= 1 && currentScene <= 5) {
        values[0] = window.innerWidth <= 700 ? (currentScene === 1 ? 75 : frames[currentScene][0]) : ((currentScene === 1 || currentScene === 3) ? 82 : (currentScene === 2 || currentScene === 4) ? 18 : currentScene % 2 ? 85 : 16);
        values[2] = window.innerWidth <= 700 ? 9 : 2;
        values[1] = window.innerWidth <= 700 ? 19 : (currentScene >= 1 && currentScene <= 4 ? 78 : 68);
        if (window.innerWidth <= 700) {
          const copy = panels[current].querySelector('.benefit-scene-copy');
          const copyBottom = copy.getBoundingClientRect().bottom - stage.getBoundingClientRect().top;
          const available = Math.max(0, stage.offsetHeight * .91 - 12 - copyBottom);
          values[1] = Math.min(values[1], available / stage.offsetHeight * 100);
          if (currentScene === 1) {
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
          if (currentScene === 2) {
            const actorTop = copy.querySelector('h2').getBoundingClientRect().bottom - stage.getBoundingClientRect().top + 16;
            const footerTop = stage.querySelector('.jangsu-stage-footer').getBoundingClientRect().top - stage.getBoundingClientRect().top;
            const portraitHeight = Math.min(window.innerHeight <= 700 ? 180 : 230, Math.max(0, footerTop - 12 - actorTop));
            values[0] = 16;
            values[1] = portraitHeight / stage.offsetHeight * 100;
            values[2] = (stage.offsetHeight - actorTop - portraitHeight) / stage.offsetHeight * 100;
          }
          if (currentScene === 3) {
            const actorTop = copy.querySelector('h2').getBoundingClientRect().bottom - stage.getBoundingClientRect().top + 16;
            const noteTop = copy.querySelector('.benefit-scene-note').getBoundingClientRect().top - stage.getBoundingClientRect().top;
            const portraitHeight = Math.min(230, Math.max(0, noteTop - 12 - actorTop));
            values[0] = 80;
            values[1] = portraitHeight / stage.offsetHeight * 100;
            values[2] = (stage.offsetHeight - actorTop - portraitHeight) / stage.offsetHeight * 100;
          }
          if (currentScene === 4) {
            const number = copy.querySelector('h2 > strong').getBoundingClientRect();
            const actorTop = number.top - stage.getBoundingClientRect().top + 8;
            const portraitHeight = Math.max(0, Math.min(250, number.height - 16));
            values[0] = 18;
            values[1] = portraitHeight / stage.offsetHeight * 100;
            values[2] = (stage.offsetHeight - actorTop - portraitHeight) / stage.offsetHeight * 100;
          }
        } else if (currentScene < 5) {
          if (currentScene === 4) values[0] = 17.5;
          const stageTop = stage.getBoundingClientRect().top;
          const copyBottom = panels[current].querySelector('.benefit-scene-copy').getBoundingClientRect().bottom - stageTop;
          const footerTop = stage.querySelector('.jangsu-stage-footer').getBoundingClientRect().top - stageTop;
          const visualHeight = Math.min(stage.offsetHeight * (currentScene >= 1 && currentScene <= 4 ? .78 : .68), window.innerWidth * (currentScene >= 1 && currentScene <= 4 ? .35 : .27) * 1402 / 1122);
          const number = currentScene === 4 ? panels[current].querySelector('h2 > strong') : null;
          let numberTop = 0;
          for (let node = number; node && node !== stage; node = node.offsetParent) numberTop += node.offsetTop;
          // The presenting palm sits about 42% down the image. Keep it beside the zero,
          // independent of the note/table height, with room above chapter navigation.
          const presentationBottom = number ? numberTop + number.offsetHeight * .65 + visualHeight * .58 : null;
          const characterBottom = Math.min(footerTop - 12, presentationBottom ?? Math.max(copyBottom + 24, visualHeight + 50));
          values[2] = (stage.offsetHeight - characterBottom) / stage.offsetHeight * 100;
        }
      }
      if (currentScene === 6) {
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
      const copy = panel.querySelector('.benefit-scene-copy, .jangsu-invite-content, .brand-story-copy');
      if (copy) observer.observe(copy);
    });
    const restore = orientationRestore.current;
    orientationRestore.current = null;
    if (restore?.withinStory) {
      // A layout switch keeps the same chapter and its completed performance.
      // Resetting the lift here would hide its copy after an already-ended act.
      lastActive = restore.index;
      const header = document.querySelector('.rebrand-header')?.offsetHeight ?? 80;
      const top = window.scrollY + track.getBoundingClientRect().top - header;
      const portraitTarget = restore.index > 0 ? panels[restore.index].querySelector('h2') : panels[restore.index];
      const destination = portrait
        ? window.scrollY + portraitTarget.getBoundingClientRect().top - header - (restore.index > 0 ? 12 : 0)
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
      stageRef.current.querySelectorAll('.jangsu-panel')[active].querySelector('h1, h2')?.focus({ preventScroll: true });
      headingFocusTarget.current = null;
    }
  }, [active]);

  const goToChapter = (index, focusHeading = false) => {
    const destinationScene = chapterScenes[index];
    const track = trackRef.current;
    const stage = stageRef.current;
    const header = document.querySelector('.rebrand-header')?.offsetHeight ?? 80;
    if (focusHeading && active === index) {
      stage.querySelectorAll('.jangsu-panel')[index].querySelector('h1, h2')?.focus({ preventScroll: true });
    }
    if (portrait) {
      if (active === index) {
        if (destinationScene === 0) setHeroReplay(replay => replay + 1);
        if (destinationScene === 1) setFeeReplay(replay => replay + 1);
        if (destinationScene === 2) setOpeningReplay(replay => replay + 1);
        if (destinationScene === 3) setKitchenReplay(replay => replay + 1);
        if (destinationScene === 4) setRoyaltyReplay(replay => replay + 1);
        if (destinationScene === 5) { setLiftReplay(replay => replay + 1); setLiftParked(false); }
        if (destinationScene === 6) setInviteReplay(replay => replay + 1);
      }
      const panel = stage.querySelectorAll('.jangsu-panel')[index];
      if (focusHeading) panel.querySelector('h1, h2')?.focus({ preventScroll: true });
      const target = index > 0 ? panel.querySelector('h2') : panel;
      window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - header - (index > 0 ? 12 : 0), behavior: reducedMotion ? 'instant' : 'smooth' });
      return;
    }
    if (reducedMotion) {
      const panel = stage.querySelectorAll('.jangsu-panel')[index];
      if (focusHeading) panel.querySelector('h1, h2')?.focus({ preventScroll: true });
      window.scrollTo({ top: window.scrollY + panel.getBoundingClientRect().top - header, behavior: 'instant' });
      return;
    }
    if (destinationScene === 0 && active === index) {
      setHeroReplay(replay => replay + 1);
      return;
    }
    if (destinationScene === 1 && active === index) {
      setSettled(-1);
      setFeeReplay(replay => replay + 1);
      return;
    }
    if (destinationScene === 2 && active === index) {
      setSettled(-1);
      setOpeningReplay(replay => replay + 1);
      return;
    }
    if (destinationScene === 3 && active === index) {
      setSettled(-1);
      setKitchenReplay(replay => replay + 1);
      return;
    }
    if (destinationScene === 4 && active === index) {
      setSettled(-1);
      setRoyaltyReplay(replay => replay + 1);
      return;
    }
    if (destinationScene === 6 && active === index) {
      setInviteReplay(replay => replay + 1);
    }
    if (destinationScene === 5 && active === index) {
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
    <section className={`jangsu-story jangsu-story--massive${portrait ? ' jangsu-story--portrait' : ''}`} id="rebrand-story" ref={trackRef} aria-label="스크롤로 만나는 닭장수" data-reduced={reducedMotion} style={{ '--story-chapter-count': chapters.length }}>
      <div className="jangsu-stage" ref={stageRef} data-scene={scene} data-settled={reducedMotion || settled === active} data-lift-ready={liftReady} data-lift-status={liftStatus}>
        <img className="jangsu-story-logo hero-stage-logo" src={assetPath('/rebrand/bi-warm-ink.png')} alt="닭장수후라이드 和" width="1024" height="256" fetchPriority="high" />
        <article className="jangsu-panel jangsu-panel--welcome" {...panelProps(0)}>
          <img className="jangsu-reduced-character" src={heroGestureStill} alt="닭장수 캐릭터" width="1254" height="1254" />
          <RebrandHeroOffer onExplore={event => goToChapter(1, event.detail === 0)} portrait={portrait} />
        </article>
        <article className="jangsu-panel jangsu-panel--brand" {...panelProps(1)}>
          <div className="brand-story-copy">
            <p className="offer-eyebrow">02 / 새로운 닭장수</p>
            <h2 tabIndex={-1}>오래 장사할 사장님과,<br /><em>함께 시작하려고요.</em></h2>
            <p className="brand-story-intro">간판부터 매장 분위기까지, 새로운 닭장수를 준비합니다.<br />매장을 직접 돌보고 꾸준히 운영할 사장님을 모십니다.</p>
            <div className="brand-story-reasons">
              <section><span>문을 열 때</span><h3>시작의 부담을 줄이도록</h3><p>가맹비와 교육비, 오픈 마케팅, 주방 설비까지. 점포 조건에 맞는 지원으로 창업 준비를 돕는 방향입니다.</p></section>
              <section><span>장사를 이어갈 때</span><h3>운영에도 보탬이 되도록</h3><p>매출 기준을 달성한 뒤에는 물류 크레딧으로 운영 부담을 덜도록 설계하고 있습니다.</p></section>
            </div>
            <p className="brand-story-note">새로운 매장 모습과 지원안은 준비 중입니다. 적용 가능한 혜택은 점포 조건을 확인한 뒤 안내합니다.</p>
            <button type="button" className="offer-next" onClick={event => goToChapter(2, event.detail === 0)}>지원 항목 살펴보기 <span aria-hidden="true">↓</span></button>
          </div>
        </article>
        {benefits.map((benefit, index) => (
          <article key={benefit.id} className={`jangsu-panel jangsu-panel--benefit benefit-scene--${benefit.id}`} {...panelProps(index + 2)}>
            {benefit.id === 'fee' && <img className="fee-static-character" loading="lazy" src={assetPath('/rebrand/poses/fee-waiver-v1/04-rest.png')} alt="닭장수 캐릭터" width="1122" height="1402" />}
            {benefit.id === 'opening' && <img className="opening-static-character" loading="lazy" src={heroGestureStill} alt="닭장수 캐릭터" width="1254" height="1254" />}
            {benefit.id === 'kitchen' && <img className="kitchen-static-character" loading="lazy" src={assetPath('/rebrand/poses/kitchen-support-v1/04-rest.png')} alt="닭장수 캐릭터" width="1122" height="1402" />}
            {benefit.id === 'royalty' && <img className="royalty-static-character" loading="lazy" src={heroGestureStill} alt="닭장수 캐릭터" width="1254" height="1254" />}
            <div className="benefit-scene-copy">
              <span className="benefit-scene-index">0{index + 3} / {chapters[index + 2]} 지원</span>
              <h2 tabIndex={-1}>
                <span>{benefit.label}</span>
                <strong>{benefit.id === 'growth' ? <span className="growth-lift-number" key={liftReplay}>
                  <SlotNumber value={benefit.amount} active={scene === 5 && liftAssets !== 'loading'} reducedMotion={reducedMotion} delay={liftReady ? .76 : 0} onComplete={() => setSettled(6)} /><small>{benefit.unit}</small>
                </span> : <><SlotNumber key={benefit.id === 'fee' ? feeReplay : benefit.id === 'opening' ? openingReplay : benefit.id === 'kitchen' ? kitchenReplay : benefit.id === 'royalty' ? royaltyReplay : undefined} value={benefit.amount} active={active === index + 2} reducedMotion={reducedMotion} onComplete={() => setSettled(index + 2)} /><small>{benefit.unit}</small></>}</strong>
                <b className={benefit.id === 'fee' ? 'fee-waiver-title' : benefit.id === 'royalty' ? 'royalty-waiver-title' : undefined}>{benefit.id === 'growth' ? <><span>물류 크레딧</span>{' '}<span>지원 조건</span></> : benefit.title}</b>
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
              {portrait && <PortraitCharacterSlot scene={index + 1} />}
              <a className="story-cta" href="#rebrand-benefits" onClick={onConditionsClick}>
                <span>지원 조건 자세히 보기 <span className="story-cta-icon" aria-hidden="true" /></span>
              </a>
            </div>
          </article>
        ))}
        <article className="jangsu-panel jangsu-panel--invite" {...panelProps(7)}>
          <div className="jangsu-invite-content">
            <span className="jangsu-scene-number">내 점포 지원 상담</span>
            <h2 tabIndex={-1}>사장님 창업비, <br /><em>얼마나 줄일 수 </em><br />있을까요?</h2>
            <div className="jangsu-invite-copy">
              <p>가맹비와 주방 설비, 첫 2년 로열티까지.<br />내 점포에 적용될 지원부터 확인해 보세요.</p>
              {portrait && <PortraitCharacterSlot scene={6} />}
              <a className="story-cta story-cta--primary" href="#lead-capture">
                <span>내 점포 지원 상담하기 <span className="story-cta-icon" aria-hidden="true" /></span>
              </a>
              <ol aria-label="상담에서 함께 확인할 내용"><li>희망 지역</li><li>점포 조건</li><li>적용 혜택</li></ol>
            </div>
          </div>
          <img className="jangsu-invite-static" src={heroGestureStill} alt="" width="1254" height="1254" loading="lazy" />
        </article>
        <div className="jangsu-traveler" ref={characterRef} aria-hidden="true">
          <div className="jangsu-character-canvas">{scene === 'brand' ? null : scene === 0 ? <JangsuHeroMotion key={`hero-${heroReplay}`} /> : scene === 1 ? <JangsuFeeMotion key={feeReplay} /> : scene === 2 ? <JangsuHeroMotion key={`opening-${openingReplay}`} scene={2} /> : scene === 3 ? <JangsuKitchenMotion key={kitchenReplay} /> : scene === 4 ? <JangsuHeroMotion key={`royalty-${royaltyReplay}`} scene={4} /> : scene === 6 ? <JangsuHeroMotion key={`invite-${inviteReplay}`} scene={6} /> : (scene !== 5 || liftAssets === 'error') && <JangsuMotion scene={scene} greeting={scene === 6} />}</div>
        </div>
        {scene === 5 && liftAssets !== 'error' && <JangsuLiftMotion key={liftReplay} stageRef={stageRef} characterRef={characterRef} ready={liftReady} onComplete={() => setLiftParked(true)} />}
        <div className="jangsu-stage-footer" aria-hidden="true" />
        <nav
          className="jangsu-progress-guide"
          aria-label="닭장수 이야기 진행"
          aria-hidden={!guideVisible}
          inert={!guideVisible}
          data-visible={guideVisible}
        >
          <ol>
            {chapters.map((label, index) => (
              <li key={label}>
                <button
                  type="button"
                  aria-label={`${index + 1}번 ${label} 장면`}
                  aria-current={active === index ? 'step' : undefined}
                  data-complete={index < active}
                  title={label}
                  onClick={event => goToChapter(index, event.detail === 0)}
                >
                  <span className="jangsu-progress-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="jangsu-progress-label" aria-hidden="true">{label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

const portraitPoses = [
  '/rebrand/poses/hero-presentation-v1/01-neutral.png',
  '/rebrand/poses/fee-waiver-v1/04-rest.png',
  '/rebrand/poses/hero-gesture-v2/05-present.webp',
  '/rebrand/poses/kitchen-support-v1/04-rest.png',
  '/rebrand/poses/hero-gesture-v2/05-present.webp',
  '/rebrand/character-cutout.png',
  '/rebrand/poses/hero-gesture-v2/05-present.webp',
];
function PortraitCharacterSlot({ scene }) {
  return <span className="portrait-character-slot" data-character-scene={scene} aria-hidden="true"><img src={assetPath(portraitPoses[scene])} loading="lazy" alt="" width="1122" height="1402" /></span>;
}
