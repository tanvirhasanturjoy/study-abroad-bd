import assert from 'node:assert/strict';
import test from 'node:test';
import {
  extractJsonFromResponse,
  shapeAgentResult,
  truncateCvText,
  parseCvWithAgent
} from '../src/server/cvAgent.mjs';

test('extractJsonFromResponse parses a plain JSON text block', () => {
  const payload = { content: [{ type: 'text', text: '{"summary":"Backend developer"}' }] };
  assert.deepEqual(extractJsonFromResponse(payload), { summary: 'Backend developer' });
});

test('extractJsonFromResponse strips markdown code fences', () => {
  const payload = { content: [{ type: 'text', text: '```json\n{"summary":"Fenced"}\n```' }] };
  assert.deepEqual(extractJsonFromResponse(payload), { summary: 'Fenced' });
});

test('extractJsonFromResponse recovers JSON embedded in extra prose', () => {
  const payload = { content: [{ type: 'text', text: 'Sure, here it is:\n{"summary":"Recovered"}\nHope that helps!' }] };
  assert.deepEqual(extractJsonFromResponse(payload), { summary: 'Recovered' });
});

test('extractJsonFromResponse throws on empty response', () => {
  assert.throws(() => extractJsonFromResponse({ content: [] }), /empty response/);
});

test('shapeAgentResult fills in nulls and empty arrays for missing fields', () => {
  const result = shapeAgentResult({});
  assert.deepEqual(result, {
    personalDetails: {
      fullName: null,
      email: null,
      phone: null,
      address: null,
      dateOfBirth: null,
      nationality: null,
      linkedin: null,
      portfolio: null
    },
    education: [],
    skills: { technical: [], soft: [], languages: [], certifications: [] },
    summary: null
  });
});

test('shapeAgentResult keeps well-formed data and drops education entries without an institution', () => {
  const result = shapeAgentResult({
    personalDetails: { fullName: 'Rafi Islam', email: 'rafi@example.com' },
    education: [
      { institution: 'BUET', degree: 'BSc', fieldOfStudy: 'CSE', gpaOrResult: '3.8' },
      { degree: 'Missing institution' }
    ],
    skills: { technical: ['JavaScript', ' Node.js '], soft: [], languages: ['Bangla', 'English'], certifications: [] },
    summary: 'Aspiring software engineer with strong CS fundamentals.'
  });

  assert.equal(result.personalDetails.fullName, 'Rafi Islam');
  assert.equal(result.education.length, 1);
  assert.equal(result.education[0].institution, 'BUET');
  assert.deepEqual(result.skills.technical, ['JavaScript', 'Node.js']);
  assert.equal(result.summary, 'Aspiring software engineer with strong CS fundamentals.');
});

test('truncateCvText caps very long CV text', () => {
  const long = 'a'.repeat(25_000);
  const truncated = truncateCvText(long, 100);
  assert.ok(truncated.endsWith('[truncated]'));
  assert.ok(truncated.length < long.length);
});

test('parseCvWithAgent throws a clear error when ANTHROPIC_API_KEY is missing', async () => {
  const previous = process.env.ANTHROPIC_API_KEY;
  delete process.env.ANTHROPIC_API_KEY;
  try {
    await assert.rejects(() => parseCvWithAgent('Some CV text', async () => ({ ok: true })), /ANTHROPIC_API_KEY/);
  } finally {
    if (previous) process.env.ANTHROPIC_API_KEY = previous;
  }
});

test('parseCvWithAgent sends CV text to the Messages API and shapes the result', async () => {
  process.env.ANTHROPIC_API_KEY = 'test-key';
  const fakeFetch = async (url, options) => {
    assert.equal(url, 'https://api.anthropic.com/v1/messages');
    const body = JSON.parse(options.body);
    assert.match(body.messages[0].content, /Some CV text/);
    return {
      ok: true,
      json: async () => ({
        content: [{ type: 'text', text: '{"personalDetails":{"fullName":"Test User"},"education":[],"skills":{},"summary":null}' }]
      })
    };
  };

  const result = await parseCvWithAgent('Some CV text', fakeFetch);
  assert.equal(result.personalDetails.fullName, 'Test User');
});
