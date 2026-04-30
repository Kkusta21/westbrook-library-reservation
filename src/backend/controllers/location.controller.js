const Location = require('../models/Location');

class LocationController {
  static async getAll(req, res, next) {
    try {
      const locations = await Location.findAll();
      res.status(200).json({ success: true, data: locations });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const location = await Location.findById(req.params.id);
      if (!location) {
        return res.status(404).json({ success: false, message: 'Location not found' });
      }
      res.status(200).json({ success: true, data: location });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LocationController;
