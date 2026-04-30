const pool = require('../db/connection');

class Role {
  static async findAll() {
    const { rows } = await pool.query(`SELECT id, name FROM roles`);
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT id, name FROM roles WHERE id = $1`,
      [id]
    );
    return rows[0];
  }

  static async findByName(name) {
    const { rows } = await pool.query(
      `SELECT id, name FROM roles WHERE name = $1`,
      [name]
    );
    return rows[0];
  }
}

module.exports = Role;
