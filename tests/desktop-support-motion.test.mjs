import test from 'node:test';
import assert from 'node:assert/strict';
import { getDesktopSupportState as state, supportGestureDuration as duration } from '../src/frontend/src/utils/desktopSupportMotion.mjs';

test('desktop opening unfolds once and holds when the 740 reel has stopped', () => {
  let previous = Infinity;
  for (let time = 0; time <= duration('opening'); time += 1000 / 60) {
    const frame = state(time, 'opening');
    assert(frame.arm <= previous);
    previous = frame.arm;
  }
  assert.equal(state(2100, 'opening').arm, 0);
  assert(Math.abs(state(3600, 'opening').head) < 1e-12);
  assert.deepEqual(state(10000, 'opening'), state(3600, 'opening'));
});

test('desktop kitchen introduces fridge then fryer and nods exactly once', () => {
  assert.deepEqual(state(1800, 'kitchen').facts, [1, 0]);
  assert.deepEqual(state(3500, 'kitchen').facts, [0, 1]);
  let peaks = 0, previousSlope = 0;
  for (let time = 20; time <= duration('kitchen'); time += 20) {
    const current = state(time, 'kitchen'), previous = state(time - 20, 'kitchen');
    const slope = Math.sign(current.nod - previous.nod);
    if (slope < 0 && previousSlope > 0) peaks++;
    if (slope) previousSlope = slope;
    assert(current.facts.every(value => value >= 0 && value <= 1));
    assert(current.facts[0] * current.facts[1] === 0);
  }
  assert.equal(peaks, 1);
  const parked = state(6200, 'kitchen');
  assert(Math.abs(parked.nod) < 1e-12);
  assert(Math.abs(parked.arm) < 1e-12);
  assert(Math.abs(parked.head) < 1e-12);
  assert.deepEqual(parked.facts, [0, 0]);
  assert.deepEqual(state(10000, 'kitchen'), parked);
});

test('desktop arm and head have no frame jumps at cue boundaries', () => {
  for (const kind of ['opening', 'kitchen']) {
    let previous = state(0, kind);
    for (let time = 1000 / 60; time <= duration(kind); time += 1000 / 60) {
      const frame = state(time, kind);
      assert(Math.abs(frame.arm - previous.arm) < .009);
      assert(Math.abs(frame.head - previous.head) < .003);
      assert(Math.abs(frame.nod - previous.nod) < .09);
      previous = frame;
    }
  }
});
