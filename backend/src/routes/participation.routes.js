const router = require('express').Router();
const participationController = require('../controllers/participation.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);
router.get('/', participationController.getParticipationHistory);
router.post('/', participationController.markParticipation);
router.put('/:id', participationController.updateParticipation);

module.exports = router;
