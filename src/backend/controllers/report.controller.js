const ReportService = require('../services/report.service');

class ReportController {
  static async byPeriod(req, res, next) {
    try {
      const data = await ReportService.getReservationsByPeriod(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async byResource(req, res, next) {
    try {
      const data = await ReportService.getUsageByResource();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async byLocation(req, res, next) {
    try {
      const data = await ReportService.getUsageByLocation();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;
