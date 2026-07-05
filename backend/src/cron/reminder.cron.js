// Runs every minute: checks for due reminders and emails users.
// A 1-minute tick keeps the "15 minutes before" option accurate.
const cron = require('node-cron');
const reminderService = require('../services/reminder.service');

module.exports = function scheduleReminderCheck() {
  cron.schedule('* * * * *', async () => {
    try {
      const sentCount = await reminderService.processDueReminders();
      if (sentCount > 0) console.log(`[cron] Sent ${sentCount} reminder email(s)`);
    } catch (err) {
      console.error('[cron] Reminder check failed:', err.message);
    }
  });
};
