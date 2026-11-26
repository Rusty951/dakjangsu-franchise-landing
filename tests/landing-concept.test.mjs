import test from 'node:test';
import assert from 'node:assert/strict';
import { REVIEW_CONCEPTS, resolveLandingConcept } from '../src/frontend/src/utils/landingConcept.mjs';

test('production always shows the rebrand landing, whatever concept the link carries', () => {
  for (const search of ['', '?concept=rebrand', '?concept=v1', '?concept=', '?utm_source=kakao', ...REVIEW_CONCEPTS.map(c => `?concept=${c}`)]) {
    assert.equal(resolveLandingConcept(search, false), 'rebrand', search);
  }
});

test('review build opens old drafts only by exact name and falls back to rebrand', () => {
  for (const concept of REVIEW_CONCEPTS) {
    assert.equal(resolveLandingConcept(`?concept=${concept}&utm_source=x`, true), concept);
  }
  for (const search of ['', '?concept=v1', '?concept=POPART', '?concept=rebrand']) {
    assert.equal(resolveLandingConcept(search, true), 'rebrand', search);
  }
});
