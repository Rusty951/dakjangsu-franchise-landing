import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import { desktopSupportPoses, getDesktopSupportState, supportGestureDuration } from '../utils/desktopSupportMotion.mjs';
import { createDesktopSupportRenderer } from '../utils/desktopSupportRenderer';

export default function DesktopSupportGesture({ kind, label, active, reducedMotion, onReady }) {
  const rootRef = useRef(null), canvasRef = useRef(null);
  const source = assetPath(desktopSupportPoses[kind][active && !reducedMotion ? 0 : 2].source);
  useEffect(() => {
    const root = rootRef.current, canvas = canvasRef.current;
    const panel = root.closest('.dks-support'), story = root.closest('.dks-desktop-story');
    const facts = [...panel.querySelectorAll('.dks-facts > div')];
    let disposed = false, renderer, frame = 0, elapsed = 0, previous, onScreen = true;
    const duration = supportGestureDuration(kind);
    const clearFacts = () => {
      facts.forEach(row => row.style.removeProperty('--dks-cue'));
      panel.style.removeProperty('--dks-number-scale');
      panel.style.removeProperty('--dks-number-y');
    };
    root.dataset.phase = 'static';
    onReady(false);
    if (!active || reducedMotion) { clearFacts(); return; }
    root.dataset.phase = 'loading';
    const running = () => onScreen && !document.hidden && story.dataset.motionPaused !== 'true';
    const paint = () => {
      if (!renderer || disposed) return;
      const state = getDesktopSupportState(elapsed, kind);
      renderer.draw(state);
      root.dataset.progress = state.progress.toFixed(3);
      root.dataset.beat = state.beat;
      root.dataset.poses = `${state.from + 1}:${state.to + 1}`;
      root.dataset.blend = state.mix.toFixed(3);
      if (kind === 'opening') {
        panel.style.setProperty('--dks-number-scale', state.numberScale.toFixed(4));
        panel.style.setProperty('--dks-number-y', `${state.numberY.toFixed(2)}px`);
      }
      if (kind === 'kitchen') facts.forEach((row, index) => row.style.setProperty('--dks-cue', state.facts[index].toFixed(3)));
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
      if (!renderer || disposed) return;
      cancelAnimationFrame(frame); frame = 0; previous = undefined;
      root.dataset.paused = String(!running());
      onReady(running());
      root.dataset.phase = elapsed >= duration ? 'settled' : 'playing';
      paint();
      if (running() && elapsed < duration) frame = requestAnimationFrame(tick);
    };
    const fallback = () => { cancelAnimationFrame(frame); root.dataset.phase = 'static'; clearFacts(); onReady(true); };
    const contextLost = event => { event.preventDefault(); renderer?.dispose(); renderer = null; fallback(); };
    canvas.addEventListener('webglcontextlost', contextLost);
    const visibility = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    visibility.observe(root);
    const changes = new MutationObserver(sync);
    changes.observe(story, { attributes: true, attributeFilter: ['data-motion-paused'] });
    const resize = new ResizeObserver(paint); resize.observe(root);
    document.addEventListener('visibilitychange', sync);
    Promise.all(desktopSupportPoses[kind].map(async pose => {
      const image = new Image(); image.src = assetPath(pose.source); await image.decode(); return image;
    })).then(images => {
      if (disposed) return;
      renderer = createDesktopSupportRenderer(canvas, images, kind);
      if (!renderer) { fallback(); return; }
      sync();
    }).catch(() => { if (!disposed) fallback(); });
    return () => {
      disposed = true; cancelAnimationFrame(frame); renderer?.dispose(); clearFacts();
      visibility.disconnect(); changes.disconnect(); resize.disconnect();
      canvas.removeEventListener('webglcontextlost', contextLost);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [active, reducedMotion, kind, source, onReady]);
  return <div className="dks-support-character dks-support-gesture" ref={rootRef} data-phase="static" role="img" aria-label={label}>
    <img src={source} alt="" width="1122" height="1402" loading="lazy" draggable="false" />
    <canvas ref={canvasRef} width="561" height="701" aria-hidden="true" />
  </div>;
}
