import test from 'node:test';
import assert from 'node:assert/strict';
import { getHeroGreetingState, getOpeningPresentationState, getConsultationArrivalState, heroGreetingDuration, consultationArrivalDuration } from '../src/frontend/src/utils/heroGreeting.mjs';

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

test('opening presentation keeps one pose and the resting arm still', () => {
  let maximumReach = 0;
  for (let time = 0; time <= heroGreetingDuration; time += 20) {
    const frame = getOpeningPresentationState(time, pose);
    assert.equal(frame.from, frame.to);
    assert.equal(frame.mix, 0);
    assert.deepEqual(frame.points.left, pose.left);
    maximumReach = Math.max(maximumReach, Math.hypot(...frame.points.right.map((value, axis) => value - pose.right[axis])));
  }
  assert(maximumReach > .005 && maximumReach < .025);
  assert.deepEqual(getOpeningPresentationState(heroGreetingDuration, pose).points, pose);
});

test('opening hand stays continuous at every display frame', () => {
  let previous = pose.right;
  for (let time = 1000 / 60; time < heroGreetingDuration; time += 1000 / 60) {
    const point = getOpeningPresentationState(time, pose).points.right;
    assert(Math.hypot(point[0] - previous[0], point[1] - previous[1]) < .0013);
    previous = point;
  }
});

test('consultation arrives once without swapping poses or repeating the hand gesture', () => {
  let previousX = Infinity, previousOpacity = -1;
  for (let time = 0; time <= consultationArrivalDuration; time += 20) {
    const state = getConsultationArrivalState(time, pose);
    assert.equal(state.from, state.to);
    assert.equal(state.mix, 0);
    assert.deepEqual(state.points, pose);
    assert(state.arrival.x <= previousX);
    assert(state.arrival.opacity >= previousOpacity);
    previousX = state.arrival.x;
    previousOpacity = state.arrival.opacity;
  }
  const settled = getConsultationArrivalState(consultationArrivalDuration, pose);
  assert.deepEqual(settled.arrival, { x: 0, y: 0, opacity: 1 });
  assert.deepEqual(getConsultationArrivalState(10000, pose), settled);
});
