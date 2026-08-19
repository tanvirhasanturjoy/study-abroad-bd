import assert from 'node:assert/strict';
import test from 'node:test';
import { shapeResults, fetchUniversities } from '../src/server/universities.mjs';

const samplePayload = [
  { name: 'Taylor University', country: 'Malaysia', 'state-province': null, domains: ['taylors.edu.my'], web_pages: ['https://university.taylors.edu.my/'] },
  { name: 'Asia Pacific University', country: 'Malaysia', 'state-province': null, domains: ['apu.edu.my'], web_pages: ['https://www.apu.edu.my/'] },
  { name: 'Zenith Bible College', country: 'Malaysia', 'state-province': null, domains: ['zbc.edu.my'], web_pages: ['https://zbc.edu.my/'] },
  { name: 'University of Manitoba', country: 'Canada', 'state-province': 'Manitoba', domains: ['umanitoba.ca'], web_pages: ['https://umanitoba.ca/'] }
];

test('shapeResults filters by exact country even if the API ignores the query param', () => {
  const result = shapeResults(samplePayload, 'Malaysia');
  assert.equal(result.length, 2);
  assert.ok(result.every((item) => item.country === 'Malaysia'));
});

test('shapeResults excludes low-relevance institution types', () => {
  const result = shapeResults(samplePayload, 'Malaysia');
  assert.ok(!result.some((item) => item.name.includes('Bible')));
});

test('shapeResults maps website and stateProvince fields', () => {
  const result = shapeResults(samplePayload, 'Canada');
  assert.deepEqual(result[0], {
    name: 'University of Manitoba',
    country: 'Canada',
    stateProvince: 'Manitoba',
    website: 'https://umanitoba.ca/',
    domain: 'umanitoba.ca'
  });
});

test('fetchUniversities returns an empty array when the request fails', async () => {
  const failingFetch = async () => ({ ok: false, status: 500 });
  const result = await fetchUniversities('Malaysia', failingFetch);
  assert.deepEqual(result, []);
});

test('fetchUniversities returns shaped data on success', async () => {
  const okFetch = async () => ({ ok: true, json: async () => samplePayload });
  const result = await fetchUniversities('Canada', okFetch);
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'University of Manitoba');
});
