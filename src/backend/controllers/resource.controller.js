const ResourceService = require('../services/resource.service');

class ResourceController {
  static async getAll(req, res, next) {
    try {
      const resources = await ResourceService.getAllResources();
      res.status(200).json({ success: true, data: resources });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const resource = await ResourceService.getResourceById(req.params.id);
      res.status(200).json({ success: true, data: resource });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const resource = await ResourceService.createResource(req.body);
      res.status(201).json({ success: true, data: resource });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const resource = await ResourceService.updateResource(req.params.id, req.body);
      res.status(200).json({ success: true, data: resource });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await ResourceService.deleteResource(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ResourceController;
