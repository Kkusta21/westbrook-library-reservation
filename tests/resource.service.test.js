const ResourceService = require("../src/backend/services/resource.service");
const Resource = require("../src/backend/models/Resource");
const Location = require("../src/backend/models/Location");

jest.mock("../src/backend/models/Resource");
jest.mock("../src/backend/models/Location");

describe("ResourceService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllResources() with location filter → returns only resources at that location", async () => {
    // Arrange
    const locationId = 1;
    const resources = [
      { id: 1, location_id: 1 },
      { id: 2, location_id: 1 },
    ];

    Resource.findAll.mockResolvedValue(resources);

    // Act
    const result = await ResourceService.getAllResources({ location_id: locationId });

    // Assert
    expect(Resource.findAll).toHaveBeenCalled();
    expect(result.every(r => r.location_id === locationId)).toBe(true);
  });

  test("getAllResources() with type filter → returns only resources of that type", async () => {
    // Arrange
    const typeId = 2;
    const resources = [
      { id: 3, resource_type_id: 2 },
      { id: 4, resource_type_id: 2 },
    ];

    Resource.findAll.mockResolvedValue(resources);

    // Act
    const result = await ResourceService.getAllResources({ resource_type_id: typeId });

    // Assert
    expect(Resource.findAll).toHaveBeenCalled();
    expect(result.every(r => r.resource_type_id === typeId)).toBe(true);
  });

  test("getResourceById() with valid id → returns the resource", async () => {
    // Arrange
    const mockResource = { id: 10, name: "Study Room A" };
    Resource.findById.mockResolvedValue(mockResource);

    // Act
    const result = await ResourceService.getResourceById(10);

    // Assert
    expect(Resource.findById).toHaveBeenCalledWith(10);
    expect(result).toEqual(mockResource);
  });

  test("getResourceById() with invalid id → throws not found error (404)", async () => {
    // Arrange
    Resource.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(
      ResourceService.getResourceById(999)
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  test("createResource() with valid data → returns created resource", async () => {
    // Arrange
    const input = {
      name: "Projector",
      location_id: 1,
      resource_type_id: 2,
    };

    const createdResource = { id: 20, ...input };

    Location.findById.mockResolvedValue({ id: 1 });
    Resource.create.mockResolvedValue(createdResource);

    // Act
    const result = await ResourceService.createResource(input);

    // Assert
    expect(Location.findById).toHaveBeenCalledWith(1);
    expect(Resource.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(createdResource);
  });

  test("deactivateResource() → returns resource with status inactive", async () => {
    // Arrange
    const activeResource = { id: 5, is_active: true };
    const inactiveResource = { id: 5, is_active: false };

    Resource.findById.mockResolvedValue(activeResource);
    Resource.update.mockResolvedValue(inactiveResource);

    // Act
    const result = await ResourceService.updateResource(5, { is_active: false });

    // Assert
    expect(Resource.findById).toHaveBeenCalledWith(5);
    expect(Resource.update).toHaveBeenCalledWith(5, { is_active: false });
    expect(result.is_active).toBe(false);
  });

  test("deactivateResource() on resource with active reservations → throws error (409)", async () => {
    // Arrange
    const activeResource = { id: 6, is_active: true };
    Resource.findById.mockResolvedValue(activeResource);
    Resource.update.mockRejectedValue({ statusCode: 409 });

    // Act & Assert
    await expect(
      ResourceService.updateResource(6, { is_active: false })
    ).rejects.toMatchObject({ statusCode: 409 });
  });
});
