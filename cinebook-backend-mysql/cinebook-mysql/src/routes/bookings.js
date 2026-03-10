// ─── BOOKING ROUTES (no auth required) ───────────────────────────────────────
const router = require('express').Router();
const ctrl   = require('../controllers/bookingController');

router.get('/',       ctrl.getAll);
router.get('/:id',    ctrl.getById);
router.post('/',      ctrl.create);
router.delete('/:id', ctrl.cancel);

module.exports = router;