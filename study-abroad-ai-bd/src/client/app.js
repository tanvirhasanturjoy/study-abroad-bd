const API_BASE = window.APP_API_BASE || '';

const form = document.querySelector('#profileForm');
const statusBox = document.querySelector('#status');
const resultsBox = document.querySelector('#results');

const cvFileInput = document.querySelector('#cvFile');
const cvTextInput = document.querySelector('#cvTextInput');
const analyzeCvBtn = document.querySelector('#analyzeCvBtn');
const cvStatus = document.querySelector('#cvStatus');
const cvResults = document.querySelector('#cvResults');

let lastCvResult = null;

analyzeCvBtn.addEventListener('click', async () => {
  const file = cvFileInput.files[0];
  const pastedText = cvTextInput.value.trim();

  if (!file && !pastedText) {
    cvStatus.textContent = 'Upload a CV file or paste some CV text first.';
    return;
  }

  analyzeCvBtn.disabled = true;
  cvStatus.textContent = 'Reading the CV and asking the agent to separate the details...';
  cvResults.innerHTML = '';

  try {
    const payload = file ? { fileName: file.name, fileBase64: await fileToBase64(file) } : { cvText: pastedText };
    const response = await fetch(`${API_BASE}/api/parse-cv`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'CV analysis failed');

    lastCvResult = data;
    window.__lastCvResult = data; // exposed so the Account/Profile view can import from it
    cvStatus.textContent = 'Done. Here is what the agent found:';
    renderCvResults(data);
  } catch (error) {
    cvStatus.textContent = error.message;
  } finally {
    analyzeCvBtn.disabled = false;
  }
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1] || '');
    reader.onerror = () => reject(new Error('Could not read the file'));
    reader.readAsDataURL(file);
  });
}

function renderCvResults(data) {
  const { personalDetails, education, skills, summary } = data;

  const personalRows = Object.entries(personalDetails)
    .filter(([, value]) => value)
    .map(([key, value]) => `<li><strong>${escapeHtml(labelize(key))}:</strong> ${escapeHtml(value)}</li>`)
    .join('');

  const educationRows = education
    .map(
      (entry) => `
        <li>
          <strong>${escapeHtml(entry.institution)}</strong>
          ${entry.degree ? ` — ${escapeHtml(entry.degree)}` : ''}${entry.fieldOfStudy ? ` in ${escapeHtml(entry.fieldOfStudy)}` : ''}
          <div class="cv-edu-meta">
            ${[entry.startDate || entry.endDate ? `${escapeHtml(entry.startDate || '?')} – ${escapeHtml(entry.endDate || 'present')}` : null, entry.gpaOrResult ? `Result: ${escapeHtml(entry.gpaOrResult)}` : null, entry.location ? escapeHtml(entry.location) : null]
              .filter(Boolean)
              .join(' · ')}
          </div>
        </li>`
    )
    .join('');

  const skillGroups = ['technical', 'soft', 'languages', 'certifications']
    .filter((key) => skills[key]?.length)
    .map(
      (key) => `
        <div class="cv-skill-group">
          <span>${labelize(key)}</span>
          <div class="cv-chips">${skills[key].map((item) => `<span class="cv-chip">${escapeHtml(item)}</span>`).join('')}</div>
        </div>`
    )
    .join('');

  cvResults.innerHTML = `
    ${summary ? `<p class="cv-summary">${escapeHtml(summary)}</p>` : ''}
    <div class="cv-columns">
      <article class="mini-panel">
        <h3>Personal details</h3>
        ${personalRows ? `<ul class="cv-list">${personalRows}</ul>` : '<p class="cv-empty">No personal details found.</p>'}
      </article>
      <article class="mini-panel">
        <h3>Education</h3>
        ${educationRows ? `<ul class="cv-list">${educationRows}</ul>` : '<p class="cv-empty">No education entries found.</p>'}
      </article>
      <article class="mini-panel">
        <h3>Skills</h3>
        ${skillGroups || '<p class="cv-empty">No skills found.</p>'}
      </article>
    </div>
    <button type="button" id="useCvBtn" class="cv-apply-btn"><span>Use this to fill the profile form</span></button>
  `;

  document.querySelector('#useCvBtn').addEventListener('click', applyCvToForm);
}

