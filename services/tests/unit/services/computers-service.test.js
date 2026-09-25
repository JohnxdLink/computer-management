//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const computerService = require("../../../src/services/computers-service.js");

const {
  CREATE_COMPUTER,
  FIND_ALL_COMPUTERS,
  FIND_COMPUTER_BY_ID,
  FIND_COMPUTER_BY_PC_NUMBER,
  FIND_COMPUTERS_BY_STATUS,
  UPDATE_COMPUTER,
  DELETE_COMPUTER,
} = require("../../../src/database/queries/computers-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createComputer", () => {
  it("should create a computer successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await computerService.createComputer("PC-001", "available");

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_COMPUTER, ["PC-001", "available"]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when PC number is missing", async () => {
    await expect(computerService.createComputer(null, "available")).rejects.toThrow(
      "PC number and status are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when status is missing", async () => {
    await expect(computerService.createComputer("PC-001", null)).rejects.toThrow("PC number and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllComputers", () => {
  it("should return all computers", async () => {
    const mockRows = [
      {
        computer_id: 1,
        pc_number: "PC-001",
        status: "available",
      },
      {
        computer_id: 2,
        pc_number: "PC-002",
        status: "in_use",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await computerService.findAllComputers();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_COMPUTERS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no computers exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await computerService.findAllComputers();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_COMPUTERS);

    expect(result).toEqual([]);
  });
});

describe("findComputerById", () => {
  it("should return a computer by ID", async () => {
    const mockComputer = {
      computer_id: 1,
      pc_number: "PC-001",
      status: "available",
    };

    mockDb.query.mockResolvedValueOnce([[mockComputer]]);

    const result = await computerService.findComputerById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_COMPUTER_BY_ID, [1]);

    expect(result).toEqual(mockComputer);
  });

  it("should return null when the computer does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await computerService.findComputerById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_COMPUTER_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(computerService.findComputerById()).rejects.toThrow("Computer ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findComputerByPcNumber", () => {
  it("should return a computer by PC number", async () => {
    const mockComputer = {
      computer_id: 1,
      pc_number: "PC-001",
      status: "available",
    };

    mockDb.query.mockResolvedValueOnce([[mockComputer]]);

    const result = await computerService.findComputerByPcNumber("PC-001");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_COMPUTER_BY_PC_NUMBER, ["PC-001"]);

    expect(result).toEqual(mockComputer);
  });

  it("should return null when the PC number does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await computerService.findComputerByPcNumber("PC-999");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_COMPUTER_BY_PC_NUMBER, ["PC-999"]);

    expect(result).toBeNull();
  });

  it("should throw an error when PC number is missing", async () => {
    await expect(computerService.findComputerByPcNumber()).rejects.toThrow("PC number is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findComputersByStatus", () => {
  it("should return computers by status", async () => {
    const mockRows = [
      {
        computer_id: 1,
        pc_number: "PC-001",
        status: "available",
      },
      {
        computer_id: 3,
        pc_number: "PC-003",
        status: "available",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await computerService.findComputersByStatus("available");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_COMPUTERS_BY_STATUS, ["available"]);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no computers match the status", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await computerService.findComputersByStatus("maintenance");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_COMPUTERS_BY_STATUS, ["maintenance"]);

    expect(result).toEqual([]);
  });

  it("should throw an error when status is missing", async () => {
    await expect(computerService.findComputersByStatus()).rejects.toThrow("Computer status is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateComputer", () => {
  it("should update a computer successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await computerService.updateComputer(1, "PC-001", "maintenance");

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_COMPUTER, ["PC-001", "maintenance", 1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(computerService.updateComputer(null, "PC-001", "available")).rejects.toThrow(
      "Computer ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when PC number is missing", async () => {
    await expect(computerService.updateComputer(1, null, "available")).rejects.toThrow(
      "PC number and status are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when status is missing", async () => {
    await expect(computerService.updateComputer(1, "PC-001", null)).rejects.toThrow(
      "PC number and status are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteComputer", () => {
  it("should delete a computer successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await computerService.deleteComputer(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_COMPUTER, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(computerService.deleteComputer()).rejects.toThrow("Computer ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no computer was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await computerService.deleteComputer(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_COMPUTER, [999]);

    expect(result).toEqual(mockResult);
  });
});
