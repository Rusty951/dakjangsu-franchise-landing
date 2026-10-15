import test from 'node:test';
import assert from 'node:assert/strict';
import { getDesktopSupportState as state, supportGestureDuration as duration, desktopSupportPoses as poses, createJointWarp, applyJointWarp } from '../src/frontend/src/utils/desktopSupportMotion.mjs';

const distance = (a, b) => Math.hypot(...a.map((value, i) => value - b[i]));
test('desktop opening connects preparation to presentation and seats 740 once after the reels', () => {
  assert.equal(state(0, 'opening').from, 0);
  assert.equal(state(1700, 'opening').from, 1);
  assert.equal(state(2500, 'opening').from, 2);
  assert(distance(state(0, 'opening').joints[1], state(2500, 'opening').joints[1]) > .25);
  assert.equal(state(2500, 'opening').numberScale, .92);
  assert.equal(state(2780, 'opening').numberScale, 1.04);
  assert.equal(state(3250, 'opening').numberScale, 1);
  const parked = state(duration('opening'), 'opening');
  assert(Math.abs(parked.lean) < 1e-12);
  assert.deepEqual(state(10000, 'opening'), parked);
});

test('desktop kitchen changes the presenting arm, emphasizes in order and nods once', () => {
  assert.deepEqual(state(1800, 'kitchen').facts, [1, 0]);
  assert.deepEqual(state(3600, 'kitchen').facts, [0, 1]);
  assert.equal(state(1800, 'kitchen').from, 1);
  assert.equal(state(4000, 'kitchen').from, 2);
  let peaks = 0, previousSlope = 0;
  for (let time = 20; time <= duration('kitchen'); time += 20) {
    const current = state(time, 'kitchen'), previous = state(time - 20, 'kitchen');
    const slope = Math.sign(current.nod - previous.nod);
    if (slope < 0 && previousSlope > 0) peaks++;
    if (slope) previousSlope = slope;
    assert(current.facts.every(value => value >= 0 && value <= 1));
    assert.equal(current.facts[0] * current.facts[1], 0);
    assert.equal(current.numberScale, 1);
  }
  assert.equal(peaks, 1);
  const parked = state(6000, 'kitchen');
  assert.equal(parked.nod, 0);
  assert(Math.abs(parked.head) < 1e-12);
  assert.deepEqual(parked.facts, [0, 0]);
  assert.deepEqual(state(10000, 'kitchen'), parked);
});

test('hands and body continue smoothly across every pose boundary and remain still afterward', () => {
  for (const kind of ['opening', 'kitchen']) {
    let previous = state(0, kind);
    for (let time = 1000 / 60; time <= duration(kind); time += 1000 / 60) {
      const frame = state(time, kind);
      frame.joints.forEach((point, i) => assert(distance(point, previous.joints[i]) < .014));
      assert(Math.abs(frame.lean - previous.lean) < .004);
      assert(Math.abs(frame.nod - previous.nod) < .09);
      previous = frame;
    }
    for (let i = 0; i < poses[kind].length - 1; i++) {
      const solve = createJointWarp(poses[kind][i].joints);
      const targets = poses[kind][i].joints.map((point, j) => point.map((value, axis) => (value + poses[kind][i + 1].joints[j][axis]) / 2));
      const coefficients = solve(targets);
      poses[kind][i].joints.forEach((point, j) => assert(distance(applyJointWarp(point, poses[kind][i].joints, coefficients), targets[j]) < 1e-8));
      // The four torso, head and foot pins stay in place during the arm change.
      for (let j = 4; j < 8; j++) assert(distance(targets[j], poses[kind][i].joints[j]) < 1e-12);
    }
  }
});
