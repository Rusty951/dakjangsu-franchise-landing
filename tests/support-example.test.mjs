import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSupportExample, monthlyLogisticsCredit, supportExample } from '../src/frontend/src/utils/supportExample.mjs';

test('meeting scenario totals 2800 without adding royalty or waiver twice', () => {
  const result = calculateSupportExample(supportExample);
  assert.equal(result.logistics, 1560);
  assert.equal(result.total, 2800);
  assert.deepEqual(result.periods.map(p => p.monthlyCredit * p.months), [360, 1200]);
  assert.equal(calculateSupportExample({ ...supportExample, salesPeriods: [] }).total, 1240);
});
test('logistics thresholds are inclusive and use only the highest applicable tier', () => {
  for (const [sales, credit] of [[0, 0], [2999, 0], [3000, 30], [3999, 30], [4000, 100], [5000, 100]]) {
    assert.equal(monthlyLogisticsCredit(sales), credit);
  }
});
