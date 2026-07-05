// Data-access layer for the `users` table. Models are the ONLY place raw SQL lives;
// services call these functions and never write SQL themselves.
const pool = require('../database/connection');

exports.findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
  return rows[0];
};

exports.create = async ({ name, email, password }) => {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, 'user']
  );
  return { id: result.insertId, name, email, role: 'user' };
};

exports.update = async (id, data) => {
  const [result] = await pool.query('UPDATE users SET ? WHERE id = ?', [data, id]);
  return result;
};

exports.updatePassword = async (id, hashedPassword) => {
  await pool.query(
    'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
    [hashedPassword, id]
  );
};

exports.setResetToken = async (id, token, expires) => {
  await pool.query('UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?', [token, expires, id]);
};

exports.findByValidResetToken = async (token) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > ?',
    [token, Date.now()]
  );
  return rows[0];
};
