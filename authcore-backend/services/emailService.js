// Sends email via the Brevo (formerly Sendinblue) HTTPS Transactional Email
// API instead of raw SMTP. Render's free tier blocks outbound SMTP ports as
// an anti-spam measure, so nodemailer/Gmail never worked there — this talks
// to Brevo over plain HTTPS (port 443), which is never blocked.
//
// Required .env vars:
//   BREVO_API_KEY   - from Brevo dashboard -> Settings -> SMTP & API -> API Keys
//   EMAIL           - the "from" address, must be a Sender you verified in
//                      Brevo dashboard -> Settings -> Senders & IP

const PLACEHOLDER_KEY = "your_brevo_api_key";
const PLACEHOLDER_EMAIL = "your_verified_sender@example.com";

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";

function isConfigured() {
  return Boolean(
    process.env.BREVO_API_KEY &&
    process.env.EMAIL &&
    process.env.BREVO_API_KEY !== PLACEHOLDER_KEY &&
    process.env.EMAIL !== PLACEHOLDER_EMAIL
  );
}

// Sends one email through Brevo's API. Returns { ok, reason? }.
async function sendMail({ to, subject, html }) {
  try {
    const response = await fetch(BREVO_SEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "api-key": process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { email: process.env.EMAIL, name: "AuthCore" },
        to: [{ email: to }],
        subject,
        htmlContent: html
      })
    });

    if (!response.ok) {
      const body = await response.text();
      return { ok: false, reason: `Brevo API returned ${response.status}: ${body}` };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}

// Checks the API key/sender without sending an email. Used at server
// startup so a bad key or unverified sender is reported immediately
// instead of only surfacing when a user tries to register.
async function verifyEmailConfig() {
  if (!isConfigured()) {
    return {
      ok: false,
      reason:
        "BREVO_API_KEY / EMAIL in authcore-backend/.env are still placeholder values. OTP emails will not be sent until you add a real Brevo API key and a verified sender email."
    };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/account", {
      headers: {
        "Accept": "application/json",
        "api-key": process.env.BREVO_API_KEY
      }
    });

    if (!response.ok) {
      let reason = `Brevo rejected the API key (status ${response.status}).`;
      if (response.status === 401) {
        reason = "Brevo rejected the API key. Double-check BREVO_API_KEY was copied correctly from Brevo dashboard -> Settings -> SMTP & API -> API Keys.";
      }
      return { ok: false, reason };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}

module.exports = { sendMail, isConfigured, verifyEmailConfig };
