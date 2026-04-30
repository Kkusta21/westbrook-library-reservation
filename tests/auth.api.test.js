const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = require("../src/backend/app");

const User = require("../src/backend/models/User");

jest.mock("../src/backend/models/User");
jest.mock("bcrypt");

describe("Auth API", () => {
  let validToken;
  let expiredToken;
  let staffToken;

  beforeAll(() => {
    validToken = jwt.sign(
      { id: 1, email: "admin@test.com", role: "Administrator" },
      "test_secret",
      { expiresIn: "1h" }
    );

    expiredToken = jwt.sign(
      { id: 1, email: "admin@test.com", role: "Administrator" },
      "test_secret",
      { expiresIn: -1 }
    );

    staffToken = jwt.sign(
      { id: 2, email: "staff@test.com", role: "Staff" },
      "test_secret",
      { expiresIn: "1h" }
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/auth/login → valid credentials returns 200 and token", async () => {
    // Arrange
    const user = {
      id: 1,
      name: "Admin",
      email: "admin@test.com",
      password_hash: "hashed",
      role: "Administrator",
      is_active: true,
    };

    User.findByEmail.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);

    // Act
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@test.com", password: "password" });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /api/auth/login → wrong password returns 401", async () => {
    // Arrange
    const user = {
      id: 1,
      email: "admin@test.com",
      password_hash: "hashed",
      role: "Administrator",
      is_active: true,
    };

    User.findByEmail.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(false);

    // Act
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@test.com", password: "wrong" });

    // Assert
    expect(response.status).toBe(401);
  });

  test("POST /api/auth/login → missing username returns 400", async () => {
    // Act
    const response = await request(app)
      .post("/api/auth/login")
      .send({ password: "password" });

    // Assert
    expect(response.status).toBe(400);
  });

  test("POST /api/auth/login → missing password returns 400", async () => {
    // Act
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@test.com" });

    // Assert
    expect(response.status).toBe(400);
  });

  test("GET /api/reservations → expired token returns 401", async () => {
    // Act
    const response = await request(app)
      .get("/api/reservations")
      .set("Authorization", `Bearer ${expiredToken}`);

    // Assert
    expect(response.status).toBe(401);
  });

  test("GET /api/users → valid token but staff role returns 403", async () => {
    // Act
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${staffToken}`);

    // Assert
    expect(response.status).toBe(403);
  });
});
