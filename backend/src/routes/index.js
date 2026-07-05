// Aggregates all feature routers under a single /api prefix (mounted in app.js).
// Adding a new module means: create its router, require it here, done.
const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/contests', require('./contest.routes'));
router.use('/bookmarks', require('./bookmark.routes'));
router.use('/reminders', require('./reminder.routes'));
router.use('/participation', require('./participation.routes'));
router.use('/dashboard', require('./dashboard.routes'));
router.use('/users', require('./user.routes'));
router.use('/admin', require('./admin.routes'));

module.exports = router;
