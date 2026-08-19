// One-command database setup: creates the database (if it doesn't exist)
// and runs schema.sql against it, using the connection details from .env.
//
// Usage:  npm run setup-db
//
// This exists so you don't need the `mysql` CLI on your PATH — just a
// running MySQL/MariaDB server and correct DB_HOST/DB_USER/DB_PASSWORD in
// authcore-backend/.env.

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "authcore";

async function main() {
  if (DB_PASSWORD === "your_mysql_password") {
    console.error(
      '\n[setup-db] DB_PASSWORD in authcore-backend/.env is still the placeholder "your_mysql_password".\n' +
        "Edit .env with your real MySQL password (or an empty string if root has none) and try again.\n"
    );
    process.exit(1);
  }

  const schemaPath = path.join(__dirname, "..", "database", "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");

  console.log(`[setup-db] Connecting to MySQL at ${DB_HOST} as ${DB_USER}...`);

  let connection;
  try {
    // No `database` here on purpose — the DB itself may not exist yet,
    // and schema.sql creates it via CREATE DATABASE IF NOT EXISTS.
    connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true
    });
  } catch (error) {
    console.error(`[setup-db] Could not connect to MySQL: ${error.message}`);
    console.error("Make sure your MySQL/MariaDB server is running and DB_HOST/DB_USER/DB_PASSWORD in .env are correct.");
    process.exit(1);
  }

  try {
    console.log(`[setup-db] Running schema.sql (creates "${DB_NAME}" and its tables if missing)...`);
    await connection.query(schemaSql);
    console.log(`[setup-db] Done. Database "${DB_NAME}" is ready — you can now run "npm run dev".`);
  } catch (error) {
    console.error(`[setup-db] Failed while running schema.sql: ${error.message}`);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

main();
