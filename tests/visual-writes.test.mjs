import test from 'node:test';
import assert from 'node:assert/strict';
import { writeData, writeStyle } from '../src/frontend/src/utils/visualWrites.mjs';
import { desktopSupportPoses, getDesktopSupportState, supportGestureDuration } from '../src/frontend/src/utils/desktopSupportMotion.mjs';

function trackedElement() {
  let writes = 0;
  const styles = new Map();
  return { get writes() { return writes; },
    dataset: new Proxy({}, { set(target, key, value) { writes++; target[key] = value; return true; } }),
    style: { getPropertyValue: key => styles.get(key) ?? '', setProperty: (key, value) => { writes++; styles.set(key, value); } },
  };
}

test('unchanged scroll pause state does not wake observers or restart motion', () => {
  const element = trackedElement();
  for (let i = 0; i < 120; i++) writeData(element, 'motionPaused', 'false');
  assert.equal(element.writes, 1);
  writeData(element, 'motionPaused', 'true');
  writeData(element, 'motionPaused', 'false');
  assert.equal(element.writes, 3);
});

test('pose opacity is identical while skipping over 85 percent of redundant writes', () => {
  for (const kind of ['opening', 'kitchen']) {
    const images = desktopSupportPoses[kind].map(trackedElement);
    let baseline = 0;
    for (let time = 0; time <= supportGestureDuration(kind); time += 1000 / 60) {
      const state = getDesktopSupportState(time, kind);
      images.forEach((image, i) => {
        const opacity = i === state.frame ? state.mix : i === state.previousFrame ? 1 - state.mix : 0;
        writeData(image, 'visible', String(opacity > 0));
        writeStyle(image, '--dks-pose-opacity', opacity.toFixed(4));
        assert.equal(image.style.getPropertyValue('--dks-pose-opacity'), opacity.toFixed(4));
        baseline += 2;
      });
    }
    const optimized = images.reduce((sum, image) => sum + image.writes, 0);
    assert(optimized < baseline * .15, `${kind}: ${optimized}/${baseline}`);
  }
});
