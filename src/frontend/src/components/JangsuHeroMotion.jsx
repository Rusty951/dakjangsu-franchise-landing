import { useEffect, useRef } from 'react';
import { assetPath } from '../assetPath';
import { getHeroGestureDuration, heroGesturePoses, heroGestureStill, usesSingleHeroPose } from '../utils/heroGesture';
import { createHeroGestureRenderer } from '../utils/heroGestureRenderer';
import './JangsuHeroMotion.css';

export default function JangsuHeroMotion({ scene = 0 }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current, canvas = canvasRef.current;
    const story = root.closest('.jangsu-story');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const duration = getHeroGestureDuration(scene);
    let disposed = false, onScreen = true, renderer, frame = 0, elapsed = 0, lastTime;
    root.dataset.phase = 'loading';
    const paint = () => {
      if (!renderer || disposed) return;
      const state = renderer.render(elapsed);
      root.dataset.progress = state.offset.toFixed(3);
      root.dataset.poses = `${state.from + 1}:${state.to + 1}`;
      root.dataset.blend = state.mix.toFixed(3);
    };
    const running = () => !preference.matches && !document.hidden && onScreen && story?.dataset.motionPaused !== 'true';
    const tick = time => {
      frame = 0;
      if (!running() || disposed) { lastTime = undefined; return; }
      if (lastTime !== undefined) {
        const delta = usesSingleHeroPose(scene) ? Math.min(time - lastTime, 50) : time - lastTime;
        elapsed = Math.min(duration, elapsed + delta);
      }
      lastTime = time; paint();
      if (elapsed < duration) frame = requestAnimationFrame(tick);
      else root.dataset.phase = 'settled';
    };
    const sync = () => {
      if (disposed || !renderer) return;
      cancelAnimationFrame(frame); frame = 0; lastTime = undefined;
      if (preference.matches) { root.dataset.phase = 'static'; return; }
      root.dataset.phase = elapsed >= duration ? 'settled' : 'playing';
      root.dataset.paused = String(!running()); paint();
      if (running() && elapsed < duration) frame = requestAnimationFrame(tick);
    };
    const fallback = () => { cancelAnimationFrame(frame); frame = 0; root.dataset.phase = 'static'; };
    const contextLost = event => { event.preventDefault(); renderer = undefined; fallback(); };
    canvas.addEventListener('webglcontextlost', contextLost);
    const visibility = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    visibility.observe(root);
    const changes = new MutationObserver(sync);
    if (story) changes.observe(story, { attributes: true, attributeFilter: ['data-motion-paused'] });
    const resize = new ResizeObserver(paint); resize.observe(root);
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    const poses = usesSingleHeroPose(scene) ? [heroGesturePoses[4]] : heroGesturePoses;
    Promise.all(poses.map(async ({ source }) => {
      const image = new Image(); image.src = source; await image.decode(); return image;
    })).then(images => {
      if (disposed) return;
      renderer = createHeroGestureRenderer(canvas,images,scene);
      root.dataset.framesLoaded = String(images.length); sync();
    }).catch(() => { if (!disposed) fallback(); });
    return () => {
      disposed = true; cancelAnimationFrame(frame);
      canvas.removeEventListener('webglcontextlost', contextLost);
      renderer?.dispose();
      visibility.disconnect(); changes.disconnect(); resize.disconnect();
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', sync);
    };
  }, [scene]);
  return <div className="jangsu-hero-motion jangsu-hero-gesture" data-gesture-scene={scene} ref={rootRef} aria-hidden="true">
    <div className="jangsu-hero-arrival">
      <img className="jangsu-gesture-fallback" src={heroGestureStill} alt="" width="1254" height="1254" draggable="false"
        onError={event => {
          if (event.currentTarget.dataset.fallback) return;
          event.currentTarget.dataset.fallback = 'true';
          event.currentTarget.src = assetPath('/rebrand/poses/hero-presentation-v1/04-present.png');
        }} />
      <canvas ref={canvasRef} className="jangsu-gesture-canvas" width="600" height="600" />
    </div>
  </div>;
}
