import test from 'node:test';
import assert from 'node:assert/strict';
import { getDesktopSupportState as state, supportGestureDuration as duration, desktopSupportPoses as poses } from '../src/frontend/src/utils/desktopSupportMotion.mjs';

test('desktop opening uses three generated drawings and seats 740 once', () => {
  assert.equal(poses.opening.length, 3);
  assert.equal(state(0, 'opening').frame, 0);
  assert.equal(state(1000, 'opening').frame, 1);
  assert.equal(state(2400, 'opening').frame, 2);
  assert.equal(state(2500, 'opening').numberScale, .92);
  assert.equal(state(2780, 'opening').numberScale, 1.04);
  assert.equal(state(3250, 'opening').numberScale, 1);
  assert.deepEqual(state(10000, 'opening'), state(duration('opening'), 'opening'));
});

test('desktop kitchen uses all five generated poses and emphasizes the matching hand', () => {
  assert.equal(poses.kitchen.length, 5);
  assert.equal(new Set(poses.kitchen.map(pose => pose.source)).size, 5);
  assert.deepEqual(poses.opening, poses.kitchen.slice(0, 3));
  assert.equal(state(1800, 'kitchen').frame, 2);
  assert.deepEqual(state(1800, 'kitchen').facts, [1, 0]);
  assert.equal(state(3000, 'kitchen').frame, 3);
  assert.equal(state(3900, 'kitchen').frame, 4);
  assert.deepEqual(state(3900, 'kitchen').facts, [0, 1]);
  assert.deepEqual(state(10000, 'kitchen'), state(6000, 'kitchen'));
});

test('generated pose indices advance once, stay in range and never loop', () => {
  for (const kind of ['opening', 'kitchen']) {
    let previous = -1;
    for (let time = -100; time <= duration(kind) + 1000; time += 20) {
      const frame = state(time, kind);
      assert(frame.frame >= previous && frame.frame < poses[kind].length);
      assert(frame.facts.every(value => value >= 0 && value <= 1));
      assert.equal(frame.facts[0] * frame.facts[1], 0);
      if (kind === 'kitchen') assert.equal(frame.numberScale, 1);
      previous = frame.frame;
    }
  }
});
