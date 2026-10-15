import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import { desktopSupportPoses, getDesktopSupportState, supportGestureDuration } from '../utils/desktopSupportMotion.mjs';
import { writeData, writeStyle } from '../utils/visualWrites.mjs';

export default function SupportGesture({ kind, label, active, reducedMotion, onReady, layout = 'desktop' }) {
  const rootRef = useRef(null);
  const mobile = layout === 'mobile';
  const poses = desktopSupportPoses[kind];
  useEffect(() => {
    const root = rootRef.current, panel = root.closest(mobile ? '.mobile-support-panel' : '.dks-support'), story = root.closest(mobile ? '.jangsu-story' : '.dks-desktop-story');
    const images = [...root.querySelectorAll('img')], facts = [...panel.querySelectorAll(mobile ? '.mobile-support-facts > div' : '.dks-facts > div')];
    let disposed = false, loaded = false, frame = 0, elapsed = 0, previous, onScreen = true;
    const duration = supportGestureDuration(kind);
    const show = (index, previousIndex = index, mix = 1) => images.forEach((image, i) => {
      const opacity = i === index ? mix : i === previousIndex ? 1 - mix : 0;
      writeData(image, 'visible', String(opacity > 0));
      writeStyle(image, '--dks-pose-opacity', opacity.toFixed(4));
    });
    const clear = () => {
      facts.forEach(row => row.style.removeProperty('--dks-cue'));
      panel.style.removeProperty('--dks-number-scale'); panel.style.removeProperty('--dks-number-y');
    };
    root.dataset.phase = 'static'; onReady(false);
    if (!active || reducedMotion) { show(poses.length - 1); clear(); return; }
    show(0); root.dataset.phase = 'loading';
    const running = () => onScreen && !document.hidden && story.dataset.motionPaused !== 'true';
    const paint = () => {
      if (!loaded || disposed) return;
      const state = getDesktopSupportState(elapsed, kind);
      show(state.frame, state.previousFrame, state.mix);
      writeData(root, 'progress', state.progress.toFixed(3)); writeData(root, 'beat', state.beat);
      writeData(root, 'frame', String(state.frame + 1));
      writeData(root, 'mix', state.mix.toFixed(3));
      writeStyle(panel, '--dks-number-scale', state.numberScale.toFixed(4));
      writeStyle(panel, '--dks-number-y', `${state.numberY.toFixed(2)}px`);
      if (kind === 'kitchen') facts.forEach((row, index) => writeStyle(row, '--dks-cue', state.facts[index].toFixed(3)));
    };
    const tick = time => {
      frame = 0;
      if (!running() || disposed) { previous = undefined; return; }
      if (previous !== undefined) elapsed = Math.min(duration, elapsed + time - previous);
      previous = time; paint();
      if (elapsed < duration) frame = requestAnimationFrame(tick);
      else root.dataset.phase = 'settled';
    };
    const sync = () => {
      if (!loaded || disposed) return;
      cancelAnimationFrame(frame); frame = 0; previous = undefined;
      root.dataset.paused = String(!running()); onReady(running());
      root.dataset.phase = elapsed >= duration ? 'settled' : 'playing'; paint();
      if (running() && elapsed < duration) frame = requestAnimationFrame(tick);
    };
    const visibility = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    visibility.observe(root);
    const changes = new MutationObserver(sync);
    changes.observe(story, { attributes: true, attributeFilter: ['data-motion-paused'] });
    document.addEventListener('visibilitychange', sync);
    Promise.all(images.map(image => image.decode())).then(() => { if (!disposed) { loaded = true; sync(); } }).catch(() => {
      if (disposed) return;
      const available = images.findLastIndex(image => image.complete && image.naturalWidth > 0);
      show(Math.max(0, available)); root.dataset.phase = 'static'; clear(); onReady(true);
    });
    return () => {
      disposed = true; cancelAnimationFrame(frame); clear();
      visibility.disconnect(); changes.disconnect(); document.removeEventListener('visibilitychange', sync);
    };
  }, [active, reducedMotion, kind, poses, onReady, mobile]);
  return <div className={mobile ? 'mobile-support-character mobile-support-gesture' : 'dks-support-character dks-support-gesture'} ref={rootRef} data-phase="static" role="img" aria-label={label}>
    {poses.map((pose, i) => <img key={pose.source}
      src={active && !reducedMotion || i === poses.length - 1 ? assetPath(pose.source) : undefined}
      alt="" width="1024" height="1536" loading={active ? 'eager' : 'lazy'} decoding="async"
      draggable="false" data-visible={i === (active && !reducedMotion ? 0 : poses.length - 1)} />)}
  </div>;
}
