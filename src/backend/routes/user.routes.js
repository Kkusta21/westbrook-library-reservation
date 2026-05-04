const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { requireAuth, requireRole } = require('../middleware/auth');

router.get('/', requireAuth, requireRole('Administrator'), UserController.getAll);
router.get('/:id', requireAuth, requireRole('Administrator'), UserController.getById);
router.post('/', requireAuth, requireRole('Administrator'), UserController.create);
router.put('/:id', requireAuth, requireRole('Administrator'), UserController.update);
router.patch('/:id/deactivate', requireAuth, requireRole('Administrator'), UserController.deactivate);

module.exports = router;
