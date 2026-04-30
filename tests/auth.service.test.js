const AuthService = require("../src/backend/services/auth.service");
const User = require("../src/backend/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../src/backend/models/User");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("AuthService.login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("login() with valid credentials → returns object with JWT token", async () => {
    // Arrange
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password_hash: "hashed_password",
      role: "Administrator",
      is_active: true,
    };

    User.findByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mocked_jwt_token");

    // Act
    const result = await AuthService.login("john@example.com", "password123");

    // Assert
    expect(User.findByEmail).toHaveBeenCalledWith("john@example.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashed_password");
    expect(jwt.sign).toHaveBeenCalled();
    expect(result).toHaveProperty("token", "mocked_jwt_token");
    expect(result.user.email).toBe("john@example.com");
  });

  test("login() with unknown username → throws error with status 401", async () => {
    // Arrange
    User.findByEmail.mockResolvedValue(null);

    // Act & Assert
    await expect(
      AuthService.login("unknown@example.com", "password123")
    ).rejects.toMatchObject({ statusCode: 401 });
  });

  test("login() with wrong password → throws error with status 401", async () => {
    // Arrange
    const mockUser = {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      password_hash: "hashed_password",
      role: "Staff",
      is_active: true,
    };

    User.findByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    // Act & Assert
    await expect(
      AuthService.login("jane@example.com", "wrongpassword")
    ).rejects.toMatchObject({ statusCode: 401 });
  });

  test("login() with deactivated account → throws error with status 403", async () => {
    // Arrange
    const mockUser = {
      id: 3,
      name: "Inactive User",
      email: "inactive@example.com",
      password_hash: "hashed_password",
      role: "Staff",
      is_active: false,
    };

    User.findByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    // Act & Assert
    await expect(
      AuthService.login("inactive@example.com", "password123")
    ).rejects.toMatchObject({ statusCode: 403 });
  });
});
