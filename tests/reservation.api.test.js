const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/backend/app");

const Reservation = require("../src/backend/models/Reservation");

jest.mock("../src/backend/models/Reservation");

describe("Reservation API", () => {
  let token;

  beforeAll(() => {
    // Generate valid JWT token
    token = jwt.sign(
      { id: 1, email: "admin@test.com", role: "Administrator" },
      "test_secret",
      { expiresIn: "1h" }
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/reservations → valid body returns 201 and confirmation reference", async () => {
    // Arrange
    const body = {
      resource_id: 1,
      reservation_date: "2099-01-01",
      start_time: "10:00",
      end_time: "11:00",
      patron_name: "John Doe",
    };

    Reservation.create.mockResolvedValue({
      id: 1,
      confirmation_reference: "CONF-001",
      ...body,
    });

    // Act
    const response = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("confirmation_reference");
  });

  test("POST /api/reservations → duplicate slot returns 409", async () => {
    // Arrange
    Reservation.create.mockRejectedValue({ statusCode: 409 });

    // Act
    const response = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    // Assert
    expect(response.status).toBe(409);
  });

  test("POST /api/reservations → missing required fields returns 400", async () => {
    // Act
    const response = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    // Assert
    expect(response.status).toBe(400);
  });

  test("GET /api/reservations → authenticated request returns 200 and array", async () => {
    // Arrange
    Reservation.findAll.mockResolvedValue([{ id: 1 }]);

    // Act
    const response = await request(app)
      .get("/api/reservations")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/reservations/:id → valid id returns 200 and reservation object", async () => {
    // Arrange
    Reservation.findById.mockResolvedValue({ id: 1 });

    // Act
    const response = await request(app)
      .get("/api/reservations/1")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
  });

  test("GET /api/reservations/:id → invalid id returns 404", async () => {
    // Arrange
    Reservation.findById.mockResolvedValue(null);

    // Act
    const response = await request(app)
      .get("/api/reservations/999")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(404);
  });

  test("PATCH /api/reservations/:id/cancel → active reservation returns 200", async () => {
    // Arrange
    Reservation.findById.mockResolvedValue({ id: 1, status: "Confirmed" });
    Reservation.update.mockResolvedValue({ id: 1, status: "Cancelled" });

    // Act
    const response = await request(app)
      .patch("/api/reservations/1/cancel")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
  });

  test("PATCH /api/reservations/:id/cancel → already cancelled returns 400", async () => {
    // Arrange
    Reservation.findById.mockResolvedValue({ id: 1, status: "Cancelled" });

    // Act
    const response = await request(app)
      .patch("/api/reservations/1/cancel")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(400);
  });

  test("GET /api/reservations → no token returns 401", async () => {
    // Act
    const response = await request(app)
      .get("/api/reservations");

    // Assert
    expect(response.status).toBe(401);
  });

  test("POST /api/reservations → no token returns 401", async () => {
    // Act
    const response = await request(app)
      .post("/api/reservations")
      .send({});

    // Assert
    expect(response.status).toBe(401);
  });
});
