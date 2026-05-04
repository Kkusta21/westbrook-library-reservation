const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report.controller');
const { requireAuth, requireRole } = require('../middleware/auth');

router.get('/period', requireAuth, requireRole('Administrator'), ReportController.byPeriod);
router.get('/resource', requireAuth, requireRole('Administrator'), ReportController.byResource);
router.get('/location', requireAuth, requireRole('Administrator'), ReportController.byLocation);

module.exports = router;// Defines Express routes under /api/v1/reports and maps them to report.controller handlers
