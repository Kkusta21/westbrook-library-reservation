const pool = require('../db/connection');

class Resource {
  static async findAll() {
    const { rows } = await pool.query(
      `SELECT r.id, r.name, r.type, r.location_id, l.name AS location, r.status, r.availability_schedule
       FROM resources r
       JOIN locations l ON r.location_id = l.id`
    );
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT r.id, r.name, r.type, r.location_id, l.name AS location, r.status, r.availability_schedule
       FROM resources r
       JOIN locations l ON r.location_id = l.id
       WHERE r.id = $1`,
      [id]
    );
    return rows[0];
  }

  static async create({ name, type, location_id, status, availability_schedule }) {
    const { rows } = await pool.query(
      `INSERT INTO resources (name, type, location_id, status, availability_schedule)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, type, location_id, status, availability_schedule`,
      [name, type, location_id, status, availability_schedule]
    );
    return rows[0];
  }

  static async update(id, { name, type, location_id, status, availability_schedule }) {
    const { rows } = await pool.query(
      `UPDATE resources
       SET name = $1,
           type = $2,
           location_id = $3,
           status = $4,
           availability_schedule = $5
       WHERE id = $6
       RETURNING id, name, type, location_id, status, availability_schedule`,
      [name, type, location_id, status, availability_schedule, id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query(`DELETE FROM resources WHERE id = $1`, [id]);
    return true;
  }
}

module.exports = Resource;
