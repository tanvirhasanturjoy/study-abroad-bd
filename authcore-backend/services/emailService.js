const nodemailer = require("nodemailer");

const PLACEHOLDER_EMAIL = "your_gmail_address@gmail.com";
const PLACEHOLDER_PASSWORD = "your_gmail_app_password";

function isConfigured() {
  return Boolean(
    process.env.EMAIL &&
    process.env.EMAIL_PASSWORD &&
    process.env.EMAIL !== PLACEHOLDER_EMAIL &&
    process.env.EMAIL_PASSWORD !== PLACEHOLDER_PASSWORD
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Checks the SMTP login without sending anything. Used at server startup
// so a bad Gmail address/App Password is reported immediately instead of
// only surfacing when a user tries to register.
async function verifyEmailConfig() {
  if (!isConfigured()) {
    return {
      ok: false,
      reason:
        "EMAIL / EMAIL_PASSWORD in authcore-backend/.env are still the placeholder values. OTP emails will not be sent until you fill in a real Gmail address and App Password."
    };
  }

  try {
    await transporter.verify();
    return { ok: true };
  } catch (error) {
    let reason = error.message;
    if (error.responseCode === 535 || /Invalid login/i.test(error.message)) {
      reason =
        "Gmail rejected the login. EMAIL_PASSWORD must be a 16-character Gmail App Password (Google Account → Security → 2-Step Verification → App passwords), not your normal Gmail password.";
    }
    return { ok: false, reason };
  }
}

module.exports = transporter;
module.exports.isConfigured = isConfigured;
module.exports.verifyEmailConfig = verifyEmailConfig;
