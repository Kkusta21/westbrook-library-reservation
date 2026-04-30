/**
 * auditLogger.js
 *
 * Fire-and-forget utility for writing to the audit_log table.
 *
 * Usage (inside any controller, after a significant action):
 *
 *   logAudit({
 *     action     : 'CREATE',          // 'CREATE' | 'UPDATE' | 'DELETE' | 'CANCEL' | 'LOGIN' | 'LOGOUT' | 'DEACTIVATE'
 *     entityType : 'reservation',     // table / domain name (singular, lowercase)
 *     entityId   : newRow.id,         // integer PK of the affected row (optional)
 *     userId     : req.user?.id,      // actor; NULL for system/automated actions
 *     oldValues  : { ... },           // snapshot before change  (optional)
 *     newValues  : { ... },           // snapshot after change   (optional)
 *     ipAddress  : req.ip,            // client IP               (optional)
 *   });
 *
 * The call is intentionally NOT awaited so audit failures never block responses.
 */

'use strict';

const pool = require('../config/db');

/**
 * Insert one row into audit_log.
 *
 * @param {object} params
 * @param {string}  params.action       - Required. Action verb (CREATE, UPDATE, …).
 * @param {string}  params.entityType   - Required. Domain entity name.
 * @param {number}  [params.entityId]   - PK of the affected record.
 * @param {number}  [params.userId]     - ID of the acting user; null = system.
 * @param {object}  [params.oldValues]  - JSONB snapshot before the change.
 * @param {object}  [params.newValues]  - JSONB snapshot after the change.
 * @param {string}  [params.ipAddress]  - Client IP address string.
 * @returns {void}  Errors are swallowed; logging must never break a request.
 */
function logAudit({
  action,
  entityType,
  entityId  = null,
  userId    = null,
  oldValues = null,
  newValues = null,
  ipAddress = null,
}) {
  // Validate required fields – if absent, skip silently
  if (!action || !entityType) {
    console.warn('[auditLogger] Missing required fields: action=%s entityType=%s', action, entityType);
    return;
  }

  const sql = `
    INSERT INTO audit_log
      (user_id, action, entity_type, entity_id, old_values, new_values, ip_address)
    VALUES ($1, $2, $3, $4, $5, $6, $7::inet)
  `;

  const values = [
    userId    ?? null,
    action.toUpperCase(),
    entityType.toLowerCase(),
    entityId  ?? null,
    oldValues ? JSON.stringify(oldValues) : null,
    newValues ? JSON.stringify(newValues) : null,
    ipAddress ?? null,
  ];

  // Fire-and-forget: execute without awaiting; catch any error internally.
  pool.query(sql, values).catch((err) => {
    console.error('[auditLogger] Failed to write audit log entry:', {
      action,
      entityType,
      entityId,
      userId,
      error: err.message,
    });
  });
}

module.exports = { logAudit };
