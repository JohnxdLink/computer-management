//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const computerSpecsService = require("../../../src/services/computer_specs-service.js");

const {
  CREATE_COMPUTER_SPEC,
  FIND_ALL_COMPUTER_SPECS,
  FIND_COMPUTER_SPEC_BY_ID,
  FIND_COMPUTER_SPEC_BY_COMPUTER_ID,
  UPDATE_COMPUTER_SPEC,
  DELETE_COMPUTER_SPEC,
} = require("../../../src/database/queries/computer_specs-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createComputerSpec", () => {
  it("should create a computer specification successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await computerSpecsService.createComputerSpec(
      1,
      "Intel Core i5",
      "8GB",
      "512GB SSD",
      "Windows 11",
      "Intel UHD Graphics",
      "ASUS Prime",
    );

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_COMPUTER_SPEC, [
      1,
      "Intel Core i5",
      "8GB",
      "512GB SSD",
      "Windows 11",
      "Intel UHD Graphics",
      "ASUS Prime",
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(
      computerSpecsService.createComputerSpec(
        null,
        "Intel Core i5",
        "8GB",
        "512GB SSD",
        "Windows 11",
        "Intel UHD Graphics",
        "ASUS Prime",
      ),
    ).rejects.toThrow("Computer ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllComputerSpecs", () => {
  it("should return all computer specifications", async () => {
    const mockRows = [
      {
        computer_spec_id: 1,
        computer_id: 1,
        processor: "Intel Core i5",
        ram: "8GB",
        storage: "512GB SSD",
        operating_system: "Windows 11",
        gpu: "Intel UHD Graphics",
        motherboard: "ASUS Prime",
      },
      {
        computer_spec_id: 2,
        computer_id: 2,
        processor: "Intel Core i7",
        ram: "16GB",
        storage: "1TB SSD",
        operating_system: "Windows 11",
        gpu: "NVIDIA GTX 1650",
        motherboard: "MSI B550",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await computerSpecsService.findAllComputerSpecs();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_COMPUTER_SPECS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no computer specifications exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await computerSpecsService.findAllComputerSpecs();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_COMPUTER_SPECS);

    expect(result).toEqual([]);
  });
});

describe("findComputerSpecById", () => {
  it("should return a computer specification by ID", async () => {
    const mockComputerSpec = {
      computer_spec_id: 1,
      computer_id: 1,
      processor: "Intel Core i5",
      ram: "8GB",
      storage: "512GB SSD",
      operating_system: "Windows 11",
      gpu: "Intel UHD Graphics",
      motherboard: "ASUS Prime",
    };

    mockDb.query.mockResolvedValueOnce([[mockComputerSpec]]);

    const result = await computerSpecsService.findComputerSpecById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_COMPUTER_SPEC_BY_ID, [1]);

    expect(result).toEqual(mockComputerSpec);
  });

  it("should return null when the computer specification does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await computerSpecsService.findComputerSpecById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_COMPUTER_SPEC_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(computerSpecsService.findComputerSpecById()).rejects.toThrow("Computer specification ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findComputerSpecByComputerId", () => {
  it("should return a computer specification by computer ID", async () => {
    const mockComputerSpec = {
      computer_spec_id: 1,
      computer_id: 1,
      processor: "Intel Core i5",
      ram: "8GB",
      storage: "512GB SSD",
      operating_system: "Windows 11",
      gpu: "Intel UHD Graphics",
      motherboard: "ASUS Prime",
    };

    mockDb.query.mockResolvedValueOnce([[mockComputerSpec]]);

    const result = await computerSpecsService.findComputerSpecByComputerId(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_COMPUTER_SPEC_BY_COMPUTER_ID, [1]);

    expect(result).toEqual(mockComputerSpec);
  });

  it("should return null when the computer specification does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await computerSpecsService.findComputerSpecByComputerId(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_COMPUTER_SPEC_BY_COMPUTER_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(computerSpecsService.findComputerSpecByComputerId()).rejects.toThrow("Computer ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateComputerSpec", () => {
  it("should update a computer specification successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await computerSpecsService.updateComputerSpec(
      1,
      1,
      "Intel Core i7",
      "16GB",
      "1TB SSD",
      "Windows 11",
      "NVIDIA GTX 1650",
      "MSI B550",
    );

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_COMPUTER_SPEC, [
      1,
      "Intel Core i7",
      "16GB",
      "1TB SSD",
      "Windows 11",
      "NVIDIA GTX 1650",
      "MSI B550",
      1,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(
      computerSpecsService.updateComputerSpec(
        null,
        1,
        "Intel Core i7",
        "16GB",
        "1TB SSD",
        "Windows 11",
        "NVIDIA GTX 1650",
        "MSI B550",
      ),
    ).rejects.toThrow("Computer specification ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(
      computerSpecsService.updateComputerSpec(
        1,
        null,
        "Intel Core i7",
        "16GB",
        "1TB SSD",
        "Windows 11",
        "NVIDIA GTX 1650",
        "MSI B550",
      ),
    ).rejects.toThrow("Computer ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteComputerSpec", () => {
  it("should delete a computer specification successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await computerSpecsService.deleteComputerSpec(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_COMPUTER_SPEC, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(computerSpecsService.deleteComputerSpec()).rejects.toThrow("Computer specification ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no computer specification was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await computerSpecsService.deleteComputerSpec(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_COMPUTER_SPEC, [999]);

    expect(result).toEqual(mockResult);
  });
});
