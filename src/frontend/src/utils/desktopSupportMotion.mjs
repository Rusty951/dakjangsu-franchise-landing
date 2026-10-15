const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => { const t = clamp(value); return t * t * t * (t * (t * 6 - 15) + 10); };
const between = (time, start, end) => ease((time - start) / (end - start));
const cue = (time, start, end) => between(time, start, start + 300) * (1 - between(time, end - 300, end));

const sources = ['01-ready', '02-half-open', '03-present', '04-change-hands', '05-second-present']
  .map(name => ({ source: `/rebrand/poses/desktop-support-v3/${name}.png` }));
export const desktopSupportPoses = { opening: sources.slice(0, 3), kitchen: sources };
export const supportGestureDuration = kind => kind === 'opening' ? 4200 : 6000;
const frameTimes = { opening: [0, 800, 2200], kitchen: [0, 550, 1050, 2650, 3400] };

// Every limb position is drawn in a separate generated image. No mesh warp,
// bone deformation, pose blending or replacement of body parts at runtime.
export function getDesktopSupportState(elapsed, kind) {
  const duration = supportGestureDuration(kind), time = Math.max(0, Math.min(duration, elapsed));
  const frame = frameTimes[kind].findLastIndex(start => time >= start);
  const seat = kind === 'opening' ? (time < 2500 ? .92 : time < 2780 ? .92 + .12 * between(time, 2500, 2780) : 1.04 - .04 * between(time, 2780, 3250)) : 1;
  return {
    progress: time / duration, frame,
    numberScale: seat,
    numberY: kind === 'opening' ? 16 * (1 - between(time, 1000, 2500)) : 0,
    facts: kind === 'kitchen' ? [cue(time, 1250, 2650), cue(time, 3400, 4700)] : [0, 0],
    beat: kind === 'opening' ? time < 800 ? 'prepare' : time < 2500 ? 'present' : time < 3250 ? 'number-seat' : 'hold'
      : time < 1250 ? 'ready' : time < 2650 ? 'fridge' : time < 3400 ? 'change-hands' : time < 4700 ? 'fryer' : 'hold',
  };
}
