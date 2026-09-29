import './SlotNumber.css';

export default function SlotNumber({ value, active, reducedMotion, onComplete }) {
  const spin = active && !reducedMotion;
  return (
    <span className="slot-number" data-spinning={spin}>
      <span className="slot-number-accessible">{value}</span>
      <span className="slot-number-reels" aria-hidden="true">
        {[...value].map((digit, index) => {
          const stop = 20 + Number(digit);
          const duration = 1.6 + index * .22;
          return (
            <span className="slot-number-window" key={index} style={{ '--reel-stop': `${-stop}em`, '--reel-duration': `${duration}s`, '--reel-seat-delay': `${duration - .04}s` }}>
              {spin ? <span className="slot-number-strip" key="rolling" onAnimationEnd={event => {
                if (event.animationName === 'reel-roll' && index === value.length - 1) onComplete?.();
              }}>{Array.from({ length: stop + 1 }, (_, row) => <span key={row}>{row % 10}</span>)}</span> : <span className="slot-number-still">{digit}</span>}
            </span>
          );
        })}
      </span>
    </span>
  );
}
