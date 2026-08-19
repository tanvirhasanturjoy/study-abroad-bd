const transporter = require("./emailService");

const sendOTP = async (email, otp) => {

  // If Gmail isn't configured yet (still the placeholder values), don't
  // silently fail the whole registration flow — log the OTP to the server
  // console instead so the app is still testable locally while Gmail is
  // being set up. This never happens in production (NODE_ENV=production),
  // where a missing config should fail loudly instead.
  if (!transporter.isConfigured() && process.env.NODE_ENV !== "production") {
    console.warn(
      `[AuthCore][DEV MODE] EMAIL_PASSWORD/EMAIL not configured yet, so no email was sent.\n` +
      `[AuthCore][DEV MODE] OTP for ${email} is: ${otp}\n` +
      `[AuthCore][DEV MODE] Set up Gmail in .env (see "npm run check-email") to send this for real.`
    );
    return true;
  }

  try {

    await transporter.sendMail({

      from: process.env.EMAIL,

      to: email,

      subject: "AuthCore OTP Verification",


      html: `

<h2>Welcome To AuthCore</h2>

<p>Your OTP is:</p>

<h1>${otp}</h1>

<p>This OTP will expire after 5 minutes.</p>


`

    });


    return true;


  }


  catch (error) {


    console.log(error);


    return false;


  }



};


module.exports = sendOTP;
