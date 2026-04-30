const Reservation = require('../models/Reservation');
const Resource = require('../models/Resource');

class ReservationService {
  static async getAllReservations() {
    return await Reservation.findAll();
  }

  static async getReservationById(id) {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      throw { statusCode: 404, message: 'Reservation not found' };
    }
    return reservation;
  }

  static async createReservation(data) {
    const resource = await Resource.findById(data.resource_id);
    if (!resource) {
      throw { statusCode: 400, message: 'Invalid resource' };
    }

    // Basic time validation
    if (new Date(data.start_time) >= new Date(data.end_time)) {
      throw { statusCode: 400, message: 'End time must be after start time' };
    }

    // TODO: Add conflict detection logic

    return await Reservation.create(data);
  }

  static async updateReservation(id, data) {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      throw { statusCode: 404, message: 'Reservation not found' };
    }

    return await Reservation.update(id, data);
  }

  static async deleteReservation(id) {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      throw { statusCode: 404, message: 'Reservation not found' };
    }

    return await Reservation.delete(id);
  }
}

module.exports = ReservationService;
