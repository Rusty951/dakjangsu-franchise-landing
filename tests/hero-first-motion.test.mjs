import test from 'node:test';
import assert from 'node:assert/strict';
import { getHeroGreetingState, heroGreetingDuration } from '../src/frontend/src/utils/heroGreeting.mjs';

const pose = { left: [.1468, .6971], right: [.8737, .7047] };
const state = time => getHeroGreetingState(time, pose);

test('first-page greeting never switches textures and lands back on its still pose', () => {
  for (let t = 0; t <= heroGreetingDuration; t += 20) {
    const frame = state(t);
    assert.equal(frame.from, 4);
    assert.equal(frame.to, 4);
    assert.equal(frame.mix, 0);
  }
  assert.deepEqual(state(-100).points, pose);
  assert.deepEqual(state(heroGreetingDuration + 100).points, pose);
});

test('first-page hands move continuously across the old pose boundaries', () => {
  for (const fraction of [.2, .36, .52, .68, .84]) {
    const time = fraction * heroGreetingDuration;
    const before = state(time - 1).points.left;
    const after = state(time + 1).points.left;
    assert(Math.hypot(after[0] - before[0], after[1] - before[1]) > .000002);
  }
  let previous = state(0).points.left;
  for (let time = 1000 / 60; time < heroGreetingDuration; time += 1000 / 60) {
    const point = state(time).points.left;
    assert(Math.hypot(point[0] - previous[0], point[1] - previous[1]) < .003);
    previous = point;
  }
});

test('first-page easing settles without a sharp start or stop', () => {
  for (const t of [1, heroGreetingDuration - 1]) {
    const point = state(t).points.left;
    assert(Math.hypot(point[0] - pose.left[0], point[1] - pose.left[1]) < .000001);
  }
});
