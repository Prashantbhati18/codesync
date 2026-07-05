const pool = require('../database/connection');

exports.create = async ({ userId, contestId, offsetMinutes }) => {
  const [result] = await pool.query(
    'INSERT INTO reminder_settings (user_id, contest_id, offset_minutes) VALUES (?, ?, ?)',
    [userId, contestId, offsetMinutes]
  );
  return { id: result.insertId, userId, contestId, offsetMinutes };
};

exports.findByUser = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM reminder_settings WHERE user_id = ?', [userId]);
  return rows;
};

exports.delete = async (userId, id) => {
  await pool.query('DELETE FROM reminder_settings WHERE id = ? AND user_id = ?', [id, userId]);
};

// Used by the cron job: find reminders whose (contest.start_time - offset) has passed
// but that haven't been sent yet (no matching reminder_history row).
exports.findDue = async () => {
  const [rows] = await pool.query(`
    SELECT rs.id, rs.user_id AS userId, rs.contest_id AS contestId, u.email AS userEmail,
           c.name AS contestName, c.start_time
    FROM reminder_settings rs
    JOIN users u ON u.id = rs.user_id
    JOIN contests c ON c.id = rs.contest_id
    LEFT JOIN reminder_history rh ON rh.user_id = rs.user_id AND rh.contest_id = rs.contest_id
    WHERE rh.id IS NULL
      AND TIMESTAMPDIFF(MINUTE, NOW(), c.start_time) <= rs.offset_minutes
      AND c.start_time > NOW()
  `);
  return rows;
};
