import test from 'node:test';
import assert from 'node:assert/strict';
import { decodePoseImage } from '../src/frontend/src/utils/decodePoseImage.mjs';

test('leaving, returning and replaying reuse one successful image preparation', async () => {
  let calls = 0;
  const image = { getAttribute: () => '/pose.webp', decode: async () => { calls++; } };
  const first = decodePoseImage(image);
  assert.equal(decodePoseImage(image), first, 'concurrent visits share pending preparation');
  await first;
  for (let visit = 0; visit < 10; visit++) await decodePoseImage(image);
  assert.equal(calls, 1);
});

test('a changed source on the same node prepares the new image', async () => {
  let source = '/first.webp', calls = 0;
  const image = { getAttribute: () => source, decode: async () => { calls++; } };
  await decodePoseImage(image);
  source = '/second.webp';
  await decodePoseImage(image);
  assert.equal(calls, 2);
});

test('a failed image retries on the next visit', async () => {
  let calls = 0;
  const image = { getAttribute: () => '/retry.webp', decode: async () => {
    if (++calls === 1) throw new Error('temporary load failure');
  } };
  await assert.rejects(decodePoseImage(image), /temporary load failure/);
  await decodePoseImage(image);
  await decodePoseImage(image);
  assert.equal(calls, 2);
});

test('an obsolete failure cannot evict preparation for a newer source', async () => {
  let source = '/old.webp', failOld, calls = 0;
  const image = { getAttribute: () => source, decode: () => {
    calls++;
    return source === '/old.webp' ? new Promise((_, reject) => { failOld = reject; }) : Promise.resolve();
  } };
  const old = decodePoseImage(image);
  const rejected = assert.rejects(old, /old image failed/);
  await Promise.resolve();
  source = '/new.webp';
  const fresh = decodePoseImage(image);
  await fresh;
  failOld(new Error('old image failed'));
  await rejected;
  assert.equal(decodePoseImage(image), fresh);
  assert.equal(calls, 2);
});
