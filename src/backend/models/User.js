const pool = require('../db/connection');

class User {
  static async findAll() {
    const { rows } = await pool.query(
      `SELECT u.id, u.name, u.email, u.role_id, r.name AS role, u.is_active, u.created_at
       FROM users u
       JOIN roles r ON u.role_id = r.id`
    );
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT u.id, u.name, u.email, u.role_id, r.name AS role, u.is_active, u.created_at
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.id = $1`,
      [id]
    );
    return rows[0];
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return rows[0];
  }

  static async create({ name, email, password_hash, role_id }) {
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash, role_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role_id, is_active, created_at`,
      [name, email, password_hash, role_id]
    );
    return rows[0];
  }

  static async update(id, { name, email, role_id, is_active }) {
    const { rows } = await pool.query(
      `UPDATE users
       SET name = $1,
           email = $2,
           role_id = $3,
           is_active = $4
       WHERE id = $5
       RETURNING id, name, email, role_id, is_active`,
      [name, email, role_id, is_active, id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return true;
  }
}

module.exports = User;
