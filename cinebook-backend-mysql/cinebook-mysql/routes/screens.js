const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/screenController');
const { protect } = require('../middleware/auth');

router.get('/',     ctrl.getAll);
router.get('/:id',  ctrl.getById);
router.post('/',    protect, ctrl.create);
router.put('/:id',  protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
