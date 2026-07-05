const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../validators/auth.validator');
const validate = require('../middleware/validate.middleware');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post('/logout', protect, authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
