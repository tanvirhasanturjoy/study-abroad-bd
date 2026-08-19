import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { recommendCountries, countryNames } from '../shared/advisor.mjs';
import { researchWeb } from './research.mjs';
import { fetchUniversitiesForCountries } from './universities.mjs';
import { extractTextFromUpload, parseCvWithAgent } from './cvAgent.mjs';
import { generateSop } from './sopAgent.mjs';

const root = fileURLToPath(new URL('../client', import.meta.url));
const port = Number(process.env.PORT || 8787);
const CV_BODY_LIMIT_BYTES = 8_000_000; // base64 CV upload, ~6MB source file

const server = createServer(async (req, res) => {
  try {
    // Allow the Vercel-hosted frontend (a different origin) to call this API.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'POST' && url.pathname === '/api/recommend') {
      const profile = JSON.parse(await readBody(req));
      const [researchItems, universitiesByCountry] = await Promise.all([
        researchWeb(profile.subject),
        fetchUniversitiesForCountries(countryNames)
      ]);
      sendJson(res, recommendCountries(profile, researchItems, universitiesByCountry));
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/parse-cv') {
      const body = JSON.parse(await readBody(req, CV_BODY_LIMIT_BYTES));
      const cvText = body.fileBase64 ? await extractTextFromUpload(body) : String(body.cvText || '');
      if (!cvText.trim()) {
        sendJson(res, { error: 'No CV text found to analyze' }, 400);
        return;
      }
      sendJson(res, await parseCvWithAgent(cvText));
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/generate-sop') {
      const body = JSON.parse(await readBody(req, CV_BODY_LIMIT_BYTES));
      try {
        sendJson(res, await generateSop(body));
      } catch (error) {
        sendJson(res, { error: error.message || 'Failed to generate SOP' }, 400);
      }
      return;
    }

    if (req.method === 'GET' && url.pathname === '/healthz') {
      sendJson(res, { ok: true });
      return;
    }

    await serveStatic(url.pathname, res);
  } catch (error) {
    sendJson(res, { error: error.message || 'Server error' }, 500);
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Study Abroad AI BD running at http://127.0.0.1:${port}`);
});

async function serveStatic(pathname, res) {
  const requested = pathname === '/' ? '/index.html' : pathname;
  const safePath = normalize(requested).replace(/^(\.\.[/\\])+/, '');
  const filePath = join(root, safePath);
  const data = await readFile(filePath);
  res.writeHead(200, { 'content-type': contentType(filePath) });
  res.end(data);
}

function readBody(req, limitBytes = 1_000_000) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > limitBytes) req.destroy();
    });
    req.on('end', () => resolve(body || '{}'));
    req.on('error', reject);
  });
}

function sendJson(res, payload, status = 200) {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function contentType(filePath) {
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp'
  };
  return types[extname(filePath)] || 'application/octet-stream';
}
