import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import Groq from 'groq-sdk';

const MAX_CV_CHARS = 20_000;

const SYSTEM_PROMPT = `You are a resume/CV parsing agent for a study-abroad advisory tool used by students in Bangladesh.
You will be given the raw extracted text of a CV/resume, which may be messy (broken line breaks, OCR artifacts, mixed English/Bangla).
Read it carefully and return ONLY a single JSON object (no markdown fences, no commentary, no leading/trailing text) with this exact shape:

{
  "personalDetails": {
    "fullName": string | null,
    "email": string | null,
    "phone": string | null,
    "address": string | null,
    "dateOfBirth": string | null,
    "nationality": string | null,
    "linkedin": string | null,
    "portfolio": string | null
  },
  "education": [
    {
      "institution": string,
      "degree": string | null,
      "fieldOfStudy": string | null,
      "startDate": string | null,
      "endDate": string | null,
      "gpaOrResult": string | null,
      "location": string | null
    }
  ],
  "skills": {
    "technical": string[],
    "soft": string[],
    "languages": string[],
    "certifications": string[]
  },
  "summary": string | null
}

Rules:
- Only include information that is actually present or strongly implied in the text. Use null (not empty string) for missing single fields, and [] for missing lists.
- "education" must be ordered most recent first.
- Keep "summary" to at most 2 sentences, written in your own words, describing the candidate's profile.
- Never invent facts, dates, or numbers that are not supported by the text.
- Respond with raw JSON only.`;

export function truncateCvText(text, maxChars = MAX_CV_CHARS) {
  if (!text) return '';
  const trimmed = text.trim();
  return trimmed.length > maxChars ? `${trimmed.slice(0, maxChars)}\n[truncated]` : trimmed;
}

// Turns an uploaded file (as base64) into plain text, based on its extension.
export async function extractTextFromUpload({ fileName = '', fileBase64 }) {
  if (!fileBase64) throw new Error('No file content received');

  const buffer = Buffer.from(fileBase64, 'base64');
  const ext = (fileName.split('.').pop() || '').toLowerCase();

  if (ext === 'pdf') return extractPdfText(buffer);
  if (ext === 'docx') return extractDocxText(buffer);
  if (ext === 'txt' || ext === 'md' || ext === '') return buffer.toString('utf8');

  throw new Error(`Unsupported file type ".${ext}". Upload a PDF, DOCX, or TXT CV.`);
}

async function extractPdfText(buffer) {
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    return result.text || '';
  } finally {
    await parser.destroy();
  }
}

async function extractDocxText(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value || '';
}

// Calls the Groq agent to turn raw CV text into structured personal/education/skills data.
export async function parseCvWithAgent(cvText) {
  const text = truncateCvText(cvText);
  if (!text) throw new Error('CV text is empty');

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not configured on the server');

  const groq = new Groq({ apiKey });

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: `CV text:\n\n${text}`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('CV agent returned an empty response');

    const parsedJson = extractJsonFromResponse(content);
    return shapeAgentResult(parsedJson);
  } catch (error) {
    if (error.message.includes('CV agent')) throw error;
    throw new Error(`CV agent request failed: ${error.message}`);
  }
}

export function extractJsonFromResponse(text) {
  if (!text) throw new Error('CV agent returned an empty response');

  const cleaned = stripCodeFences(text.trim());
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        // fall through
      }
    }
    throw new Error('CV agent returned a response that was not valid JSON');
  }
}

function stripCodeFences(text) {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
}

export function shapeAgentResult(raw) {
  const personal = raw?.personalDetails || {};
  const skills = raw?.skills || {};

  return {
    personalDetails: {
      fullName: nullableString(personal.fullName),
      email: nullableString(personal.email),
      phone: nullableString(personal.phone),
      address: nullableString(personal.address),
      dateOfBirth: nullableString(personal.dateOfBirth),
      nationality: nullableString(personal.nationality),
      linkedin: nullableString(personal.linkedin),
      portfolio: nullableString(personal.portfolio)
    },
    education: Array.isArray(raw?.education) ? raw.education.map(shapeEducationEntry).filter(Boolean) : [],
    skills: {
      technical: stringArray(skills.technical),
      soft: stringArray(skills.soft),
      languages: stringArray(skills.languages),
      certifications: stringArray(skills.certifications)
    },
    summary: nullableString(raw?.summary)
  };
}

function shapeEducationEntry(entry) {
  if (!entry || !entry.institution) return null;
  return {
    institution: String(entry.institution),
    degree: nullableString(entry.degree),
    fieldOfStudy: nullableString(entry.fieldOfStudy),
    startDate: nullableString(entry.startDate),
    endDate: nullableString(entry.endDate),
    gpaOrResult: nullableString(entry.gpaOrResult),
    location: nullableString(entry.location)
  };
}

function nullableString(value) {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  return str.length ? str : null;
}

function stringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}