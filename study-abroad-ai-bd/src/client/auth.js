// ---------------------------------------------------------------------------
// Account: login / registration (with OTP) / profile — talks to the AuthCore
// backend (separate Node + MySQL service). Keeps the same visual language as
// app.js (status boxes, escapeHtml, etc.) but lives in its own module so the
// Advisor and Account features stay easy to reason about independently.
// ---------------------------------------------------------------------------

const TOKEN_KEY = 'sabd_token';

// AuthCore runs as its own service (see /authcore-backend). Default: same
// host as this page, port 5000. Override by setting window.AUTHCORE_API_BASE
// before this script runs, if you deploy it somewhere else.
const AUTH_API_BASE =
  window.AUTHCORE_API_BASE || `${location.protocol}//${location.hostname}:5000/api`;

let currentUser = null; // { id, fullname, email, phone, profile_completed }
let currentProfile = null; // profile row, or null if none exists yet
let pendingAvatarDataUrl = null; // base64 data URL staged from the file input

// ----------------------------- view switching -----------------------------

const views = {
  advisor: document.querySelector('#view-advisor'),
  account: document.querySelector('#view-account')
};

document.querySelectorAll('[data-view-link]').forEach((el) => {
  el.addEventListener('click', (event) => {
    event.preventDefault();
    setActiveView(el.getAttribute('data-view-link'));
  });
});

function setActiveView(name) {
  Object.entries(views).forEach(([key, section]) => {
    section.hidden = key !== name;
  });
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-view-link') === name);
  });
}

// ----------------------------- auth sub-tabs -------------------------------

const authTabButtons = document.querySelectorAll('.auth-tab-btn');
const authForms = {
  login: document.querySelector('#loginForm'),
  register: document.querySelector('#registerForm')
};

authTabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-auth-tab');
    authTabButtons.forEach((b) => b.classList.toggle('active', b === btn));
    Object.entries(authForms).forEach(([key, form]) => {
      form.hidden = key !== target;
    });
  });
});

function switchToLoginTab(prefillEmail) {
  document.querySelector('[data-auth-tab="login"]').click();
  if (prefillEmail) loginForm.email.value = prefillEmail;
}

// ----------------------------------- login ----------------------------------

const loginForm = document.querySelector('#loginForm');
const loginStatus = document.querySelector('#loginStatus');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;
  setStatus(loginStatus, 'Logging in...', 'pending');

  try {
    const data = await apiRequest('/auth/login', { method: 'POST', body: { email, password } });
    localStorage.setItem(TOKEN_KEY, data.token);
    setStatus(loginStatus, 'Welcome back!', 'good');
    loginForm.reset();
    await loadSession();
  } catch (error) {
    setStatus(loginStatus, error.message, 'bad');
  }
});

// --------------------------------- register ---------------------------------

const registerForm = document.querySelector('#registerForm');
const registerStepStatus = document.querySelector('#registerStepStatus');
const registerStatus = document.querySelector('#registerStatus');
const sendOtpBtn = document.querySelector('#sendOtpBtn');
const verifyOtpBtn = document.querySelector('#verifyOtpBtn');
const otpRow = document.querySelector('#otpRow');

let otpVerified = false;

sendOtpBtn.addEventListener('click', async () => {
  const fullname = document.querySelector('#regFullname').value.trim();
  const email = document.querySelector('#regEmail').value.trim();
  const phone = document.querySelector('#regPhone').value.trim();

  if (!/^[A-Za-z ]{3,50}$/.test(fullname)) {
    setStatus(registerStepStatus, 'Full name should be 3–50 letters and spaces.', 'bad');
    return;
  }
  if (!/^01[3-9]\d{8}$/.test(phone)) {
    setStatus(registerStepStatus, 'Enter a valid Bangladeshi number, e.g. 017XXXXXXXX.', 'bad');
    return;
  }

  sendOtpBtn.disabled = true;
  setStatus(registerStepStatus, 'Sending a verification code to your email...', 'pending');

  try {
    await apiRequest('/auth/send-otp', { method: 'POST', body: { email, phone } });
    otpRow.hidden = false;
    setStatus(registerStepStatus, 'Code sent. Check your inbox (and spam folder).', 'good');
  } catch (error) {
    setStatus(registerStepStatus, error.message, 'bad');
  } finally {
    sendOtpBtn.disabled = false;
  }
});

verifyOtpBtn.addEventListener('click', async () => {
  const email = document.querySelector('#regEmail').value.trim();
  const otp = document.querySelector('#regOtp').value.trim();

  if (!otp) {
    setStatus(registerStepStatus, 'Enter the code from your email first.', 'bad');
    return;
  }

  verifyOtpBtn.disabled = true;
  setStatus(registerStepStatus, 'Verifying...', 'pending');

  try {
    await apiRequest('/auth/verify-otp', { method: 'POST', body: { email, otp } });
    otpVerified = true;
    setStatus(registerStepStatus, 'Contact verified.', 'good');
    goToRegisterStep(2);
  } catch (error) {
    setStatus(registerStepStatus, error.message, 'bad');
  } finally {
    verifyOtpBtn.disabled = false;
  }
});

