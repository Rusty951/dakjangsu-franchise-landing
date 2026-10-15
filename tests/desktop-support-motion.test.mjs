import test from 'node:test';
import assert from 'node:assert/strict';
import { getDesktopSupportState as state, supportGestureDuration as duration, desktopSupportPoses as poses } from '../src/frontend/src/utils/desktopSupportMotion.mjs';

test('desktop opening welcomes with both arms through eight drawings and seats 740 once', () => {
  assert.equal(poses.opening.length, 8);
  assert(poses.opening.slice(1).every(pose => pose.source.includes('desktop-opening-welcome-v1')));
  assert.equal(state(0, 'opening').frame, 0);
  assert.equal(state(1000, 'opening').frame, 4);
  assert.equal(state(2400, 'opening').frame, 7);
  assert.equal(state(2400, 'opening').mix, 1);
  assert.equal(state(2500, 'opening').numberScale, .92);
  assert.equal(state(2780, 'opening').numberScale, 1.04);
  assert.equal(state(3250, 'opening').numberScale, 1);
  assert.deepEqual(state(10000, 'opening'), state(duration('opening'), 'opening'));
});

test('desktop kitchen unfolds through thirteen poses and holds each benefit for reading', () => {
  assert.equal(poses.kitchen.length, 13);
  assert.equal(new Set(poses.kitchen.map(pose => pose.source)).size, 13);
  assert.equal(poses.opening[0], poses.kitchen[0]);
  assert(poses.opening.slice(1).every(pose => !poses.kitchen.some(kitchen => kitchen.source === pose.source)));
  assert.equal(state(1800, 'kitchen').frame, 6);
  assert.equal(state(1800, 'kitchen').mix, 1);
  assert.deepEqual(state(1800, 'kitchen').facts, [1, 0]);
  assert.equal(state(3000, 'kitchen').frame, 9);
  assert.equal(state(3900, 'kitchen').frame, 12);
  assert.equal(state(3900, 'kitchen').mix, 1);
  assert.deepEqual(state(3900, 'kitchen').facts, [0, 1]);
  assert.deepEqual(state(10000, 'kitchen'), state(6000, 'kitchen'));
});

test('kitchen 500 rises and emphasizes once with the same timing as opening 740', () => {
  for (const time of [0, 1000, 1600, 2500, 2780, 3250, 4200]) {
    const opening = state(time, 'opening'), kitchen = state(time, 'kitchen');
    assert.equal(kitchen.numberY, opening.numberY);
    assert.equal(kitchen.numberScale, opening.numberScale);
  }
  assert.equal(state(0, 'kitchen').numberY, 16);
  assert.equal(state(2500, 'kitchen').numberY, 0);
  assert.equal(state(2780, 'kitchen').numberScale, 1.04);
  assert.equal(state(3250, 'kitchen').numberScale, 1);
});

test('dissolves remain continuous at pose changes and never dim the fixed body', () => {
  const weights = (time, kind) => {
    const { frame, previousFrame, mix } = state(time, kind);
    return poses[kind].map((_, i) => i === frame ? mix : i === previousFrame ? 1 - mix : 0);
  };
  for (const kind of ['opening', 'kitchen']) {
    let previous = weights(0, kind), blends = 0;
    for (let time = 1; time <= duration(kind); time++) {
      const current = weights(time, kind);
      assert(current.every(opacity => opacity >= 0 && opacity <= 1));
      assert(Math.abs(current.reduce((sum, opacity) => sum + opacity, 0) - 1) < 1e-10);
      assert(current.filter(opacity => opacity > 0).length <= 2);
      assert(current.every((opacity, i) => Math.abs(opacity - previous[i]) < .015));
      if (current.some(opacity => opacity > 0 && opacity < 1)) blends++;
      previous = current;
    }
    assert(blends > 600);
    assert.equal(weights(duration(kind), kind).at(-1), 1);
  }
});

test('generated pose indices advance once, stay in range and never loop', () => {
  for (const kind of ['opening', 'kitchen']) {
    let previous = -1;
    for (let time = -100; time <= duration(kind) + 1000; time += 20) {
      const frame = state(time, kind);
      assert(frame.frame >= previous && frame.frame < poses[kind].length);
      assert(frame.facts.every(value => value >= 0 && value <= 1));
      assert.equal(frame.facts[0] * frame.facts[1], 0);
      assert(frame.numberScale >= .92 && frame.numberScale <= 1.04);
      previous = frame.frame;
    }
  }
});
