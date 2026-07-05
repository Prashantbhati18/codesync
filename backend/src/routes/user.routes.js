const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

module.exports = router;
