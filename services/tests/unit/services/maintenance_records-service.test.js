//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const maintenanceRecordsService = require("../../../src/services/maintenance_records-service.js");

const {
  CREATE_MAINTENANCE_RECORD,
  FIND_ALL_MAINTENANCE_RECORDS,
  FIND_MAINTENANCE_RECORD_BY_ID,
  FIND_MAINTENANCE_RECORDS_BY_COMPUTER_ID,
  UPDATE_MAINTENANCE_RECORD,
  DELETE_MAINTENANCE_RECORD,
} = require("../../../src/database/queries/maintenance_records-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createMaintenanceRecord", () => {
  it("should create a maintenance record successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await maintenanceRecordsService.createMaintenanceRecord(
      1,
      2,
      "Preventive Maintenance",
      "Cleaned and inspected computer components",
      "completed",
      "No issues found",
    );

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_MAINTENANCE_RECORD, [
      1,
      2,
      "Preventive Maintenance",
      "Cleaned and inspected computer components",
      "completed",
      "No issues found",
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(
      maintenanceRecordsService.createMaintenanceRecord(
        null,
        2,
        "Preventive Maintenance",
        "Cleaned and inspected computer components",
        "completed",
        "No issues found",
      ),
    ).rejects.toThrow("Computer ID, performed by, maintenance type, description, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when performed by is missing", async () => {
    await expect(
      maintenanceRecordsService.createMaintenanceRecord(
        1,
        null,
        "Preventive Maintenance",
        "Cleaned and inspected computer components",
        "completed",
        "No issues found",
      ),
    ).rejects.toThrow("Computer ID, performed by, maintenance type, description, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when maintenance type is missing", async () => {
    await expect(
      maintenanceRecordsService.createMaintenanceRecord(
        1,
        2,
        null,
        "Cleaned and inspected computer components",
        "completed",
        "No issues found",
      ),
    ).rejects.toThrow("Computer ID, performed by, maintenance type, description, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when description is missing", async () => {
    await expect(
      maintenanceRecordsService.createMaintenanceRecord(
        1,
        2,
        "Preventive Maintenance",
        null,
        "completed",
        "No issues found",
      ),
    ).rejects.toThrow("Computer ID, performed by, maintenance type, description, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when status is missing", async () => {
    await expect(
      maintenanceRecordsService.createMaintenanceRecord(
        1,
        2,
        "Preventive Maintenance",
        "Cleaned and inspected computer components",
        null,
        "No issues found",
      ),
    ).rejects.toThrow("Computer ID, performed by, maintenance type, description, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllMaintenanceRecords", () => {
  it("should return all maintenance records", async () => {
    const mockRows = [
      {
        maintenance_record_id: 1,
        computer_id: 1,
        performed_by: 2,
        maintenance_type: "Preventive Maintenance",
        description: "Cleaned computer components",
        status: "completed",
        remarks: "No issues found",
      },
      {
        maintenance_record_id: 2,
        computer_id: 2,
        performed_by: 3,
        maintenance_type: "Repair",
        description: "Replaced faulty keyboard",
        status: "completed",
        remarks: "Keyboard replaced",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await maintenanceRecordsService.findAllMaintenanceRecords();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_MAINTENANCE_RECORDS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no maintenance records exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await maintenanceRecordsService.findAllMaintenanceRecords();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_MAINTENANCE_RECORDS);

    expect(result).toEqual([]);
  });
});

describe("findMaintenanceRecordById", () => {
  it("should return a maintenance record by ID", async () => {
    const mockMaintenanceRecord = {
      maintenance_record_id: 1,
      computer_id: 1,
      performed_by: 2,
      maintenance_type: "Preventive Maintenance",
      description: "Cleaned computer components",
      status: "completed",
      remarks: "No issues found",
    };

    mockDb.query.mockResolvedValueOnce([[mockMaintenanceRecord]]);

    const result = await maintenanceRecordsService.findMaintenanceRecordById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_MAINTENANCE_RECORD_BY_ID, [1]);

    expect(result).toEqual(mockMaintenanceRecord);
  });

  it("should return null when the maintenance record does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await maintenanceRecordsService.findMaintenanceRecordById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_MAINTENANCE_RECORD_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(maintenanceRecordsService.findMaintenanceRecordById()).rejects.toThrow(
      "Maintenance record ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findMaintenanceRecordsByComputerId", () => {
  it("should return maintenance records by computer ID", async () => {
    const mockRows = [
      {
        maintenance_record_id: 1,
        computer_id: 1,
        performed_by: 2,
        maintenance_type: "Preventive Maintenance",
        description: "Cleaned computer components",
        status: "completed",
        remarks: "No issues found",
      },
      {
        maintenance_record_id: 2,
        computer_id: 1,
        performed_by: 3,
        maintenance_type: "Repair",
        description: "Replaced faulty keyboard",
        status: "completed",
        remarks: "Keyboard replaced",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await maintenanceRecordsService.findMaintenanceRecordsByComputerId(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_MAINTENANCE_RECORDS_BY_COMPUTER_ID, [1]);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no maintenance records exist for the computer", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await maintenanceRecordsService.findMaintenanceRecordsByComputerId(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_MAINTENANCE_RECORDS_BY_COMPUTER_ID, [999]);

    expect(result).toEqual([]);
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(maintenanceRecordsService.findMaintenanceRecordsByComputerId()).rejects.toThrow(
      "Computer ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateMaintenanceRecord", () => {
  it("should update a maintenance record successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await maintenanceRecordsService.updateMaintenanceRecord(
      1,
      1,
      2,
      "Repair",
      "Replaced faulty keyboard",
      "completed",
      "Keyboard replaced",
    );

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_MAINTENANCE_RECORD, [
      1,
      2,
      "Repair",
      "Replaced faulty keyboard",
      "completed",
      "Keyboard replaced",
      1,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(
      maintenanceRecordsService.updateMaintenanceRecord(
        null,
        1,
        2,
        "Repair",
        "Replaced faulty keyboard",
        "completed",
        "Keyboard replaced",
      ),
    ).rejects.toThrow("Maintenance record ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(
      maintenanceRecordsService.updateMaintenanceRecord(
        1,
        null,
        2,
        "Repair",
        "Replaced faulty keyboard",
        "completed",
        "Keyboard replaced",
      ),
    ).rejects.toThrow("Computer ID, performed by, maintenance type, description, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when performed by is missing", async () => {
    await expect(
      maintenanceRecordsService.updateMaintenanceRecord(
        1,
        1,
        null,
        "Repair",
        "Replaced faulty keyboard",
        "completed",
        "Keyboard replaced",
      ),
    ).rejects.toThrow("Computer ID, performed by, maintenance type, description, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when maintenance type is missing", async () => {
    await expect(
      maintenanceRecordsService.updateMaintenanceRecord(
        1,
        1,
        2,
        null,
        "Replaced faulty keyboard",
        "completed",
        "Keyboard replaced",
      ),
    ).rejects.toThrow("Computer ID, performed by, maintenance type, description, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when description is missing", async () => {
    await expect(
      maintenanceRecordsService.updateMaintenanceRecord(1, 1, 2, "Repair", null, "completed", "Keyboard replaced"),
    ).rejects.toThrow("Computer ID, performed by, maintenance type, description, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when status is missing", async () => {
    await expect(
      maintenanceRecordsService.updateMaintenanceRecord(
        1,
        1,
        2,
        "Repair",
        "Replaced faulty keyboard",
        null,
        "Keyboard replaced",
      ),
    ).rejects.toThrow("Computer ID, performed by, maintenance type, description, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteMaintenanceRecord", () => {
  it("should delete a maintenance record successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await maintenanceRecordsService.deleteMaintenanceRecord(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_MAINTENANCE_RECORD, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(maintenanceRecordsService.deleteMaintenanceRecord()).rejects.toThrow(
      "Maintenance record ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no maintenance record was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await maintenanceRecordsService.deleteMaintenanceRecord(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_MAINTENANCE_RECORD, [999]);

    expect(result).toEqual(mockResult);
  });
});
