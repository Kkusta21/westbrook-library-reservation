const express = require('express');
const router = express.Router();
const AvailabilityController = require('../controllers/availability.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, AvailabilityController.getAvailable);

module.exports = router;
