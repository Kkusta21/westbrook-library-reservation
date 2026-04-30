const AvailabilityService = require('../services/availability.service');

class AvailabilityController {
  static async getAvailable(req, res, next) {
    try {
      const available = await AvailabilityService.getAvailableResources(req.query);
      res.status(200).json({ success: true, data: available });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AvailabilityController;