function goToRegisterStep(step) {
  document.querySelectorAll('.reg-step').forEach((el) => {
    el.hidden = Number(el.getAttribute('data-reg-step')) !== step;
  });
  document.querySelectorAll('.stepper .step').forEach((el) => {
    el.classList.toggle('active', Number(el.getAttribute('data-step')) === step);
    el.classList.toggle('done', Number(el.getAttribute('data-step')) < step);
  });
}

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!otpVerified) {
    setStatus(registerStatus, 'Verify your email and phone first.', 'bad');
    return;
  }

  const fullname = document.querySelector('#regFullname').value.trim();
  const email = document.querySelector('#regEmail').value.trim();
  const phone = document.querySelector('#regPhone').value.trim();
  const password = document.querySelector('#regPassword').value;
  const confirmPassword = document.querySelector('#regConfirmPassword').value;

  if (password.length < 8 || password.length > 30) {
    setStatus(registerStatus, 'Password should be 8–30 characters.', 'bad');
    return;
  }
  if (password !== confirmPassword) {
    setStatus(registerStatus, 'Passwords do not match.', 'bad');
    return;
  }

  setStatus(registerStatus, 'Creating your account...', 'pending');

  try {
    await apiRequest('/auth/register', { method: 'POST', body: { fullname, email, phone, password } });
    setStatus(registerStatus, 'Account created. You can log in now.', 'good');
    registerForm.reset();
    otpRow.hidden = true;
    otpVerified = false;
    goToRegisterStep(1);
    setTimeout(() => switchToLoginTab(email), 700);
  } catch (error) {
    setStatus(registerStatus, error.message, 'bad');
  }
});

// ------------------------------- session / nav -------------------------------

const sessionArea = document.querySelector('#sessionArea');
const authCard = document.querySelector('#authCard');
const profileArea = document.querySelector('#profileArea');

async function loadSession() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    renderSignedOut();
    return;
  }

  try {
    const data = await apiRequest('/auth/me', { method: 'GET', auth: true });
    currentUser = data.user;
    renderSignedIn();
    await loadProfile();
  } catch (error) {
    localStorage.removeItem(TOKEN_KEY);
    renderSignedOut();
  }
}

function renderSignedIn() {
  authCard.hidden = true;
  profileArea.hidden = false;
  sessionArea.innerHTML = `
    <div class="user-chip">
      <span class="user-avatar">${escapeHtml(initials(currentUser.fullname))}</span>
      <span class="user-name">${escapeHtml(currentUser.fullname)}</span>
      <button type="button" id="logoutBtn" class="ghost-btn">Log out</button>
    </div>
  `;
  document.querySelector('#logoutBtn').addEventListener('click', logout);
}

function renderSignedOut() {
  currentUser = null;
  currentProfile = null;
  authCard.hidden = false;
  profileArea.hidden = true;
  sessionArea.innerHTML = `<button type="button" class="ghost-btn" data-view-link="account">Log in / Sign up</button>`;
  sessionArea.querySelector('[data-view-link]').addEventListener('click', (event) => {
    event.preventDefault();
    setActiveView('account');
  });
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
  renderSignedOut();
}

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

// -------------------------------- profile CRUD --------------------------------

const profileSummary = document.querySelector('#profileSummary');
const profileEditForm = document.querySelector('#profileEditForm');
const profileFormTitle = document.querySelector('#profileFormTitle');
const profileStatus = document.querySelector('#profileStatus');
const avatarPreview = document.querySelector('#avatarPreview');
const avatarFile = document.querySelector('#avatarFile');
const avatarHint = document.querySelector('#avatarHint');

async function loadProfile() {
  try {
    const data = await apiRequest(`/profile/${currentUser.id}`, { method: 'GET', auth: true });
    currentProfile = data.profile;
    fillProfileForm(currentProfile);
    renderProfileSummary(currentProfile);
    profileFormTitle.textContent = 'Edit your profile';
    document.querySelector('#profileSubmitBtn span').textContent = 'Save changes';
  } catch (error) {
    // 404 just means the profile hasn't been created yet
    currentProfile = null;
    profileSummary.innerHTML = `
      <div class="panel-title">
        <span>!</span>
        <div>
          <h2>No profile yet</h2>
          <p>Fill in the form below to create one — it only takes a minute.</p>
        </div>
      </div>
    `;
    profileFormTitle.textContent = 'Create your profile';
    document.querySelector('#profileSubmitBtn span').textContent = 'Save profile';
  }
}

