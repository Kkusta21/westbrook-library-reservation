const pool = require('../db/connection');

class Resource {
  static async findAll() {
    const { rows } = await pool.query(
      `SELECT r.id, r.name, r.description, 
              rt.name AS type, 
              l.name AS location,
              r.location_id,
              r.resource_type_id,
              r.capacity, 
              r.is_active,
              CASE WHEN r.is_active THEN 'active' ELSE 'inactive' END AS status
       FROM resources r
       LEFT JOIN locations l ON r.location_id = l.id
       LEFT JOIN resource_types rt ON r.resource_type_id = rt.id`
    );
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT r.id, r.name, r.description,
              rt.name AS type,
              l.name AS location,
              r.location_id,
              r.resource_type_id,
              r.capacity,
              r.is_active,
              CASE WHEN r.is_active THEN 'active' ELSE 'inactive' END AS status
       FROM resources r
       LEFT JOIN locations l ON r.location_id = l.id
       LEFT JOIN resource_types rt ON r.resource_type_id = rt.id
       WHERE r.id = $1`,
      [id]
    );
    return rows[0];
  }

  static async create({ name, description, resource_type_id, location_id, capacity, is_active }) {
    const { rows } = await pool.query(
      `INSERT INTO resources (name, description, resource_type_id, location_id, capacity, is_active)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, resource_type_id, location_id, capacity, is_active ?? true]
    );
    return rows[0];
  }

  static async update(id, { name, description, resource_type_id, location_id, capacity, is_active }) {
    const { rows } = await pool.query(
      `UPDATE resources
       SET name = $1, description = $2, resource_type_id = $3,
           location_id = $4, capacity = $5, is_active = $6
       WHERE id = $7
       RETURNING *`,
      [name, description, resource_type_id, location_id, capacity, is_active, id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query(`UPDATE resources SET is_active = false WHERE id = $1`, [id]);
    return true;
  }
}

module.exports = Resource;