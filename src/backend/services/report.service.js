const Reservation = require('../models/Reservation');
const Resource = require('../models/Resource');
const Location = require('../models/Location');

class ReportService {
  static async getReservationsByPeriod({ start_date, end_date }) {
    const reservations = await Reservation.findAll();

    return reservations.filter((r) => {
      const created = new Date(r.created_at);
      return (
        (!start_date || created >= new Date(start_date)) &&
        (!end_date || created <= new Date(end_date))
      );
    });
  }

  static async getUsageByResource() {
    const reservations = await Reservation.findAll();
    const resources = await Resource.findAll();

    return resources.map((resource) => {
      const count = reservations.filter(
        (r) => r.resource_id === resource.id
      ).length;

      return {
        resource_id: resource.id,
        resource_name: resource.name,
        total_reservations: count,
      };
    });
  }

  static async getUsageByLocation() {
    const reservations = await Reservation.findAll();
    const resources = await Resource.findAll();
    const locations = await Location.findAll();

    return locations.map((location) => {
      const locationResources = resources.filter(
        (r) => r.location_id === location.id
      );

      const count = reservations.filter((res) =>
        locationResources.some((r) => r.id === res.resource_id)
      ).length;

      return {
        location_id: location.id,
        location_name: location.name,
        total_reservations: count,
      };
    });
  }
}

module.exports = ReportService;
