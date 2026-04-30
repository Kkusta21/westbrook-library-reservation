const Resource = require('../models/Resource');
const Location = require('../models/Location');

class ResourceService {
  static async getAllResources() {
    return await Resource.findAll();
  }

  static async getResourceById(id) {
    const resource = await Resource.findById(id);
    if (!resource) {
      throw { statusCode: 404, message: 'Resource not found' };
    }
    return resource;
  }

  static async createResource(data) {
    const location = await Location.findById(data.location_id);
    if (!location) {
      throw { statusCode: 400, message: 'Invalid location' };
    }

    return await Resource.create(data);
  }

  static async updateResource(id, data) {
    const resource = await Resource.findById(id);
    if (!resource) {
      throw { statusCode: 404, message: 'Resource not found' };
    }

    return await Resource.update(id, data);
  }

  static async deleteResource(id) {
    const resource = await Resource.findById(id);
    if (!resource) {
      throw { statusCode: 404, message: 'Resource not found' };
    }

    return await Resource.delete(id);
  }
}

module.exports = ResourceService;
