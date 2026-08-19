const API_BASE = window.APP_API_BASE || '';

const generateSopBtn = document.querySelector('#generateSopBtn');
const sopStatus = document.querySelector('#sopStatus');
const sopOutput = document.querySelector('#sopOutput');
const sopText = document.querySelector('#sopText');
const sopWordCount = document.querySelector('#sopWordCount');
const copySopBtn = document.querySelector('#copySopBtn');
const downloadSopBtn = document.querySelector('#downloadSopBtn');

generateSopBtn.addEventListener('click', async () => {
  const cv = window.__lastCvResult;
  if (!cv) {
    sopStatus.textContent = 'Analyze a CV in the CV Assistant above first — the SOP is built from those results.';
    return;
  }

  const targetCountry = document.querySelector('#sopCountry').value.trim();
  const targetUniversity = document.querySelector('#sopUniversity').value.trim();
  // Fall back to the subject already entered in the advisor form, if the
  // person hasn't typed a program here.
  const targetProgram = document.querySelector('#sopProgram').value.trim() || document.querySelector('#fieldSubject')?.value.trim() || '';
  const additionalNotes = document.querySelector('#sopNotes').value.trim();

  generateSopBtn.disabled = true;
  sopStatus.textContent = 'Drafting your Statement of Purpose...';
  sopOutput.hidden = true;

  try {
    const response = await fetch(`${API_BASE}/api/generate-sop`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ cv, targetCountry, targetUniversity, targetProgram, additionalNotes })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'SOP generation failed');

    sopText.value = data.sop;
    sopWordCount.textContent = `${data.wordCount} words`;
    sopOutput.hidden = false;
    sopStatus.textContent = 'Draft ready below. Review it, personalize anything that reads generic, and fact-check every detail before submitting.';
  } catch (error) {
    sopStatus.textContent = error.message;
  } finally {
    generateSopBtn.disabled = false;
  }
});

copySopBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(sopText.value);
    const label = copySopBtn.querySelector('span');
    const original = label.textContent;
    label.textContent = 'Copied!';
    setTimeout(() => {
      label.textContent = original;
    }, 1500);
  } catch {
    sopText.select();
    document.execCommand('copy');
  }
});

downloadSopBtn.addEventListener('click', () => {
  const blob = new Blob([sopText.value], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'statement-of-purpose.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});
