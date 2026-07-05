// Central place for DB connection settings, read from environment variables.
// Keeping this separate from connection.js lets us swap pooling strategy later
// without touching config values.
module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
