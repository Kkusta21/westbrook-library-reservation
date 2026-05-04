const express = require('express');
const router = express.Router();
const ResourceController = require('../controllers/resource.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, ResourceController.getAll);
router.get('/:id', requireAuth, ResourceController.getById);
router.post('/', requireAuth, ResourceController.create);
router.put('/:id', requireAuth, ResourceController.update);
router.delete('/:id', requireAuth, ResourceController.delete);

module.exports = router;// Defines Express routes under /api/v1/resources and maps them to resource.controller handlers
