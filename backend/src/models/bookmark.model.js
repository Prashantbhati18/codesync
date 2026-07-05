const pool = require('../database/connection');

exports.create = async ({ userId, contestId }) => {
  const [result] = await pool.query('INSERT INTO bookmarks (user_id, contest_id) VALUES (?, ?)', [userId, contestId]);
  return { id: result.insertId, userId, contestId };
};

exports.delete = async (userId, bookmarkId) => {
  await pool.query('DELETE FROM bookmarks WHERE id = ? AND user_id = ?', [bookmarkId, userId]);
};

exports.findByUser = async (userId) => {
  const [rows] = await pool.query(
    `SELECT b.id, c.* FROM bookmarks b JOIN contests c ON c.id = b.contest_id WHERE b.user_id = ?`,
    [userId]
  );
  return rows;
};
