import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `You are an experienced study-abroad admissions counselor who writes Statements of Purpose (SOPs) for Bangladeshi students applying to universities abroad.

You will be given the applicant's parsed CV data (education, skills, a short summary) plus optional target details (country, university, program, and any extra points they want included). Write a complete, well-structured Statement of Purpose in first person.

Rules:
- Use ONLY the facts given to you (education, skills, summary, extra notes). Never invent specific achievements, awards, numbers, project names, or work experience that were not provided.
- If a fact is thin or missing (e.g. no work experience given), write around it honestly rather than fabricating one — you can speak in terms of academic projects, coursework, or general motivation instead.
- If target country/university/program were not given, write a strong general-purpose SOP and note in square brackets where the student should insert those specifics, e.g. "[target university]".
- Structure: (1) an opening hook connecting the applicant's motivation to the field, (2) academic background and relevant skills, (3) why this specific program/university/country fits their goals, (4) future career goals and how the program bridges the gap, (5) a concise closing paragraph.
- Length target: 550–800 words, plain paragraphs (no markdown headers, no bullet points, no bold).
- Tone: genuine, specific, and confident — avoid generic filler phrases like "since I was young" or "I am a hardworking individual".
- Respond with ONLY the SOP text. No preamble, no title, no commentary before or after it.`;

export function buildUserPrompt({ cv, targetCountry, targetUniversity, targetProgram, additionalNotes }) {
  const personal = cv?.personalDetails || {};
  const education = Array.isArray(cv?.education) ? cv.education : [];
  const skills = cv?.skills || {};

  const educationLines = education.length
    ? education
        .map((entry) => {
          const parts = [entry.degree, entry.fieldOfStudy ? `in ${entry.fieldOfStudy}` : null, entry.institution ? `at ${entry.institution}` : null, entry.gpaOrResult ? `(result: ${entry.gpaOrResult})` : null, entry.startDate || entry.endDate ? `[${entry.startDate || '?'} - ${entry.endDate || 'present'}]` : null]
            .filter(Boolean)
            .join(' ');
          return `- ${parts}`;
        })
        .join('\n')
    : '- (no education entries provided)';

  const skillLines = ['technical', 'soft', 'languages', 'certifications']
    .map((key) => (skills[key]?.length ? `${key}: ${skills[key].join(', ')}` : null))
    .filter(Boolean)
    .join('\n');

  return `Applicant summary: ${cv?.summary || '(none provided)'}
Applicant name: ${personal.fullName || '(not given, do not invent one — write in first person without naming the applicant)'}

Education history (most recent first):
${educationLines}

Skills:
${skillLines || '(none provided)'}

Target details:
- Country: ${targetCountry || '(not specified)'}
- University: ${targetUniversity || '(not specified)'}
- Program / field of study: ${targetProgram || '(not specified — infer from education/skills if possible)'}

Extra points the applicant wants included (use only if consistent with the facts above):
${additionalNotes ? additionalNotes.trim() : '(none)'}

Write the Statement of Purpose now.`;
}

export function validateSopInput({ cv }) {
  if (!cv || typeof cv !== 'object') {
    throw new Error('No CV data provided. Analyze a CV in the CV Assistant above first.');
  }
  const hasEducation = Array.isArray(cv.education) && cv.education.length > 0;
  const hasSummary = Boolean(cv.summary);
  const hasSkills = Object.values(cv.skills || {}).some((list) => Array.isArray(list) && list.length > 0);
  if (!hasEducation && !hasSummary && !hasSkills) {
    throw new Error('The analyzed CV has no usable education, skills, or summary data to write from. Try re-analyzing the CV.');
  }
}

// Calls the Groq agent to draft an SOP from parsed CV data plus optional
// target-program details.
export async function generateSop(input) {
  validateSopInput(input);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not configured on the server');

  const groq = new Groq({ apiKey });
  const userPrompt = buildUserPrompt(input);

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (!content) throw new Error('SOP agent returned an empty response');

    return {
      sop: content,
      wordCount: content.split(/\s+/).filter(Boolean).length
    };
  } catch (error) {
    if (error.message.includes('SOP agent')) throw error;
    throw new Error(`SOP agent request failed: ${error.message}`);
  }
}
