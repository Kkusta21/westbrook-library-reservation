const ReservationService = require('../services/reservation.service');

class ReservationController {
  static async getAll(req, res, next) {
    try {
      const reservations = await ReservationService.getAllReservations();
      res.status(200).json({ success: true, data: reservations });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const reservation = await ReservationService.getReservationById(req.params.id);
      res.status(200).json({ success: true, data: reservation });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const reservation = await ReservationService.createReservation(req.body);
      res.status(201).json({ success: true, data: reservation });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const reservation = await ReservationService.updateReservation(req.params.id, req.body);
      res.status(200).json({ success: true, data: reservation });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await ReservationService.deleteReservation(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReservationController;
