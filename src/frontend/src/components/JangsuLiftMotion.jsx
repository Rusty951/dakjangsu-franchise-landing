import { useLayoutEffect } from 'react';
import { assetPath } from '../assetPath';

const liftPoses = ['ready', 'mid', 'push'];

// Offset coordinates stay stable while the amount and the character animate.
function layoutPoint(element, ancestor) {
  let x = 0;
  let y = 0;
  for (let node = element; node && node !== ancestor; node = node.offsetParent) {
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  return { x, y };
}

export default function JangsuLiftMotion({ stageRef, characterRef, ready, onComplete }) {
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const rest = characterRef.current;
    const number = stage.querySelector('.benefit-scene--growth .slot-number');
    const copy = stage.querySelector('.benefit-scene--growth .benefit-scene-copy');
    const measure = () => {
      const mobile = window.innerWidth <= 700;
      const portrait = stage.closest('.jangsu-story--portrait') !== null;
      const height = Math.min((portrait ? window.innerHeight - 118 : stage.clientHeight) * (mobile ? .78 : .9), stage.clientWidth * 1.38, 1040);
      const point = layoutPoint(number, stage);
      const width = height * 2 / 3;
      const left = portrait ? (stage.clientWidth - width) / 2 : point.x + number.offsetWidth * .55 - width / 2;
      // In the raised pose the palms sit 8% below the top of the image canvas.
      const top = point.y + number.offsetHeight - height * .08;
      const stageRect = stage.getBoundingClientRect();
      const restRect = rest.getBoundingClientRect();
      const footerTop = stage.querySelector('.jangsu-stage-footer').getBoundingClientRect().top - stageRect.top;
      const copyBottom = layoutPoint(copy, stage).y + copy.offsetHeight;
      let restBottom = mobile
        ? Math.min(restRect.bottom - stageRect.top, footerTop - 12)
        : Math.min(copyBottom + 24, footerTop - 12);
      let restHeight = Math.min(restRect.height, restRect.width * 1.5);
      let restCenter = restRect.left + restRect.width / 2 - stageRect.left;
      if (portrait) {
        // Match the full-size portrait slot. Clip the lower body only after parking.
        restHeight = restRect.width * 1.5;
        restBottom = restRect.top - stageRect.top + restHeight;
      } else if (mobile) {
        const detail = copy.querySelector('.benefit-scene-detail');
        const detailBottom = layoutPoint(detail, stage).y + detail.offsetHeight;
        // The note reserves an 84px lane so the host can stay legible on phones.
        restHeight = Math.min(190, Math.max(0, restBottom - detailBottom - 10));
        restCenter = stage.clientWidth - 12 - restHeight / 3;
      }
      const variables = {
        '--lift-left': `${left}px`,
        '--lift-top': `${top}px`,
        '--lift-height': `${height}px`,
        '--lift-width': `${width}px`,
        '--lift-crouch': `${height * .05}px`,
        '--lift-rise': `${height * .375}px`,
        '--lift-park-x': `${restCenter - left - width / 2}px`,
        '--lift-park-y': `${restBottom - top - height}px`,
        '--lift-park-scale': `${restHeight / height}`,
      };
      Object.entries(variables).forEach(([name, value]) => stage.style.setProperty(name, value));
    };
    measure();
    const observer = new ResizeObserver(measure);
    [stage, rest, copy].forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [stageRef, characterRef]);

  return (
    <div className="jangsu-lift" aria-hidden="true" data-ready={ready}>
      <div className="jangsu-lift-actor" onAnimationEnd={event => {
        if (event.animationName === 'jangsu-lift-act') onComplete();
      }}>
        {liftPoses.map(pose => <img key={pose} className={`jangsu-lift-pose jangsu-lift-pose--${pose}`} src={assetPath(`/rebrand/character-lift-${pose}.webp`)} alt="" width="1024" height="1536" draggable="false" />)}
        <img className="jangsu-lift-pose jangsu-lift-pose--rest" src={assetPath('/rebrand/character-cutout.png')} alt="" width="1122" height="1402" draggable="false" />
      </div>
    </div>
  );
}
