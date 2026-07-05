const asyncHandler = require('../utils/asyncHandler');
const reminderService = require('../services/reminder.service');
const { success } = require('../utils/apiResponse');

exports.setReminder = asyncHandler(async (req, res) => {
  const reminder = await reminderService.setReminder(req.user.id, req.body);
  return success(res, 201, 'Reminder set', reminder);
});

exports.getReminders = asyncHandler(async (req, res) => {
  const reminders = await reminderService.getUserReminders(req.user.id);
  return success(res, 200, 'Reminders fetched', reminders);
});

exports.deleteReminder = asyncHandler(async (req, res) => {
  await reminderService.deleteReminder(req.user.id, req.params.id);
  return success(res, 200, 'Reminder removed');
});
