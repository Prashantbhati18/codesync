const pool = require('../database/connection');

exports.create = async ({ userId, message, type }) => {
  const [result] = await pool.query(
    'INSERT INTO notifications (user_id, message, type, is_read) VALUES (?, ?, ?, false)',
    [userId, message, type]
  );
  return { id: result.insertId };
};

exports.findByUser = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC', [userId]);
  return rows;
};

exports.markAsRead = async (id) => {
  await pool.query('UPDATE notifications SET is_read = true WHERE id = ?', [id]);
};
