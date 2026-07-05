// Creates one shared MySQL connection pool for the whole app (models import this).
// Using a pool (not single connections) avoids exhausting DB connections under load.
const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

const pool = mysql.createPool(dbConfig);

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('MySQL connected successfully');
    conn.release();
  } catch (err) {
    console.error('MySQL connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = pool;
module.exports.testConnection = testConnection;
