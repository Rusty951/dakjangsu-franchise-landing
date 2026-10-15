import test from 'node:test';
import assert from 'node:assert/strict';
import { fitLiftActor } from '../src/frontend/src/utils/supportLiftGeometry.mjs';

test('lift palms stay under the number and visible feet stay above navigation', () => {
  for (const scene of [
    { maxWidth: 308, handY: 130, bottom: 405 },
    { maxWidth: 385, handY: 114, bottom: 484 },
    { maxWidth: 682, handY: 178, bottom: 1231 },
    { maxWidth: 937, handY: 280, bottom: 716 },
    { maxWidth: 667, handY: 199, bottom: 464 },
    { maxWidth: 1120, handY: 723, bottom: 1920 },
  ]) {
    const actor = fitLiftActor(scene);
    assert(actor.height > 0 && actor.width <= scene.maxWidth + 1e-8);
    assert(Math.abs(actor.width / actor.height - 2 / 3) < 1e-8);
    assert(Math.abs(actor.top + actor.height * .08 - scene.handY) < 1e-8);
    assert(actor.top + actor.height * .95 <= scene.bottom + 1e-8);
  }
});

test('tall portrait screens use their spare height beyond the old 460px cap', () => {
  const tall = fitLiftActor({ maxWidth: 682, handY: 178, bottom: 1231 });
  assert(tall.height >= 1000);
  const phone = fitLiftActor({ maxWidth: 385, handY: 114, bottom: 484 });
  assert(phone.height > 400);
});
