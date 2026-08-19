import assert from 'node:assert/strict';
import test from 'node:test';
import { buildUserPrompt, validateSopInput } from '../src/server/sopAgent.mjs';

const sampleCv = {
  personalDetails: { fullName: 'Rafi Islam', email: 'rafi@example.com' },
  education: [
    { institution: 'BUET', degree: 'BSc', fieldOfStudy: 'CSE', gpaOrResult: '3.8', startDate: '2020', endDate: '2024' }
  ],
  skills: { technical: ['JavaScript', 'Python'], soft: ['Leadership'], languages: ['Bangla', 'English'], certifications: [] },
  summary: 'Aspiring software engineer with strong CS fundamentals.'
};

test('validateSopInput throws when no CV is given', () => {
  assert.throws(() => validateSopInput({}), /Analyze a CV/);
});

test('validateSopInput throws when CV has no usable data', () => {
  assert.throws(
    () => validateSopInput({ cv: { personalDetails: {}, education: [], skills: {}, summary: null } }),
    /no usable education/
  );
});

test('validateSopInput passes for a CV with at least a summary', () => {
  assert.doesNotThrow(() => validateSopInput({ cv: { summary: 'Something' } }));
});

test('buildUserPrompt includes education, skills, and summary from the CV', () => {
  const prompt = buildUserPrompt({ cv: sampleCv });
  assert.match(prompt, /BUET/);
  assert.match(prompt, /BSc/);
  assert.match(prompt, /CSE/);
  assert.match(prompt, /JavaScript, Python/);
  assert.match(prompt, /Aspiring software engineer/);
});

test('buildUserPrompt includes target details when provided', () => {
  const prompt = buildUserPrompt({
    cv: sampleCv,
    targetCountry: 'Germany',
    targetUniversity: 'TU Munich',
    targetProgram: 'MSc Computer Science',
    additionalNotes: 'Mention my interest in robotics.'
  });
  assert.match(prompt, /Germany/);
  assert.match(prompt, /TU Munich/);
  assert.match(prompt, /MSc Computer Science/);
  assert.match(prompt, /robotics/);
});

test('buildUserPrompt marks missing target details clearly instead of leaving blanks', () => {
  const prompt = buildUserPrompt({ cv: sampleCv });
  assert.match(prompt, /\(not specified\)/);
});
