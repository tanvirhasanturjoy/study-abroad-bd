export function buildResearchQueries(subject) {
  const topic = subject || 'Computer Science';
  return [
    `Bangladesh students study abroad ${topic} tuition visa requirements 2026`,
    `${topic} international student tuition proof of funds visa Bangladesh`,
    `best countries for Bangladeshi students ${topic} post study work visa`
  ];
}

export async function researchWeb(subject, fetchImpl = fetch) {
  const queries = buildResearchQueries(subject);
  const results = [];

  for (const query of queries) {
    try {
      const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
      const response = await fetchImpl(url, {
        headers: {
          'user-agent': 'Mozilla/5.0 StudyAbroadAIBD/0.1'
        }
      });
      if (!response.ok) continue;
      const html = await response.text();
      results.push(...parseDuckDuckGoHtml(html));
    } catch {
      continue;
    }
  }

  return uniqueByUrl(results).slice(0, 8);
}

export function parseDuckDuckGoHtml(html) {
  const titleMatches = [...html.matchAll(/<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  const snippetMatches = [...html.matchAll(/<a[^>]*class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)];

  return titleMatches.map((match, index) => ({
    title: cleanHtml(match[2]),
    url: normalizeDuckUrl(match[1]),
    snippet: cleanHtml(snippetMatches[index]?.[1] || '')
  })).filter((item) => item.title && item.url);
}

function normalizeDuckUrl(url) {
  let output = url.startsWith('//') ? `https:${url}` : url;
  try {
    const parsed = new URL(output);
    const redirected = parsed.searchParams.get('uddg');
    if (redirected) output = decodeURIComponent(redirected);
  } catch {
    return output;
  }
  return output;
}

function cleanHtml(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function uniqueByUrl(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

