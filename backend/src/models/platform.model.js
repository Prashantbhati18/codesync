const pool = require('../database/connection');

exports.findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM platforms');
  return rows;
};

exports.findByName = async (name) => {
  const [rows] = await pool.query('SELECT * FROM platforms WHERE name = ?', [name]);
  return rows[0];
};
