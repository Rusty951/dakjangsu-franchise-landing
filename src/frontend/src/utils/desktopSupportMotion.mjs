const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => { const t = clamp(value); return t * t * t * (t * (t * 6 - 15) + 10); };
const between = (time, start, end) => ease((time - start) / (end - start));
const cue = (time, start, end) => between(time, start, start + 300) * (1 - between(time, end - 300, end));
const normalize = ([x, y]) => [x / 1122, y / 1402];
const pose = (source, joints) => ({ source, joints: [...joints, [560, 300], [560, 660], [560, 970], [560, 1300]].map(normalize) });

// Original connected poses. Wrist/elbow registration gives the drawings one
// continuous path; the renderer hands off textures at the midpoint.
export const desktopSupportPoses = {
  opening: [
    pose('/rebrand/poses/opening-package-v1/01-prepare.png', [[365, 800], [655, 635], [300, 720], [775, 710]]),
    pose('/rebrand/poses/opening-package-v1/02-offer.png', [[365, 800], [760, 725], [300, 720], [775, 740]]),
    pose('/rebrand/poses/opening-package-v1/03-present.png', [[370, 800], [995, 600], [300, 720], [820, 700]]),
  ],
  kitchen: [
    pose('/rebrand/poses/kitchen-support-v1/01-ready.png', [[350, 940], [795, 950], [340, 760], [800, 770]]),
    pose('/rebrand/poses/kitchen-support-v1/02-fridge.png', [[145, 550], [680, 795], [250, 660], [790, 710]]),
    pose('/rebrand/poses/kitchen-support-v1/03-fryer.png', [[390, 620], [475, 790], [330, 700], [650, 790]]),
  ],
};
export const supportGestureDuration = kind => kind === 'opening' ? 4200 : 6000;
const paths = {
  opening: [[0, 0], [800, 0], [1650, 1], [2500, 2], [4200, 2]],
  kitchen: [[0, 0], [600, 0], [1500, 1], [2500, 1], [3700, 2], [6000, 2]],
};

export function getDesktopSupportState(elapsed, kind) {
  const duration = supportGestureDuration(kind), time = Math.max(0, Math.min(duration, elapsed));
  const path = paths[kind];
  const next = path.findIndex(([at]) => at > time);
  const frame = next < 0 ? path.length - 2 : Math.max(0, next - 1);
  const [start, from] = path[frame], [end, to] = path[frame + 1];
  const travel = ease((time - start) / (end - start));
  const mix = from === to ? 0 : between(travel, .38, .62);
  const joints = desktopSupportPoses[kind][from].joints.map((point, i) => point.map((value, axis) => value + (desktopSupportPoses[kind][to].joints[i][axis] - value) * travel));
  const nod = kind === 'kitchen' && time < 5600 ? Math.sin(Math.PI * between(time, 4400, 5600)) ** 2 : 0;
  const reach = between(time, 900, 2500) * (1 - between(time, 2800, 3600));
  const seat = kind === 'opening' ? (time < 2500 ? .92 : time < 2780 ? .92 + .12 * between(time, 2500, 2780) : 1.04 - .04 * between(time, 2780, 3250)) : 1;
  return {
    progress: time / duration, from, to, mix, joints,
    lean: kind === 'opening' ? -.035 * reach : .022 * cue(time, 700, 2600) - .025 * cue(time, 2750, 4200),
    head: kind === 'opening' ? -.055 * cue(time, 300, 3600) : -.04 * cue(time, 650, 4200),
    nod, numberScale: seat,
    numberY: kind === 'opening' ? 16 * (1 - between(time, 1000, 2500)) : 0,
    facts: kind === 'kitchen' ? [cue(time, 1250, 2650), cue(time, 3050, 4350)] : [0, 0],
    beat: kind === 'opening' ? time < 800 ? 'prepare' : time < 2500 ? 'present' : time < 3250 ? 'number-seat' : 'hold'
      : time < 1250 ? 'ready' : time < 2650 ? 'fridge' : time < 4350 ? 'fryer' : time < 5600 ? 'nod' : 'hold',
  };
}

// Compact radial basis interpolation pins torso/head/feet and registers hands
// and elbows. The matrix solve is cached per pose, not repeated per vertex.
const kernel = (a, b) => {
  const radius = Math.hypot((a[0] - b[0]) / .28, (a[1] - b[1]) / .24);
  return radius >= 1 ? 0 : (1 - radius) ** 4 * (4 * radius + 1);
};
export function createJointWarp(points) {
  const count = points.length;
  const rows = points.map((point, i) => [...points.map(other => kernel(point, other)), ...points.map((_, j) => Number(i === j))]);
  for (let col = 0; col < count; col++) {
    let pivot = col;
    for (let i = col + 1; i < count; i++) if (Math.abs(rows[i][col]) > Math.abs(rows[pivot][col])) pivot = i;
    [rows[col], rows[pivot]] = [rows[pivot], rows[col]];
    const divisor = rows[col][col];
    if (Math.abs(divisor) < 1e-8) throw new Error('Invalid pose registration');
    rows[col] = rows[col].map(value => value / divisor);
    for (let i = 0; i < count; i++) if (i !== col) {
      const factor = rows[i][col];
      rows[i] = rows[i].map((value, j) => value - factor * rows[col][j]);
    }
  }
  const inverse = rows.map(row => row.slice(count));
  return targets => inverse.map(row => [0, 1].map(axis => row.reduce((sum, weight, i) => sum + weight * (targets[i][axis] - points[i][axis]), 0)));
}

export function applyJointWarp(point, anchors, coefficients) {
  return point.map((value, axis) => value + anchors.reduce((sum, anchor, i) => sum + kernel(point, anchor) * coefficients[i][axis], 0));
}
