import './SlotNumber.css';

export default function SlotNumber({ value, active, reducedMotion, onComplete, delay = 0, duration = 1.6, stagger = .22 }) {
  const spin = active && !reducedMotion;
  return (
    <span className="slot-number" data-spinning={spin}>
      <span className="slot-number-accessible">{value}</span>
      <span className="slot-number-reels" aria-hidden="true">
        {[...value].map((digit, index) => {
          if (!/\d/.test(digit)) return <span className="slot-number-separator" key={index}>{digit}</span>;
          const stop = 20 + Number(digit);
          const reelDuration = duration + index * stagger;
          return (
            <span className="slot-number-window" key={index} style={{ '--reel-stop': `${-stop}em`, '--reel-duration': `${reelDuration}s`, '--reel-delay': `${delay}s`, '--reel-seat-delay': `${delay + reelDuration - .04}s` }}>
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
