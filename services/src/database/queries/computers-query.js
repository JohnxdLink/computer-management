// CREATE
const CREATE_COMPUTER = `
  INSERT INTO computers (
    pc_number,
    status
  )
  VALUES (?, ?)
`;

// READ - Get all computers
const FIND_ALL_COMPUTERS = `
  SELECT
    c.id,
    c.pc_number,
    c.status,
    c.created_at,
    c.updated_at
  FROM computers AS c
  ORDER BY c.id DESC
`;

// READ - Get computer by ID
const FIND_COMPUTER_BY_ID = `
  SELECT
    c.id,
    c.pc_number,
    c.status,
    c.created_at,
    c.updated_at
  FROM computers AS c
  WHERE c.id = ?
`;

// READ - Get computer by PC number
const FIND_COMPUTER_BY_PC_NUMBER = `
  SELECT
    c.id,
    c.pc_number,
    c.status,
    c.created_at,
    c.updated_at
  FROM computers AS c
  WHERE c.pc_number = ?
`;

// READ - Get computers by status
const FIND_COMPUTERS_BY_STATUS = `
  SELECT
    c.id,
    c.pc_number,
    c.status,
    c.created_at,
    c.updated_at
  FROM computers AS c
  WHERE c.status = ?
  ORDER BY c.pc_number ASC
`;

// UPDATE
const UPDATE_COMPUTER = `
  UPDATE computers AS c
  SET
    c.pc_number = ?,
    c.status = ?
  WHERE c.id = ?
`;

// DELETE
const DELETE_COMPUTER = `
  DELETE FROM computers
  WHERE id = ?
`;

module.exports = {
  CREATE_COMPUTER,
  FIND_ALL_COMPUTERS,
  FIND_COMPUTER_BY_ID,
  FIND_COMPUTER_BY_PC_NUMBER,
  FIND_COMPUTERS_BY_STATUS,
  UPDATE_COMPUTER,
  DELETE_COMPUTER,
};
