-- CodeSync Database Schema (MySQL, 3NF-normalized)
-- Run this against a fresh database to create all tables.

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,          -- bcrypt hash, never plain text
  role ENUM('user', 'admin') DEFAULT 'user',
  reset_token VARCHAR(255) NULL,
  reset_token_expires BIGINT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS platforms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,        -- e.g. LeetCode, Codeforces
  base_url VARCHAR(255),
  logo_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS contests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform_id INT NOT NULL,
  external_id VARCHAR(100),                -- id from the platform's own API
  name VARCHAR(255) NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  duration_minutes INT,
  contest_type VARCHAR(50),
  registration_url VARCHAR(255),
  difficulty VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_platform_contest (platform_id, external_id)
);

CREATE TABLE IF NOT EXISTS bookmarks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  contest_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (contest_id) REFERENCES contests(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_user_contest_bookmark (user_id, contest_id)
);

CREATE TABLE IF NOT EXISTS reminder_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  contest_id INT NOT NULL,
  offset_minutes INT NOT NULL,             -- 1440, 720, 360, 60, or 15
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (contest_id) REFERENCES contests(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reminder_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  contest_id INT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (contest_id) REFERENCES contests(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS participation_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  contest_id INT NOT NULL,
  status ENUM('participated', 'missed') NOT NULL,
  rating_change INT NULL,
  rank INT NULL,
  problems_solved INT NULL,
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (contest_id) REFERENCES contests(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message VARCHAR(500) NOT NULL,
  type VARCHAR(50),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed platforms
INSERT INTO platforms (name, base_url) VALUES
  ('LeetCode', 'https://leetcode.com'),
  ('Codeforces', 'https://codeforces.com'),
  ('CodeChef', 'https://www.codechef.com'),
  ('AtCoder', 'https://atcoder.jp'),
  ('GeeksforGeeks', 'https://practice.geeksforgeeks.org'),
  ('HackerRank', 'https://www.hackerrank.com')
ON DUPLICATE KEY UPDATE name = VALUES(name);
