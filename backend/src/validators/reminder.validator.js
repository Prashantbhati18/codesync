const { body } = require('express-validator');

exports.reminderValidator = [
  body('contestId').isInt().withMessage('contestId must be an integer'),
  body('offsetMinutes')
    .isIn([1440, 720, 360, 60, 15])
    .withMessage('offsetMinutes must be one of 1440, 720, 360, 60, 15'),
];
