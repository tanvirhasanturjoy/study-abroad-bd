const emailService = require("./emailService");

const sendOTP = async (email, otp) => {

  // If Brevo isn't configured yet (still the placeholder values), don't
  // silently fail the whole registration flow — log the OTP to the server
  // console instead so the app is still testable locally while Brevo is
  // being set up. This never happens in production (NODE_ENV=production),
  // where a missing config should fail loudly instead.
  if (!emailService.isConfigured() && process.env.NODE_ENV !== "production") {
    console.warn(
      `[AuthCore][DEV MODE] BREVO_API_KEY/EMAIL not configured yet, so no email was sent.\n` +
      `[AuthCore][DEV MODE] OTP for ${email} is: ${otp}\n` +
      `[AuthCore][DEV MODE] Set up Brevo in .env (see "npm run check-email") to send this for real.`
    );
    return true;
  }

  const result = await emailService.sendMail({
    to: email,
    subject: "AuthCore OTP Verification",
    html: `
<h2>Welcome To AuthCore</h2>
<p>Your OTP is:</p>
<h1>${otp}</h1>
<p>This OTP will expire after 5 minutes.</p>
`
  });

  if (!result.ok) {
    console.log(result.reason);
    return false;
  }

  return true;
};

module.exports = sendOTP;
