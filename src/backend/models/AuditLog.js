const pool = require('../db/connection');

class AuditLog {
  static async create({ user_id, action, entity, entity_id }) {
    const { rows } = await pool.query(
      `INSERT INTO audit_log (user_id, action, entity, entity_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, action, entity, entity_id, timestamp`,
      [user_id, action, entity, entity_id]
    );
    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query(
      `SELECT * FROM audit_log ORDER BY timestamp DESC`
    );
    return rows;
  }
}

module.exports = AuditLog;