function applyCvToForm() {
  if (!lastCvResult) return;
  const topEducation = lastCvResult.education[0];
  if (topEducation?.fieldOfStudy) document.querySelector('#fieldSubject').value = topEducation.fieldOfStudy;
  if (topEducation?.degree) {
    const degreeSelect = document.querySelector('#fieldDegree');
    const match = [...degreeSelect.options].find((opt) => topEducation.degree.toLowerCase().includes(opt.value.toLowerCase()));
    if (match) degreeSelect.value = match.value;
  }
  const numericResult = parseFloat(topEducation?.gpaOrResult);
  if (!Number.isNaN(numericResult)) document.querySelector('#fieldGpa').value = numericResult;

  cvStatus.textContent = 'Profile form updated from the CV. Review the values, then research.';
  document.querySelector('#profileForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function labelize(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const profile = {
    subject: data.get('subject'),
    degree: data.get('degree'),
    gpa: Number(data.get('gpa')),
    ielts: Number(data.get('ielts')),
    budgetBdt: Number(data.get('budgetBdt')),
    priority: data.get('priority'),
    hasBankStatement: data.has('hasBankStatement'),
    hasSponsorDocs: data.has('hasSponsorDocs'),
    wantsPrPathway: data.has('wantsPrPathway')
  };

  statusBox.textContent = 'Researching current web information and scoring options...';
  resultsBox.innerHTML = '<div class="loading-card"><span></span><strong>Scanning current study abroad signals...</strong><p>Checking visa, tuition, source snippets, and budget fit.</p></div>';

  try {
    const response = await fetch(`${API_BASE}/api/recommend`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (!response.ok) throw new Error('Recommendation failed');
    renderResults(await response.json());
  } catch (error) {
    statusBox.textContent = error.message;
  }
});

function renderResults(data) {
  statusBox.textContent = data.summary;
  resultsBox.innerHTML = `
    <div class="cards">
      ${data.recommendations.slice(0, 4).map(renderCountry).join('')}
    </div>
    <div class="split">
      <article class="mini-panel">
        <h2>Visa readiness checklist</h2>
        <ul>${data.visaChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </article>
      <article class="mini-panel">
        <h2>Current research sources</h2>
        ${data.researchItems.length ? `<ol>${data.researchItems.map(renderSource).join('')}</ol>` : '<p>Live search returned no snippets. Use official immigration and university pages before final decisions.</p>'}
      </article>
    </div>
  `;
}

function renderCountry(item, index) {
  return `
    <article class="country-card ${index === 0 ? 'best' : ''}">
      <div class="card-head">
        <div>
          <span class="rank">#${index + 1}</span>
          <h2>${escapeHtml(item.country)}</h2>
        </div>
        <div class="score-ring" style="--score:${item.score}">
          <strong>${item.score}</strong>
          <small>/100</small>
        </div>
      </div>
      <div class="metric-row">
        <span>${formatBdt(item.estimatedFirstYearBdt)}</span>
        <span>${escapeHtml(item.visaRisk)} visa risk</span>
      </div>
      <h3>Why it fits</h3>
      <ul>${item.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join('')}</ul>
      <h3>University direction</h3>
      <ul class="university-list">${item.universities.map(renderUniversity).join('')}</ul>
      ${item.gaps.length ? `<h3>Gaps to fix</h3><ul class="gaps">${item.gaps.map((gap) => `<li>${escapeHtml(gap)}</li>`).join('')}</ul>` : '<p class="ready">No major first-pass gap found.</p>'}
    </article>
  `;
}

function renderUniversity(uni) {
  const name = escapeHtml(uni.name);
  const state = uni.stateProvince ? ` <span class="uni-state">(${escapeHtml(uni.stateProvince)})</span>` : '';
  if (uni.website) {
    return `<li><a href="${escapeHtml(uni.website)}" target="_blank" rel="noreferrer">${name}</a>${state}</li>`;
  }
  return `<li>${name}${state}</li>`;
}

function renderSource(item) {
  return `<li><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a><p>${escapeHtml(item.snippet)}</p></li>`;
}

function formatBdt(value) {
  return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
