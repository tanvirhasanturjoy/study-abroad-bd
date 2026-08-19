import assert from 'node:assert/strict';
import test from 'node:test';
import { recommendCountries } from '../src/shared/advisor.mjs';

const baseProfile = {
  gpa: 4.4,
  ielts: 6.5,
  budgetBdt: 2200000,
  degree: 'Bachelor',
  subject: 'Computer Science',
  priority: 'budget',
  hasSponsorDocs: true,
  hasBankStatement: true,
  wantsPrPathway: true
};

test('ranks budget-friendly countries higher for a budget-focused Bangladeshi student', () => {
  const result = recommendCountries(baseProfile, []);

  assert.equal(result.recommendations[0].country, 'Malaysia');
  assert.ok(result.recommendations[0].score > result.recommendations.at(-1).score);
});

test('shows a funding gap when yearly budget is below estimated first-year need', () => {
  const result = recommendCountries({ ...baseProfile, budgetBdt: 900000 }, []);
  const germany = result.recommendations.find((item) => item.country === 'Germany');

  assert.ok(germany.fundingGapBdt > 0);
  assert.match(germany.gaps.join(' '), /funding/i);
});

test('creates visa checklist items from missing readiness inputs', () => {
  const result = recommendCountries({
    ...baseProfile,
    ielts: 5.5,
    hasSponsorDocs: false,
    hasBankStatement: false
  }, []);

  assert.ok(result.visaChecklist.includes('Improve IELTS to at least 6.0 before applying to stronger options.'));
  assert.ok(result.visaChecklist.includes('Prepare sponsor income documents and relationship proof.'));
  assert.ok(result.visaChecklist.includes('Prepare a clean bank statement history before visa submission.'));
});

