const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.use(protect, restrictTo('admin'));
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);
router.get('/platforms', adminController.manageplatforms);
router.get('/logs', adminController.getLogs);

module.exports = router;
