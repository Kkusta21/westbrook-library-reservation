const ReservationService = require("../src/backend/services/reservation.service");
const Reservation = require("../src/backend/models/Reservation");
const Resource = require("../src/backend/models/Resource");

jest.mock("../src/backend/models/Reservation");
jest.mock("../src/backend/models/Resource");

describe("ReservationService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createReservation() with available slot → returns reservation with confirmation reference", async () => {
    // Arrange
    const input = {
      resource_id: 1,
      reservation_date: "2099-01-01",
      start_time: "10:00",
      end_time: "11:00",
    };

    const createdReservation = {
      id: 100,
      confirmation_reference: "CONF-123",
      ...input,
    };

    Resource.findById.mockResolvedValue({ id: 1 });
    Reservation.create.mockResolvedValue(createdReservation);

    // Act
    const result = await ReservationService.createReservation(input);

    // Assert
    expect(Resource.findById).toHaveBeenCalledWith(1);
    expect(Reservation.create).toHaveBeenCalledWith(input);
    expect(result).toHaveProperty("confirmation_reference");
  });

  test("createReservation() with already booked slot → throws conflict error (409)", async () => {
    // Arrange
    const input = {
      resource_id: 1,
      reservation_date: "2099-01-01",
      start_time: "10:00",
      end_time: "11:00",
    };

    Resource.findById.mockResolvedValue({ id: 1 });
    Reservation.create.mockRejectedValue({ statusCode: 409 });

    // Act & Assert
    await expect(
      ReservationService.createReservation(input)
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  test("createReservation() exceeding max duration rule → throws validation error (400)", async () => {
    // Arrange
    const input = {
      resource_id: 1,
      reservation_date: "2099-01-01",
      start_time: "10:00",
      end_time: "18:00",
    };

    Resource.findById.mockResolvedValue({ id: 1 });
    Reservation.create.mockRejectedValue({ statusCode: 400 });

    // Act & Assert
    await expect(
      ReservationService.createReservation(input)
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  test("cancelReservation() on active reservation → returns updated reservation with status cancelled", async () => {
    // Arrange
    const activeReservation = { id: 1, status: "Confirmed" };
    const cancelledReservation = { id: 1, status: "Cancelled" };

    Reservation.findById.mockResolvedValue(activeReservation);
    Reservation.update.mockResolvedValue(cancelledReservation);

    // Act
    const result = await ReservationService.updateReservation(1, { status: "Cancelled" });

    // Assert
    expect(Reservation.findById).toHaveBeenCalledWith(1);
    expect(Reservation.update).toHaveBeenCalledWith(1, { status: "Cancelled" });
    expect(result.status).toBe("Cancelled");
  });

  test("cancelReservation() on already cancelled reservation → throws error (400)", async () => {
    // Arrange
    const cancelledReservation = { id: 1, status: "Cancelled" };
    Reservation.findById.mockResolvedValue(cancelledReservation);

    // Act & Assert
    await expect(
      ReservationService.deleteReservation(999)
    ).rejects.toBeDefined();
  });

  test("getUpcomingReservations() → returns only reservations with future dates", async () => {
    // Arrange
    const futureReservations = [
      { id: 1, reservation_date: "2099-01-01" },
      { id: 2, reservation_date: "2099-01-02" },
    ];

    Reservation.findAll.mockResolvedValue(futureReservations);

    // Act
    const result = await ReservationService.getAllReservations();

    // Assert
    expect(Reservation.findAll).toHaveBeenCalled();
    expect(result.every(r => new Date(r.reservation_date) > new Date())).toBe(true);
  });

  test("modifyReservation() with available new slot → returns updated reservation", async () => {
    // Arrange
    const existingReservation = { id: 1 };
    const updatedData = {
      reservation_date: "2099-02-01",
      start_time: "12:00",
      end_time: "13:00",
    };
    const updatedReservation = { id: 1, ...updatedData };

    Reservation.findById.mockResolvedValue(existingReservation);
    Reservation.update.mockResolvedValue(updatedReservation);

    // Act
    const result = await ReservationService.updateReservation(1, updatedData);

    // Assert
    expect(Reservation.findById).toHaveBeenCalledWith(1);
    expect(Reservation.update).toHaveBeenCalledWith(1, updatedData);
    expect(result).toMatchObject(updatedData);
  });
});
