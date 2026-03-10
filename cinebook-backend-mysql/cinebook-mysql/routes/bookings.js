const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.get('/',       protect, ctrl.getAll);
router.get('/:id',    protect, ctrl.getById);
router.post('/',      ctrl.create);          // public – anyone can book
router.delete('/:id', protect, ctrl.cancel);

module.exports = router;
