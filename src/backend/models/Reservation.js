const pool = require('../db/connection');

class Reservation {
  static async findAll() {
    const { rows } = await pool.query(
      `SELECT r.id, r.resource_id, res.name AS resource_name,
              r.patron_info, r.start_time, r.end_time,
              r.status, r.created_by, r.created_at
       FROM reservations r
       JOIN resources res ON r.resource_id = res.id`
    );
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT r.id, r.resource_id, res.name AS resource_name,
              r.patron_info, r.start_time, r.end_time,
              r.status, r.created_by, r.created_at
       FROM reservations r
       JOIN resources res ON r.resource_id = res.id
       WHERE r.id = $1`,
      [id]
    );
    return rows[0];
  }

  static async create({ resource_id, patron_info, start_time, end_time, status, created_by }) {
    const { rows } = await pool.query(
      `INSERT INTO reservations (resource_id, patron_info, start_time, end_time, status, created_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, resource_id, patron_info, start_time, end_time, status, created_by, created_at`,
      [resource_id, patron_info, start_time, end_time, status, created_by]
    );
    return rows[0];
  }

  static async update(id, { resource_id, patron_info, start_time, end_time, status }) {
    const { rows } = await pool.query(
      `UPDATE reservations
       SET resource_id = $1,
           patron_info = $2,
           start_time = $3,
           end_time = $4,
           status = $5
       WHERE id = $6
       RETURNING id, resource_id, patron_info, start_time, end_time, status`,
      [resource_id, patron_info, start_time, end_time, status, id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query(`DELETE FROM reservations WHERE id = $1`, [id]);
    return true;
  }
}

module.exports = Reservation;
