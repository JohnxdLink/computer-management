// CREATE
const CREATE_COMPUTER_SPEC = `
  INSERT INTO computer_specs (
    computer_id,
    processor,
    ram,
    storage,
    operating_system,
    gpu,
    motherboard
  )
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

// READ - Get all computer specifications
const FIND_ALL_COMPUTER_SPECS = `
  SELECT
    cs.id,
    cs.computer_id,
    cs.processor,
    cs.ram,
    cs.storage,
    cs.operating_system,
    cs.gpu,
    cs.motherboard
  FROM computer_specs AS cs
  ORDER BY cs.id DESC
`;

// READ - Get computer specification by ID
const FIND_COMPUTER_SPEC_BY_ID = `
  SELECT
    cs.id,
    cs.computer_id,
    cs.processor,
    cs.ram,
    cs.storage,
    cs.operating_system,
    cs.gpu,
    cs.motherboard
  FROM computer_specs AS cs
  WHERE cs.id = ?
`;

// READ - Get specification by computer ID
const FIND_COMPUTER_SPEC_BY_COMPUTER_ID = `
  SELECT
    cs.id,
    cs.computer_id,
    cs.processor,
    cs.ram,
    cs.storage,
    cs.operating_system,
    cs.gpu,
    cs.motherboard
  FROM computer_specs AS cs
  WHERE cs.computer_id = ?
`;

// UPDATE
const UPDATE_COMPUTER_SPEC = `
  UPDATE computer_specs AS cs
  SET
    cs.computer_id = ?,
    cs.processor = ?,
    cs.ram = ?,
    cs.storage = ?,
    cs.operating_system = ?,
    cs.gpu = ?,
    cs.motherboard = ?
  WHERE cs.id = ?
`;

// DELETE
const DELETE_COMPUTER_SPEC = `
  DELETE FROM computer_specs
  WHERE id = ?
`;

module.exports = {
  CREATE_COMPUTER_SPEC,
  FIND_ALL_COMPUTER_SPECS,
  FIND_COMPUTER_SPEC_BY_ID,
  FIND_COMPUTER_SPEC_BY_COMPUTER_ID,
  UPDATE_COMPUTER_SPEC,
  DELETE_COMPUTER_SPEC,
};
