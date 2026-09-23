const db = require("../config/database.js");

const {
  CREATE_COMPUTER,
  FIND_ALL_COMPUTERS,
  FIND_COMPUTER_BY_ID,
  FIND_COMPUTER_BY_PC_NUMBER,
  FIND_COMPUTERS_BY_STATUS,
  UPDATE_COMPUTER,
  DELETE_COMPUTER,
} = require("../database/queries/computers-query.js");

// CREATE
const createComputer = async (pc_number, status) => {
  if (!pc_number || !status) {
    throw new Error("PC number and status are required.");
  }

  const [result] = await db.query(CREATE_COMPUTER, [
    pc_number,
    status,
  ]);

  return result;
};

// READ - Get all computers
const findAllComputers = async () => {
  const [rows] = await db.query(FIND_ALL_COMPUTERS);

  return rows;
};

// READ - Get computer by ID
const findComputerById = async (id) => {
  if (!id) {
    throw new Error("Computer ID is required.");
  }

  const [rows] = await db.query(FIND_COMPUTER_BY_ID, [id]);

  return rows[0] || null;
};

// READ - Get computer by PC number
const findComputerByPcNumber = async (pc_number) => {
  if (!pc_number) {
    throw new Error("PC number is required.");
  }

  const [rows] = await db.query(FIND_COMPUTER_BY_PC_NUMBER, [
    pc_number,
  ]);

  return rows[0] || null;
};

// READ - Get computers by status
const findComputersByStatus = async (status) => {
  if (!status) {
    throw new Error("Computer status is required.");
  }

  const [rows] = await db.query(FIND_COMPUTERS_BY_STATUS, [
    status,
  ]);

  return rows;
};

// UPDATE
const updateComputer = async (id, pc_number, status) => {
  if (!id) {
    throw new Error("Computer ID is required.");
  }

  if (!pc_number || !status) {
    throw new Error("PC number and status are required.");
  }

  const [result] = await db.query(UPDATE_COMPUTER, [
    pc_number,
    status,
    id,
  ]);

  return result;
};

// DELETE
const deleteComputer = async (id) => {
  if (!id) {
    throw new Error("Computer ID is required.");
  }

  const [result] = await db.query(DELETE_COMPUTER, [id]);

  return result;
};

module.exports = {
  createComputer,
  findAllComputers,
  findComputerById,
  findComputerByPcNumber,
  findComputersByStatus,
  updateComputer,
  deleteComputer,
};