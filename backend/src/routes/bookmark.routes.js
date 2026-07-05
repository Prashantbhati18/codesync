const router = require('express').Router();
const bookmarkController = require('../controllers/bookmark.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);
router.get('/', bookmarkController.getBookmarks);
router.post('/', bookmarkController.addBookmark);
router.delete('/:id', bookmarkController.removeBookmark);

module.exports = router;
