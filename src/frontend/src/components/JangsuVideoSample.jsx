import { useEffect, useRef, useState } from 'react';
import { assetPath } from '../assetPath';
import './JangsuVideoSample.css';

export default function JangsuVideoSample() {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;
    const video = document.createElement('video');
    video.src = assetPath('/rebrand/jangsu-wave-sample.mp4');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    let frame;
    let disposed = false;
    let onScreen = true;
    const draw = () => {
      if (disposed) return;
      if (video.readyState >= 2 && !video.paused) {
        context.drawImage(video, 0, 0, 360, 640);
        const pixels = context.getImageData(0, 0, 360, 640);
        const data = pixels.data;
        for (let i = 0; i < data.length; i += 4) {
          // Remove green dominance, preserving neutral clothing and the source watermark.
          const dominance = data[i + 1] - Math.max(data[i], data[i + 2]);
          const opacity = Math.max(0, Math.min(1, (42 - dominance) / 20));
          data[i + 3] = Math.round(255 * opacity);
          if (dominance > 22) data[i + 1] = Math.min(data[i + 1], Math.max(data[i], data[i + 2]) + 8);
        }
        context.putImageData(pixels, 0, 0);
        setVisible(video.currentTime < 5.5);
      }
      if (!video.ended) frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      if (document.hidden || !onScreen || preference.matches) {
        video.pause();
        if (preference.matches) setVisible(false);
      } else if (!video.ended) video.play().catch(() => setVisible(false));
    };
    const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    observer.observe(canvas);
    video.addEventListener('ended', () => setVisible(false));
    video.addEventListener('error', () => setVisible(false));
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    sync();
    frame = requestAnimationFrame(draw);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', sync);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, []);

  return <div className="jangsu-video-sample" data-playing={visible}>
    <img src={assetPath('/rebrand/character-cutout.png')} alt="" />
    <canvas ref={canvasRef} width="360" height="640" aria-hidden="true" />
  </div>;
}
