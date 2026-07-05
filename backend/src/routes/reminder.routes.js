const router = require('express').Router();
const reminderController = require('../controllers/reminder.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);
router.get('/', reminderController.getReminders);
router.post('/', reminderController.setReminder);
router.delete('/:id', reminderController.deleteReminder);

module.exports = router;
