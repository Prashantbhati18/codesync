// Runs every 6 hours: pulls fresh contest lists from external platform APIs.
const cron = require('node-cron');
const contestService = require('../services/contest.service');

module.exports = function scheduleContestSync() {
  cron.schedule('0 */6 * * *', async () => {
    console.log('[cron] Syncing contests from external APIs...');
    try {
      await contestService.syncFromExternalAPIs();
    } catch (err) {
      console.error('[cron] Contest sync failed:', err.message);
    }
  });
};
