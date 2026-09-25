//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const issueReportsService = require("../../../src/services/issue_reports-service.js");

const {
  CREATE_ISSUE_REPORT,
  FIND_ALL_ISSUE_REPORTS,
  FIND_ISSUE_REPORT_BY_ID,
  FIND_ISSUE_REPORTS_BY_COMPUTER_ID,
  UPDATE_ISSUE_REPORT,
  DELETE_ISSUE_REPORT,
} = require("../../../src/database/queries/issue_reports-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createIssueReport", () => {
  it("should create an issue report successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await issueReportsService.createIssueReport(1, 2, "Computer does not turn on", "high", "open", null);

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_ISSUE_REPORT, [
      1,
      2,
      "Computer does not turn on",
      "high",
      "open",
      null,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(
      issueReportsService.createIssueReport(null, 2, "Computer does not turn on", "high", "open", null),
    ).rejects.toThrow("Computer ID, reported by, issue description, priority, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when reported by is missing", async () => {
    await expect(
      issueReportsService.createIssueReport(1, null, "Computer does not turn on", "high", "open", null),
    ).rejects.toThrow("Computer ID, reported by, issue description, priority, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when issue description is missing", async () => {
    await expect(issueReportsService.createIssueReport(1, 2, null, "high", "open", null)).rejects.toThrow(
      "Computer ID, reported by, issue description, priority, and status are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when priority is missing", async () => {
    await expect(
      issueReportsService.createIssueReport(1, 2, "Computer does not turn on", null, "open", null),
    ).rejects.toThrow("Computer ID, reported by, issue description, priority, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when status is missing", async () => {
    await expect(
      issueReportsService.createIssueReport(1, 2, "Computer does not turn on", "high", null, null),
    ).rejects.toThrow("Computer ID, reported by, issue description, priority, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllIssueReports", () => {
  it("should return all issue reports", async () => {
    const mockRows = [
      {
        issue_report_id: 1,
        computer_id: 1,
        reported_by: 2,
        issue_description: "Computer does not turn on",
        priority: "high",
        status: "open",
        resolved_date: null,
      },
      {
        issue_report_id: 2,
        computer_id: 2,
        reported_by: 3,
        issue_description: "Keyboard not working",
        priority: "medium",
        status: "resolved",
        resolved_date: "2026-09-20",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await issueReportsService.findAllIssueReports();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_ISSUE_REPORTS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no issue reports exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await issueReportsService.findAllIssueReports();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_ISSUE_REPORTS);

    expect(result).toEqual([]);
  });
});

describe("findIssueReportById", () => {
  it("should return an issue report by ID", async () => {
    const mockIssueReport = {
      issue_report_id: 1,
      computer_id: 1,
      reported_by: 2,
      issue_description: "Computer does not turn on",
      priority: "high",
      status: "open",
      resolved_date: null,
    };

    mockDb.query.mockResolvedValueOnce([[mockIssueReport]]);

    const result = await issueReportsService.findIssueReportById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ISSUE_REPORT_BY_ID, [1]);

    expect(result).toEqual(mockIssueReport);
  });

  it("should return null when the issue report does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await issueReportsService.findIssueReportById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ISSUE_REPORT_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(issueReportsService.findIssueReportById()).rejects.toThrow("Issue report ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findIssueReportsByComputerId", () => {
  it("should return issue reports by computer ID", async () => {
    const mockRows = [
      {
        issue_report_id: 1,
        computer_id: 1,
        reported_by: 2,
        issue_description: "Computer does not turn on",
        priority: "high",
        status: "open",
        resolved_date: null,
      },
      {
        issue_report_id: 2,
        computer_id: 1,
        reported_by: 3,
        issue_description: "Keyboard not working",
        priority: "medium",
        status: "resolved",
        resolved_date: "2026-09-20",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await issueReportsService.findIssueReportsByComputerId(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ISSUE_REPORTS_BY_COMPUTER_ID, [1]);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no issue reports exist for the computer", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await issueReportsService.findIssueReportsByComputerId(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ISSUE_REPORTS_BY_COMPUTER_ID, [999]);

    expect(result).toEqual([]);
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(issueReportsService.findIssueReportsByComputerId()).rejects.toThrow("Computer ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateIssueReport", () => {
  it("should update an issue report successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await issueReportsService.updateIssueReport(
      1,
      1,
      2,
      "Computer does not turn on",
      "high",
      "resolved",
      "2026-09-25",
    );

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_ISSUE_REPORT, [
      1,
      2,
      "Computer does not turn on",
      "high",
      "resolved",
      "2026-09-25",
      1,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(
      issueReportsService.updateIssueReport(null, 1, 2, "Computer does not turn on", "high", "resolved", "2026-09-25"),
    ).rejects.toThrow("Issue report ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(
      issueReportsService.updateIssueReport(1, null, 2, "Computer does not turn on", "high", "resolved", "2026-09-25"),
    ).rejects.toThrow("Computer ID, reported by, issue description, priority, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when reported by is missing", async () => {
    await expect(
      issueReportsService.updateIssueReport(1, 1, null, "Computer does not turn on", "high", "resolved", "2026-09-25"),
    ).rejects.toThrow("Computer ID, reported by, issue description, priority, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when issue description is missing", async () => {
    await expect(
      issueReportsService.updateIssueReport(1, 1, 2, null, "high", "resolved", "2026-09-25"),
    ).rejects.toThrow("Computer ID, reported by, issue description, priority, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when priority is missing", async () => {
    await expect(
      issueReportsService.updateIssueReport(1, 1, 2, "Computer does not turn on", null, "resolved", "2026-09-25"),
    ).rejects.toThrow("Computer ID, reported by, issue description, priority, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when status is missing", async () => {
    await expect(
      issueReportsService.updateIssueReport(1, 1, 2, "Computer does not turn on", "high", null, "2026-09-25"),
    ).rejects.toThrow("Computer ID, reported by, issue description, priority, and status are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteIssueReport", () => {
  it("should delete an issue report successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await issueReportsService.deleteIssueReport(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_ISSUE_REPORT, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(issueReportsService.deleteIssueReport()).rejects.toThrow("Issue report ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no issue report was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await issueReportsService.deleteIssueReport(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_ISSUE_REPORT, [999]);

    expect(result).toEqual(mockResult);
  });
});
