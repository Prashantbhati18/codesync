// // Entry point: loads env vars, connects DB, starts the HTTP server.
// // Kept separate from app.js so app.js stays testable (no side effects on import).
require('dotenv').config();
const app = require('./src/app');
const { testConnection } = require('./src/database/connection');
const { startCronJobs } = require('./src/cron');

const PORT = process.env.PORT || 5000;

(async () => {
  await testConnection();
  startCronJobs();

  app.listen(PORT, () => {
    console.log(`CodeSync API running on port ${PORT}`);
  });
})();
