const bcrypt = require('bcrypt');
const User = require('../models/User');
const Role = require('../models/Role');

class UserService {
  static async getAllUsers() {
    return await User.findAll();
  }

  static async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }
    return user;
  }

  static async createUser({ name, email, password, role_name }) {
    const existing = await User.findByEmail(email);
    if (existing) {
      throw { statusCode: 400, message: 'Email already in use' };
    }

    const role = await Role.findByName(role_name);
    if (!role) {
      throw { statusCode: 400, message: 'Invalid role' };
    }

    const password_hash = await bcrypt.hash(password, 10);

    return await User.create({
      name,
      email,
      password_hash,
      role_id: role.id,
    });
  }

  static async updateUser(id, data) {
    const user = await User.findById(id);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    return await User.update(id, data);
  }

  static async deactivateUser(id) {
    const user = await User.findById(id);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    return await User.update(id, {
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      is_active: false,
    });
  }
}

module.exports = UserService;
