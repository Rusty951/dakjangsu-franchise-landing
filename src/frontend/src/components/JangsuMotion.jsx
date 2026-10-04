import { useId } from 'react';
import { assetPath } from '../assetPath';
import './JangsuMotion.css';

// A layered 2D puppet. Both poses retain their original raster assets;
// SVG clips articulate the hands without regenerating frames in JavaScript.
export default function JangsuMotion({ scene, greeting = false }) {
  const id = useId().replaceAll(':', '');
  const waving = greeting;
  const pose = waving ? 'wave' : 'explain';
  const source = assetPath(`/rebrand/character-${waving ? 'wave' : 'cutout'}.png`);
  const hand = waving
    ? { x: 180, y: 290, width: 205, height: 202 }
    : { x: 712, y: 936, width: 145, height: 150 };

  return (
    <svg key={scene} className={`jangsu-puppet jangsu-puppet--${pose}`} data-ready="false" viewBox="0 0 1122 1402" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`${id}-hand`}><rect {...hand} /></clipPath>
        <mask id={`${id}-body`} maskUnits="userSpaceOnUse" x="0" y="0" width="1122" height="1402">
          <rect width="1122" height="1402" fill="white" />
          <rect {...hand} y={waving ? hand.y : hand.y + 8} height={hand.height - 8} fill="black" />
        </mask>
      </defs>
      <g className="jangsu-puppet-body">
        <image href={source} width="1122" height="1402" mask={`url(#${id}-body)`} onLoad={event => { event.currentTarget.closest('svg').dataset.ready = 'true'; }} />
        <g className="jangsu-puppet-hand">
          <image href={source} width="1122" height="1402" clipPath={`url(#${id}-hand)`} />
        </g>
      </g>
    </svg>
  );
}
