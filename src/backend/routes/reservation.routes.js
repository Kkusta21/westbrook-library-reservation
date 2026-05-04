const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, ReservationController.getAll);
router.get('/:id', requireAuth, ReservationController.getById);
router.post('/', requireAuth, ReservationController.create);
router.put('/:id', requireAuth, ReservationController.update);
router.patch('/:id/cancel', requireAuth, ReservationController.delete);

module.exports = router;
