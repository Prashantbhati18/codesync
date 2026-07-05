const { query } = require('express-validator');

exports.contestFilterValidator = [
  query('platform').optional().isString(),
  query('from').optional().isISO8601(),
  query('to').optional().isISO8601(),
  query('search').optional().isString(),
];
