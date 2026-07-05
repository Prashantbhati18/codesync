// Single entry point so server.js only needs one require + one call.
const scheduleContestSync = require('./contestSync.cron');
const scheduleReminderCheck = require('./reminder.cron');

exports.startCronJobs = () => {
  scheduleContestSync();
  scheduleReminderCheck();
  console.log('Cron jobs scheduled: contest sync (6h), reminder check (1m)');
};
