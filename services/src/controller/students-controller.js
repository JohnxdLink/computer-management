const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const studentsService = require("../services/students-service.js");

// CREATE
const createStudent = async (req, res) => {
  try {
    const {
      grade_section_id,
      account_id,
      lastname,
      firstname,
      middlename,
      contact_no,
    } = req.body;

    const result = await studentsService.createStudent(
      grade_section_id,
      account_id,
      lastname,
      firstname,
      middlename,
      contact_no
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Student created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Student creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all students
const findAllStudents = async (req, res) => {
  try {
    const result = await studentsService.findAllStudents();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Students retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all students error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get student by ID
const findStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await studentsService.findStudentById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Student not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find student by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get student by account ID
const findStudentByAccountId = async (req, res) => {
  try {
    const { account_id } = req.params;

    const result = await studentsService.findStudentByAccountId(
      account_id
    );

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Student not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find student by account ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get students by grade section ID
const findStudentsByGradeSectionId = async (req, res) => {
  try {
    const { grade_section_id } = req.params;

    const result =
      await studentsService.findStudentsByGradeSectionId(
        grade_section_id
      );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Students retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find students by grade section ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      grade_section_id,
      account_id,
      lastname,
      firstname,
      middlename,
      contact_no,
    } = req.body;

    const result = await studentsService.updateStudent(
      id,
      grade_section_id,
      account_id,
      lastname,
      firstname,
      middlename,
      contact_no
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Student not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Student update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await studentsService.deleteStudent(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Student not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Student delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createStudent,
  findAllStudents,
  findStudentById,
  findStudentByAccountId,
  findStudentsByGradeSectionId,
  updateStudent,
  deleteStudent,
};