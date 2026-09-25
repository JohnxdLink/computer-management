const db = require("../config/database.js");

const {
  CREATE_COMPUTER_SPEC,
  FIND_ALL_COMPUTER_SPECS,
  FIND_COMPUTER_SPEC_BY_ID,
  FIND_COMPUTER_SPEC_BY_COMPUTER_ID,
  UPDATE_COMPUTER_SPEC,
  DELETE_COMPUTER_SPEC,
} = require("../database/queries/computer_specs-query.js");

// CREATE
const createComputerSpec = async (computer_id, processor, ram, storage, operating_system, gpu, motherboard) => {
  if (!computer_id) {
    throw new Error("Computer ID is required.");
  }

  const [result] = await db.query(CREATE_COMPUTER_SPEC, [
    computer_id,
    processor,
    ram,
    storage,
    operating_system,
    gpu,
    motherboard,
  ]);

  return result;
};

// READ - Get all computer specifications
const findAllComputerSpecs = async () => {
  const [rows] = await db.query(FIND_ALL_COMPUTER_SPECS);

  return rows;
};

// READ - Get computer specification by ID
const findComputerSpecById = async (id) => {
  if (!id) {
    throw new Error("Computer specification ID is required.");
  }

  const [rows] = await db.query(FIND_COMPUTER_SPEC_BY_ID, [id]);

  return rows[0] || null;
};

// READ - Get specification by computer ID
const findComputerSpecByComputerId = async (computer_id) => {
  if (!computer_id) {
    throw new Error("Computer ID is required.");
  }

  const [rows] = await db.query(FIND_COMPUTER_SPEC_BY_COMPUTER_ID, [computer_id]);

  return rows[0] || null;
};

// UPDATE
const updateComputerSpec = async (id, computer_id, processor, ram, storage, operating_system, gpu, motherboard) => {
  if (!id) {
    throw new Error("Computer specification ID is required.");
  }

  if (!computer_id) {
    throw new Error("Computer ID is required.");
  }

  const [result] = await db.query(UPDATE_COMPUTER_SPEC, [
    computer_id,
    processor,
    ram,
    storage,
    operating_system,
    gpu,
    motherboard,
    id,
  ]);

  return result;
};

// DELETE
const deleteComputerSpec = async (id) => {
  if (!id) {
    throw new Error("Computer specification ID is required.");
  }

  const [result] = await db.query(DELETE_COMPUTER_SPEC, [id]);

  return result;
};

module.exports = {
  createComputerSpec,
  findAllComputerSpecs,
  findComputerSpecById,
  findComputerSpecByComputerId,
  updateComputerSpec,
  deleteComputerSpec,
};
