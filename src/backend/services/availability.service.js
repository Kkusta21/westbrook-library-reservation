const Resource = require('../models/Resource');
const Reservation = require('../models/Reservation');

class AvailabilityService {
  static async getAvailableResources({ location_id, start_time, end_time }) {
    if (new Date(start_time) >= new Date(end_time)) {
      throw { statusCode: 400, message: 'Invalid time range' };
    }

    const resources = await Resource.findAll();

    const reservations = await Reservation.findAll();

    const overlappingReservations = reservations.filter((res) => {
      return (
        new Date(res.start_time) < new Date(end_time) &&
        new Date(res.end_time) > new Date(start_time)
      );
    });

    const reservedResourceIds = new Set(
      overlappingReservations.map((r) => r.resource_id)
    );

    return resources.filter((r) => {
      const matchesLocation = location_id
        ? r.location_id === Number(location_id)
        : true;
      return matchesLocation && !reservedResourceIds.has(r.id);
    });
  }
}

module.exports = AvailabilityService;
