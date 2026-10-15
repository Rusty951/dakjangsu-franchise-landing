const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => { const t = clamp(value); return t * t * t * (t * (t * 6 - 15) + 10); };
const between = (time, start, end) => ease((time - start) / (end - start));
const cue = (time, start, end) => between(time, start, start + 300) * (1 - between(time, end - 300, end));

export const supportGestureDuration = kind => kind === 'opening' ? 3600 : 6200;

// One original texture per scene; the apron, resting hand and feet stay registered.
export function getDesktopSupportState(elapsed, kind) {
  const duration = supportGestureDuration(kind);
  const time = Math.max(0, Math.min(duration, elapsed));
  if (kind === 'opening') return {
    progress: time / duration,
    arm: .25 * (1 - between(time, 350, 2100)),
    head: -.04 * between(time, 250, 1100) * (1 - between(time, 2500, 3400)),
    nod: 0, facts: [0, 0],
    beat: time < 1100 ? 'look' : time < 2100 ? 'present' : 'hold',
  };
  const nod = time >= 5900 ? 0 : Math.sin(Math.PI * between(time, 4700, 5900)) ** 2;
  return {
    progress: time / duration,
    arm: -.32 * (1 - between(time, 450, 1750))
      - .17 * between(time, 2550, 3350) * (1 - between(time, 4000, 4650)),
    head: -.035 * between(time, 400, 1300) * (1 - between(time, 4250, 4650)),
    nod,
    facts: [cue(time, 1100, 2750), cue(time, 2950, 4550)],
    beat: time < 1100 ? 'ready' : time < 2750 ? 'fridge' : time < 4650 ? 'fryer' : time < 5900 ? 'nod' : 'hold',
  };
}
