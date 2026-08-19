-- AuthCore schema
-- Run this once. It creates the database itself (matching DB_NAME in your
-- .env, default "authcore") as well as the tables, so you don't need to
-- create the database by hand first — that step being skipped is the most
-- common reason the app can't connect ("Unknown database 'authcore'").
--
--   mysql -u root -p < database/schema.sql
--
-- (Prefer not to touch the command line? Run `npm run setup-db` instead —
-- it does the same thing using your .env settings.)

CREATE DATABASE IF NOT EXISTS authcore;
USE authcore;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_verified TINYINT(1) DEFAULT 0,
  profile_completed TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS otp (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  otp VARCHAR(10) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  profile_type VARCHAR(30),
  profile_picture LONGTEXT,
  id_number VARCHAR(50),
  department VARCHAR(100),
  institution VARCHAR(150),
  cgpa DECIMAL(3,2),
  semester VARCHAR(20),
  graduation_year VARCHAR(10),
  address VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
