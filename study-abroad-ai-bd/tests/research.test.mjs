import assert from 'node:assert/strict';
import test from 'node:test';
import { buildResearchQueries, parseDuckDuckGoHtml } from '../src/server/research.mjs';

test('builds Bangladesh-specific study abroad research queries', () => {
  const queries = buildResearchQueries('Computer Science');

  assert.match(queries[0], /Bangladesh/i);
  assert.match(queries.join(' '), /visa/i);
  assert.match(queries.join(' '), /Computer Science/i);
});

test('parses DuckDuckGo result links and snippets from HTML', () => {
  const html = `
    <a class="result__a" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fexample.edu%2Fadmission">Admission</a>
    <a class="result__snippet">Tuition and visa details for international students.</a>
  `;

  const results = parseDuckDuckGoHtml(html);

  assert.deepEqual(results[0], {
    title: 'Admission',
    url: 'https://example.edu/admission',
    snippet: 'Tuition and visa details for international students.'
  });
});
