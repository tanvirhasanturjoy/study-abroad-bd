// Quick standalone check for the Brevo/OTP email setup — run this before
// wiring up the full app so email problems are obvious on their own.
//
// Usage:
//   node emailTest.js                 -> just verifies the API key (no email sent)
//   node emailTest.js you@example.com -> also sends a real test OTP email

require("dotenv").config();

const emailService = require("./services/emailService");
const sendOTPEmail = require("./services/sendOTP");

async function main() {
  console.log("[emailTest] Checking BREVO_API_KEY / EMAIL from .env...");
  const result = await emailService.verifyEmailConfig();

  if (!result.ok) {
    console.error(`[emailTest] FAILED: ${result.reason}`);
    process.exit(1);
  }

  console.log("[emailTest] Brevo API key OK.");

  const testAddress = process.argv[2];
  if (!testAddress) {
    console.log("[emailTest] No test address given, skipping send. Run `node emailTest.js you@example.com` to send a real test OTP.");
    return;
  }

  console.log(`[emailTest] Sending a test OTP to ${testAddress}...`);
  const sent = await sendOTPEmail(testAddress, "123456");
  console.log(sent ? "[emailTest] Sent successfully — check the inbox." : "[emailTest] Send failed, see the error above.");
}

main();
