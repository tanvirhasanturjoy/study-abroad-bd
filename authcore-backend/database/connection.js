const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Values that are still the placeholders shipped in .env — if any of these
// are still in place, the pool below will fail to connect (or connect to
// the wrong thing), so we warn loudly and specifically instead of leaving
// the developer to guess from a raw MySQL error.
const PLACEHOLDER_VALUES = new Set([
  "your_mysql_password",
  "change_this_to_a_long_random_string"
]);

function findConfigProblems() {
  const problems = [];

  if (!process.env.DB_HOST) problems.push("DB_HOST is not set.");
  if (!process.env.DB_USER) problems.push("DB_USER is not set.");
  if (!process.env.DB_NAME) problems.push("DB_NAME is not set.");
  if (!process.env.DB_PASSWORD) {
    problems.push("DB_PASSWORD is not set.");
  } else if (PLACEHOLDER_VALUES.has(process.env.DB_PASSWORD)) {
    problems.push(
      'DB_PASSWORD is still the placeholder "your_mysql_password" — open authcore-backend/.env and put your real MySQL password there (an empty string is fine if your local MySQL root user has no password).'
    );
  }

  return problems;
}

const configProblems = findConfigProblems();
if (configProblems.length) {
  console.warn("\n[AuthCore] .env is not fully configured yet:");
  configProblems.forEach((problem) => console.warn(`  - ${problem}`));
  console.warn("Edit authcore-backend/.env and restart the server.\n");
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "authcore",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Human-readable translation for the handful of MySQL errors people
// actually hit when wiring this up for the first time.
function explainConnectionError(error) {
  switch (error.code) {
    case "ECONNREFUSED":
      return "Could not reach MySQL at all. Is your MySQL/MariaDB server (or XAMPP/WAMP) actually running?";
    case "ER_ACCESS_DENIED_ERROR":
      return "MySQL rejected DB_USER / DB_PASSWORD in authcore-backend/.env. Double-check both against what actually logs you into MySQL.";
    case "ER_BAD_DB_ERROR":
      return `The database "${process.env.DB_NAME}" doesn't exist yet. Run "npm run setup-db" inside authcore-backend/ to create it and the tables.`;
    case "ENOTFOUND":
      return `Could not resolve DB_HOST "${process.env.DB_HOST}". If MySQL is on the same machine, this should be "localhost" or "127.0.0.1".`;
    default:
      return error.message;
  }
}

// Verifies the pool can actually reach MySQL. Called once at server
// startup (see server.js) so a bad connection is reported clearly instead
// of surfacing later as a mysterious 500 on the first login/register call.
function testConnection() {
  return new Promise((resolve) => {
    pool.getConnection((error, connection) => {
      if (error) {
        console.error("[AuthCore] Database connection FAILED.");
        console.error(`  Reason: ${explainConnectionError(error)}`);
        resolve({ ok: false, error });
        return;
      }
      console.log(`[AuthCore] Database connected successfully (database: "${process.env.DB_NAME}").`);
      connection.release();
      resolve({ ok: true });
    });
  });
}

pool.testConnection = testConnection;

module.exports = pool;
