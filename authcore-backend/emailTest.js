// Quick standalone check for the Gmail/OTP email setup — run this before
// wiring up the full app so email problems are obvious on their own.
//
// Usage:
//   node emailTest.js                 -> just verifies login (no email sent)
//   node emailTest.js you@example.com -> also sends a real test OTP email

require("dotenv").config();

const transporter = require("./services/emailService");
const sendOTPEmail = require("./services/sendOTP");

async function main() {
  console.log("[emailTest] Checking EMAIL / EMAIL_PASSWORD from .env...");
  const result = await transporter.verifyEmailConfig();

  if (!result.ok) {
    console.error(`[emailTest] FAILED: ${result.reason}`);
    process.exit(1);
  }

  console.log("[emailTest] Gmail login OK.");

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
