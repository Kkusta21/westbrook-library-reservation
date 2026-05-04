const pool = require('../db/connection');

class Reservation {
  static async findAll() {
    const { rows } = await pool.query(
      `SELECT r.id, r.patron_name, r.patron_email, r.patron_phone,
              r.reservation_date, r.start_time, r.end_time,
              r.status, r.notes, r.confirmation_reference,
              res.name AS resource_name, r.resource_id
       FROM reservations r
       LEFT JOIN resources res ON r.resource_id = res.id
       ORDER BY r.created_at DESC`
    );
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT r.id, r.patron_name, r.patron_email, r.patron_phone,
              r.reservation_date, r.start_time, r.end_time,
              r.status, r.notes, r.confirmation_reference,
              res.name AS resource_name, r.resource_id
       FROM reservations r
       LEFT JOIN resources res ON r.resource_id = res.id
       WHERE r.id = $1`,
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const { rows } = await pool.query(
      `INSERT INTO reservations 
       (resource_id, patron_name, patron_email, patron_phone, 
        reservation_date, start_time, end_time, notes, status, confirmation_reference)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        data.resource_id, data.patron_name, data.patron_email,
        data.patron_phone, data.reservation_date, data.start_time,
        data.end_time, data.notes, data.status || 'Confirmed',
        'WL-' + Date.now()
      ]
    );
    return rows[0];
  }

  static async update(id, data) {
    const { rows } = await pool.query(
      `UPDATE reservations
       SET patron_name = $1, patron_email = $2, patron_phone = $3,
           reservation_date = $4, start_time = $5, end_time = $6,
           notes = $7, status = $8
       WHERE id = $9
       RETURNING *`,
      [
        data.patron_name, data.patron_email, data.patron_phone,
        data.reservation_date, data.start_time, data.end_time,
        data.notes, data.status, id
      ]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query(`UPDATE reservations SET status = 'Cancelled' WHERE id = $1`, [id]);
    return true;
  }
}

module.exports = Reservation;