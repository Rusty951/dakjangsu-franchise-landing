import { assetPath } from '../assetPath';
import { getHeroGreetingState, getOpeningPresentationState, heroGreetingDuration } from './heroGreeting.mjs';

export const heroGesturePoses = [
  { name: '01-start', left: [.2912, .7182], right: [.7251, .7204] },
  { name: '02-ready', left: [.2110, .7093], right: [.7978, .7135] },
  { name: '03-half-open', left: [.1747, .7135], right: [.8298, .7218] },
  { name: '04-almost-open', left: [.1658, .6991], right: [.8444, .7037] },
  { name: '05-present', left: [.1468, .6971], right: [.8737, .7047] },
  { name: '06-hold', left: [.1470, .7875], right: [.8682, .7958] },
].map(pose => ({ ...pose, source: assetPath(`/rebrand/poses/hero-gesture-v2/${pose.name}.webp`) }));

export const heroGestureDuration = 2800;
export const usesSingleHeroPose = scene => scene === 0 || scene === 2;
export const getHeroGestureDuration = scene => usesSingleHeroPose(scene) ? heroGreetingDuration : heroGestureDuration;
export const heroGestureStill = heroGesturePoses[4].source;
const poseTimes = [0, .2, .36, .52, .68, .84];
// Continuous palm registration prevents a new pose from jumping sideways.
export const getHeroGestureState = (elapsed, scene = 0) => {
  if (scene === 0) return getHeroGreetingState(elapsed, heroGesturePoses[4]);
  if (scene === 2) return getOpeningPresentationState(elapsed, heroGesturePoses[4]);
  const offset = Math.min(1, Math.max(0, elapsed / heroGestureDuration));
  const next = poseTimes.findIndex(time => time > offset);
  const from = next < 0 ? poseTimes.length - 1 : Math.max(0, next - 1);
  const to = Math.min(from + 1, poseTimes.length - 1);
  const span = poseTimes[to] - poseTimes[from];
  const linear = span ? (offset - poseTimes[from]) / span : 0;
  const mix = linear * linear * (3 - 2 * linear);
  const points = Object.fromEntries(['left', 'right'].map(side => [side,
    heroGesturePoses[from][side].map((value, axis) => value + (heroGesturePoses[to][side][axis] - value) * mix)]));
  const transition = Math.min(1, Math.max(0, (linear - .44) / .12));
  const textureMix = transition * transition * (3 - 2 * transition);
  return { from, to, mix: textureMix, points, offset };
};
