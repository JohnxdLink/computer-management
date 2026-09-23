// CREATE
const CREATE_ISSUE_REPORT = `
  INSERT INTO issue_reports (
    computer_id,
    reported_by,
    issue_description,
    priority,
    status,
    resolved_date
  )
  VALUES (?, ?, ?, ?, ?, ?)
`;

// READ - Get all issue reports
const FIND_ALL_ISSUE_REPORTS = `
  SELECT
    ir.id,
    ir.computer_id,
    ir.reported_by,
    ir.issue_description,
    ir.priority,
    ir.status,
    ir.date_reported,
    ir.resolved_date
  FROM issue_reports AS ir
  ORDER BY ir.id DESC
`;

// READ - Get issue report by ID
const FIND_ISSUE_REPORT_BY_ID = `
  SELECT
    ir.id,
    ir.computer_id,
    ir.reported_by,
    ir.issue_description,
    ir.priority,
    ir.status,
    ir.date_reported,
    ir.resolved_date
  FROM issue_reports AS ir
  WHERE ir.id = ?
`;

// READ - Get reports for one computer
const FIND_ISSUE_REPORTS_BY_COMPUTER_ID = `
  SELECT
    ir.id,
    ir.computer_id,
    ir.reported_by,
    ir.issue_description,
    ir.priority,
    ir.status,
    ir.date_reported,
    ir.resolved_date
  FROM issue_reports AS ir
  WHERE ir.computer_id = ?
  ORDER BY ir.date_reported DESC
`;

// UPDATE
const UPDATE_ISSUE_REPORT = `
  UPDATE issue_reports AS ir
  SET
    ir.computer_id = ?,
    ir.reported_by = ?,
    ir.issue_description = ?,
    ir.priority = ?,
    ir.status = ?,
    ir.resolved_date = ?
  WHERE ir.id = ?
`;

// DELETE
const DELETE_ISSUE_REPORT = `
  DELETE FROM issue_reports
  WHERE id = ?
`;

module.exports = {
  CREATE_ISSUE_REPORT,
  FIND_ALL_ISSUE_REPORTS,
  FIND_ISSUE_REPORT_BY_ID,
  FIND_ISSUE_REPORTS_BY_COMPUTER_ID,
  UPDATE_ISSUE_REPORT,
  DELETE_ISSUE_REPORT,
};
