const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => { const t = clamp(value); return t * t * t * (t * (t * 6 - 15) + 10); };
const between = (time, start, end) => ease((time - start) / (end - start));
const cue = (time, start, end) => between(time, start, start + 300) * (1 - between(time, end - 300, end));

const sources = ['01-ready', '02-lift-low', '03-lift-turn', '04-half-open', '05-extend-mid', '06-extend-far', '07-present',
  '08-retract-early', '09-retract-late', '10-change-hands', '11-second-early', '12-second-late', '13-second-present']
  .map(name => ({ source: `/rebrand/poses/desktop-support-v4/${name}.webp` }));
const welcome = ['02-lift', '03-turn-palms', '04-open-start', '05-open-close', '06-open-mid', '07-open-wide', '08-welcome']
  .map(name => ({ source: `/rebrand/poses/desktop-opening-welcome-v1/${name}.webp` }));
export const desktopSupportPoses = { opening: [sources[0], ...welcome], kitchen: sources };
export const supportGestureDuration = kind => kind === 'opening' ? 4200 : 6000;
const frameTimes = { opening: [0, 450, 600, 750, 900, 1050, 1200, 1350],
  kitchen: [0, 360, 500, 640, 780, 920, 1060, 2670, 2830, 2990, 3150, 3310, 3470] };
const dissolveMs = 130;

// Drawn in-betweens and short, clock-driven dissolves soften each change.
// No mesh warp, bone deformation or replacement of body parts at runtime.
export function getDesktopSupportState(elapsed, kind) {
  const duration = supportGestureDuration(kind), time = Math.max(0, Math.min(duration, elapsed));
  const frame = frameTimes[kind].findLastIndex(start => time >= start);
  const mix = frame === 0 ? 1 : between(time, frameTimes[kind][frame], frameTimes[kind][frame] + dissolveMs);
  const seat = kind === 'opening' ? (time < 2500 ? .92 : time < 2780 ? .92 + .12 * between(time, 2500, 2780) : 1.04 - .04 * between(time, 2780, 3250)) : 1;
  return {
    progress: time / duration, frame, previousFrame: Math.max(0, frame - 1), mix,
    numberScale: seat,
    numberY: kind === 'opening' ? 16 * (1 - between(time, 1000, 2500)) : 0,
    facts: kind === 'kitchen' ? [cue(time, 1250, 2650), cue(time, 3400, 4700)] : [0, 0],
    beat: kind === 'opening' ? time < 800 ? 'prepare' : time < 2500 ? 'present' : time < 3250 ? 'number-seat' : 'hold'
      : time < 1250 ? 'ready' : time < 2650 ? 'fridge' : time < 3400 ? 'change-hands' : time < 4700 ? 'fryer' : 'hold',
  };
}
