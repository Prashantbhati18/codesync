const reminderSettingsModel = require('../models/reminderSettings.model');
const reminderHistoryModel = require('../models/reminderHistory.model');
const emailService = require('./email.service');

exports.setReminder = async (userId, { contestId, offsetMinutes }) =>
  reminderSettingsModel.create({ userId, contestId, offsetMinutes });

exports.getUserReminders = async (userId) => reminderSettingsModel.findByUser(userId);

exports.deleteReminder = async (userId, reminderId) =>
  reminderSettingsModel.delete(userId, reminderId);

// Called by cron/reminder.cron.js on each tick.
exports.processDueReminders = async () => {
  const dueReminders = await reminderSettingsModel.findDue();

  for (const reminder of dueReminders) {
    await emailService.sendContestReminderEmail(reminder.userEmail, reminder.contest);
    await reminderHistoryModel.create({
      userId: reminder.userId,
      contestId: reminder.contestId,
      sentAt: new Date(),
    });
  }

  return dueReminders.length;
};