function renderProfileSummary(profile) {
  profileSummary.innerHTML = `
    <div class="panel-title">
      <span>${escapeHtml(initials(currentUser.fullname))}</span>
      <div>
        <h2>${escapeHtml(currentUser.fullname)}</h2>
        <p>${escapeHtml(currentUser.email)} · ${escapeHtml(currentUser.phone)}</p>
      </div>
    </div>
    <div class="metric-row">
      ${profile.profile_type ? `<span>${escapeHtml(labelize(profile.profile_type))}</span>` : ''}
      ${profile.institution ? `<span>${escapeHtml(profile.institution)}</span>` : ''}
      ${profile.cgpa ? `<span>CGPA ${escapeHtml(String(profile.cgpa))}</span>` : ''}
      ${profile.graduation_year ? `<span>Class of ${escapeHtml(String(profile.graduation_year))}</span>` : ''}
    </div>
  `;
}

function fillProfileForm(profile) {
  document.querySelector('#profileType').value = profile.profile_type || 'student';
  document.querySelector('#profileIdNumber').value = profile.id_number || '';
  document.querySelector('#profileInstitution').value = profile.institution || '';
  document.querySelector('#profileDepartment').value = profile.department || '';
  document.querySelector('#profileCgpa').value = profile.cgpa || '';
  document.querySelector('#profileSemester').value = profile.semester || '';
  document.querySelector('#profileGradYear').value = profile.graduation_year || '';
  document.querySelector('#profileAddress').value = profile.address || '';
  document.querySelector('#profileBio').value = profile.bio || '';
  if (profile.profile_picture) {
    pendingAvatarDataUrl = profile.profile_picture;
    setAvatarPreview(profile.profile_picture);
  }
}

avatarFile.addEventListener('change', async () => {
  const file = avatarFile.files[0];
  if (!file) return;
  const dataUrl = await fileToDataUrl(file);
  const approxBytes = Math.ceil((dataUrl.length * 3) / 4);
  if (approxBytes > 150_000) {
    avatarHint.textContent = 'That image is a bit large — pick something smaller for a smooth save.';
    avatarHint.classList.add('warn');
    return;
  }
  avatarHint.classList.remove('warn');
  avatarHint.textContent = 'Looks good.';
  pendingAvatarDataUrl = dataUrl;
  setAvatarPreview(dataUrl);
});

function setAvatarPreview(src) {
  avatarPreview.innerHTML = `<img src="${src}" alt="Profile photo preview" />`;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read that image'));
    reader.readAsDataURL(file);
  });
}

document.querySelector('#importFromCvBtn').addEventListener('click', () => {
  const cv = window.__lastCvResult;
  if (!cv) {
    setStatus(profileStatus, 'Analyze a CV in the Advisor tab first, then come back and import.', 'bad');
    return;
  }
  const topEducation = cv.education?.[0];
  if (topEducation?.institution) document.querySelector('#profileInstitution').value = topEducation.institution;
  if (topEducation?.fieldOfStudy) document.querySelector('#profileDepartment').value = topEducation.fieldOfStudy;
  const numericResult = parseFloat(topEducation?.gpaOrResult);
  if (!Number.isNaN(numericResult)) document.querySelector('#profileCgpa').value = numericResult;
  if (cv.summary) document.querySelector('#profileBio').value = cv.summary;
  setStatus(profileStatus, 'Pulled details from your analyzed CV. Review and save.', 'good');
});

profileEditForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    user_id: currentUser.id,
    profile_type: document.querySelector('#profileType').value,
    profile_picture: pendingAvatarDataUrl || '',
    id_number: document.querySelector('#profileIdNumber').value.trim(),
    institution: document.querySelector('#profileInstitution').value.trim(),
    department: document.querySelector('#profileDepartment').value.trim(),
    cgpa: document.querySelector('#profileCgpa').value || null,
    semester: document.querySelector('#profileSemester').value.trim(),
    graduation_year: document.querySelector('#profileGradYear').value.trim(),
    address: document.querySelector('#profileAddress').value.trim(),
    bio: document.querySelector('#profileBio').value.trim()
  };

  setStatus(profileStatus, currentProfile ? 'Saving changes...' : 'Creating your profile...', 'pending');

  try {
    if (currentProfile) {
      await apiRequest(`/profile/update-profile/${currentUser.id}`, { method: 'PUT', body: payload, auth: true });
      setStatus(profileStatus, 'Profile updated.', 'good');
    } else {
      await apiRequest('/profile/create-profile', { method: 'POST', body: payload, auth: true });
      setStatus(profileStatus, 'Profile created.', 'good');
    }
    await loadProfile();
  } catch (error) {
    setStatus(profileStatus, error.message, 'bad');
  }
});

// ----------------------------------- helpers -----------------------------------

async function apiRequest(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'content-type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem(TOKEN_KEY);
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${AUTH_API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  let data = {};
  try {
    data = await response.json();
  } catch {
    // some routes may return plain text; ignore parse errors
  }
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }
  return data;
}

function setStatus(el, message, kind) {
  el.hidden = false;
  el.textContent = message;
  el.classList.remove('status-good', 'status-bad', 'status-pending');
  el.classList.add(`status-${kind}`);
}

function labelize(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()).trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// -------------------------------- boot --------------------------------

loadSession();
