const AuditLog = require('../models/AuditLog');

class AuditService {
  static async logAction({ user_id, action, entity, entity_id }) {
    return await AuditLog.create({
      user_id,
      action,
      entity,
      entity_id,
    });
  }

  static async getAllLogs() {
    return await AuditLog.findAll();
  }
}

module.exports = AuditService;
