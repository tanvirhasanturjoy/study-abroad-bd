const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
const REQUEST_TIMEOUT_MS = 5000;
const cache = new Map();

// A few generic terms that rarely matter to an international bachelor's/master's
// applicant researching a country from Bangladesh (seminaries, bible colleges, etc).
const LOW_RELEVANCE_PATTERN = /bible|seminary|theological|community college|technical college/i;

export async function fetchUniversities(country, fetchImpl = fetch, limit = 6) {
  const cached = cache.get(country);
  if (cached && cached.expires > Date.now()) return cached.data;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const url = `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`;
    const response = await fetchImpl(url, {
      headers: { 'user-agent': 'Mozilla/5.0 StudyAbroadAIBD/0.1' },
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Universities API responded ${response.status}`);
    const payload = await response.json();
    const data = shapeResults(payload, country, limit);
    cache.set(country, { expires: Date.now() + CACHE_TTL_MS, data });
    return data;
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchUniversitiesForCountries(countries, fetchImpl = fetch, limit = 6) {
  const results = await Promise.all(countries.map((country) => fetchUniversities(country, fetchImpl, limit)));
  return Object.fromEntries(countries.map((country, index) => [country, results[index]]));
}

// Exported for tests: turns raw API rows into a clean, deduped, capped shortlist.
// The API is filtered defensively here rather than trusted, since the public
// endpoint has a known bug where it can ignore query params and return the
// full unfiltered dataset (see hipo/university-domains-list-api#31).
export function shapeResults(payload, country, limit = 6) {
  if (!Array.isArray(payload)) return [];

  const seen = new Set();
  const matches = payload.filter((item) => {
    if (!item || item.country !== country || !item.name) return false;
    if (LOW_RELEVANCE_PATTERN.test(item.name)) return false;
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });

  return matches
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, limit)
    .map((item) => ({
      name: item.name,
      country: item.country,
      stateProvince: item['state-province'] || null,
      website: item.web_pages?.[0] || null,
      domain: item.domains?.[0] || null
    }));
}
