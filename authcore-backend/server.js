const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const pool = require("./database/connection");
const transporter = require("./services/emailService");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.send("AuthCore Backend Running Successfully.");
});

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server Running On Port ${PORT}`);

  // Startup diagnostics: check DB and email config once, up front, so
  // problems are obvious in the terminal instead of surfacing later as a
  // confusing 500 the first time someone tries to register or log in.
  const dbResult = await pool.testConnection();

  const emailResult = await transporter.verifyEmailConfig();
  if (emailResult.ok) {
    console.log("[AuthCore] Email (OTP) config OK — Gmail login verified.");
  } else {
    console.warn(`[AuthCore] Email (OTP) not working yet: ${emailResult.reason}`);
    console.warn('[AuthCore] Run "npm run check-email" for a focused test once you\'ve updated .env.\n');
  }

  if (!dbResult.ok) {
    console.warn('[AuthCore] Fix the database connection above (see "npm run setup-db") — auth routes will fail until it\'s reachable.\n');
  }
});
