const pool = require('../database/connection');

exports.create = async ({ userId, contestId, sentAt }) => {
  const [result] = await pool.query(
    'INSERT INTO reminder_history (user_id, contest_id, sent_at) VALUES (?, ?, ?)',
    [userId, contestId, sentAt]
  );
  return { id: result.insertId };
};
