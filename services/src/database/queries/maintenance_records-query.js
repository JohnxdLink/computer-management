// CREATE
const CREATE_MAINTENANCE_RECORD = `
  INSERT INTO maintenance_records (
    computer_id,
    performed_by,
    maintenance_type,
    description,
    status,
    remarks
  )
  VALUES (?, ?, ?, ?, ?, ?)
`;

// READ - Get all maintenance records
const FIND_ALL_MAINTENANCE_RECORDS = `
  SELECT
    mr.id,
    mr.computer_id,
    mr.performed_by,
    mr.maintenance_type,
    mr.description,
    mr.date_performed,
    mr.status,
    mr.remarks
  FROM maintenance_records AS mr
  ORDER BY mr.id DESC
`;

// READ - Get maintenance record by ID
const FIND_MAINTENANCE_RECORD_BY_ID = `
  SELECT
    mr.id,
    mr.computer_id,
    mr.performed_by,
    mr.maintenance_type,
    mr.description,
    mr.date_performed,
    mr.status,
    mr.remarks
  FROM maintenance_records AS mr
  WHERE mr.id = ?
`;

// READ - Get maintenance records by computer ID
const FIND_MAINTENANCE_RECORDS_BY_COMPUTER_ID = `
  SELECT
    mr.id,
    mr.computer_id,
    mr.performed_by,
    mr.maintenance_type,
    mr.description,
    mr.date_performed,
    mr.status,
    mr.remarks
  FROM maintenance_records AS mr
  WHERE mr.computer_id = ?
  ORDER BY mr.date_performed DESC
`;

// UPDATE
const UPDATE_MAINTENANCE_RECORD = `
  UPDATE maintenance_records AS mr
  SET
    mr.computer_id = ?,
    mr.performed_by = ?,
    mr.maintenance_type = ?,
    mr.description = ?,
    mr.status = ?,
    mr.remarks = ?
  WHERE mr.id = ?
`;

// DELETE
const DELETE_MAINTENANCE_RECORD = `
  DELETE FROM maintenance_records
  WHERE id = ?
`;

module.exports = {
  CREATE_MAINTENANCE_RECORD,
  FIND_ALL_MAINTENANCE_RECORDS,
  FIND_MAINTENANCE_RECORD_BY_ID,
  FIND_MAINTENANCE_RECORDS_BY_COMPUTER_ID,
  UPDATE_MAINTENANCE_RECORD,
  DELETE_MAINTENANCE_RECORD,
};