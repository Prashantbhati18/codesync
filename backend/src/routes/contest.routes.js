const router = require('express').Router();
const contestController = require('../controllers/contest.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.get('/', contestController.getAllContests);
router.get('/upcoming', contestController.getUpcomingContests);
router.get('/platform/:id', contestController.getContestsByPlatform);
router.get('/:id', contestController.getContestById);
router.post('/sync', protect, restrictTo('admin'), contestController.syncContests);

module.exports = router;
