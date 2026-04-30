const Reservation = require('../models/Reservation');
const Resource = require('../models/Resource');
const db = require('../db/connection');

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
    // Validate resource exists
    const resourceResult = await db.query(
      'SELECT * FROM resources WHERE id = $1',
      [data.resource_id]
    );
    if (!resourceResult || !resourceResult.rows || !resourceResult.rows[0]) {
      throw { statusCode: 400, message: 'Invalid resource' };
    }

    // Basic time validation
    if (new Date(data.start_time) >= new Date(data.end_time)) {
      throw { statusCode: 400, message: 'End time must be after start time' };
    }

    // Conflict detection
    const conflictResult = await db.query(
      `SELECT * FROM reservations
       WHERE resource_id = $1
       AND status != 'cancelled'
       AND start_time < $3
       AND end_time > $2`,
      [data.resource_id, data.start_time, data.end_time]
    );
    if (conflictResult.rows && conflictResult.rows.length > 0) {
      throw { statusCode: 409, message: 'Time slot already booked' };
    }

    // Insert reservation
    const result = await db.query(
      `INSERT INTO reservations
       (resource_id, patron_name, start_time, end_time, status, confirmation_reference)
       VALUES ($1, $2, $3, $4, 'active', $5)
       RETURNING *`,
      [
        data.resource_id,
        data.patron_name,
        data.start_time,
        data.end_time,
        'WL-' + Date.now()
      ]
    );
    return result.rows[0];
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

  static async cancelReservation(id) {
    const existing = await db.query(
      'SELECT * FROM reservations WHERE id = $1',
      [id]
    );

    if (!existing || !existing.rows || !existing.rows[0]) {
      throw { statusCode: 404, message: 'Not found' };
    }

    if (existing.rows[0].status === 'cancelled') {
      throw { statusCode: 400, message: 'Already cancelled' };
    }

    const result = await db.query(
      'UPDATE reservations SET status = $1 WHERE id = $2 RETURNING *',
      ['cancelled', id]
    );

    return result.rows[0];
  }
}

module.exports = ReservationService;
