const pool = require('../database/connection');

exports.create = async ({ userId, contestId, status, rating, rank, solved, notes }) => {
  const [result] = await pool.query(
    `INSERT INTO participation_history
     (user_id, contest_id, status, rating_change, rank, problems_solved, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, contestId, status, rating, rank, solved, notes]
  );
  return { id: result.insertId };
};

exports.update = async (id, data) => {
  const [result] = await pool.query('UPDATE participation_history SET ? WHERE id = ?', [data, id]);
  return result;
};

exports.findByUser = async (userId) => {
  const [rows] = await pool.query(
    `SELECT ph.*, c.name AS contest_name, c.platform_id
     FROM participation_history ph JOIN contests c ON c.id = ph.contest_id
     WHERE ph.user_id = ?`,
    [userId]
  );
  return rows;
};
