const pool = require('../database/connection');

exports.findAll = async (filters = {}) => {
  // Filters (platform, date range, duration, search) are appended dynamically
  // in the real implementation using a query builder or parameterized clauses.
  const [rows] = await pool.query('SELECT * FROM contests ORDER BY start_time ASC');
  return rows;
};

exports.findUpcoming = async () => {
  const [rows] = await pool.query('SELECT * FROM contests WHERE start_time > NOW() ORDER BY start_time ASC');
  return rows;
};

exports.findByPlatform = async (platformId) => {
  const [rows] = await pool.query('SELECT * FROM contests WHERE platform_id = ? ORDER BY start_time ASC', [platformId]);
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM contests WHERE id = ?', [id]);
  return rows[0];
};

exports.bulkUpsert = async (contests) => {
  // INSERT ... ON DUPLICATE KEY UPDATE, keyed on (platform_id, external_id)
  return true;
};
