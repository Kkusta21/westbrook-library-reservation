const pool = require('../db/connection');

class Location {
  static async findAll() {
    const { rows } = await pool.query(
      `SELECT id, name, address FROM locations`
    );
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT id, name, address FROM locations WHERE id = $1`,
      [id]
    );
    return rows[0];
  }

  static async create({ name, address }) {
    const { rows } = await pool.query(
      `INSERT INTO locations (name, address)
       VALUES ($1, $2)
       RETURNING id, name, address`,
      [name, address]
    );
    return rows[0];
  }

  static async update(id, { name, address }) {
    const { rows } = await pool.query(
      `UPDATE locations
       SET name = $1,
           address = $2
       WHERE id = $3
       RETURNING id, name, address`,
      [name, address, id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query(`DELETE FROM locations WHERE id = $1`, [id]);
    return true;
  }
}

module.exports = Location;
