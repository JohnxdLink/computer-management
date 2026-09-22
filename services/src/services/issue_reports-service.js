const db = require("../config/database.js");

const {
  CREATE_ISSUE_REPORT,
  FIND_ALL_ISSUE_REPORTS,
  FIND_ISSUE_REPORT_BY_ID,
  FIND_ISSUE_REPORTS_BY_COMPUTER_ID,
  UPDATE_ISSUE_REPORT,
  DELETE_ISSUE_REPORT,
} = require("../database/queries/issue-reports-query.js");

// CREATE
const createIssueReport = async (
  computer_id,
  reported_by,
  issue_description,
  priority,
  status,
  resolved_date
) => {
  if (
    !computer_id ||
    !reported_by ||
    !issue_description ||
    !priority ||
    !status
  ) {
    throw new Error(
      "Computer ID, reported by, issue description, priority, and status are required."
    );
  }

  const [result] = await db.query(CREATE_ISSUE_REPORT, [
    computer_id,
    reported_by,
    issue_description,
    priority,
    status,
    resolved_date,
  ]);

  return result;
};

// READ - Get all issue reports
const findAllIssueReports = async () => {
  const [rows] = await db.query(FIND_ALL_ISSUE_REPORTS);

  return rows;
};

// READ - Get issue report by ID
const findIssueReportById = async (id) => {
  if (!id) {
    throw new Error("Issue report ID is required.");
  }

  const [rows] = await db.query(FIND_ISSUE_REPORT_BY_ID, [id]);

  return rows[0] || null;
};

// READ - Get reports for one computer
const findIssueReportsByComputerId = async (computer_id) => {
  if (!computer_id) {
    throw new Error("Computer ID is required.");
  }

  const [rows] = await db.query(
    FIND_ISSUE_REPORTS_BY_COMPUTER_ID,
    [computer_id]
  );

  return rows;
};

// UPDATE
const updateIssueReport = async (
  id,
  computer_id,
  reported_by,
  issue_description,
  priority,
  status,
  resolved_date
) => {
  if (!id) {
    throw new Error("Issue report ID is required.");
  }

  if (
    !computer_id ||
    !reported_by ||
    !issue_description ||
    !priority ||
    !status
  ) {
    throw new Error(
      "Computer ID, reported by, issue description, priority, and status are required."
    );
  }

  const [result] = await db.query(UPDATE_ISSUE_REPORT, [
    computer_id,
    reported_by,
    issue_description,
    priority,
    status,
    resolved_date,
    id,
  ]);

  return result;
};

// DELETE
const deleteIssueReport = async (id) => {
  if (!id) {
    throw new Error("Issue report ID is required.");
  }

  const [result] = await db.query(DELETE_ISSUE_REPORT, [id]);

  return result;
};

module.exports = {
  createIssueReport,
  findAllIssueReports,
  findIssueReportById,
  findIssueReportsByComputerId,
  updateIssueReport,
  deleteIssueReport,
};