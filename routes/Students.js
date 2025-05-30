const express = require("express");
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  deleteAllStudents,
} = require("../controllers/StudentsController");
const validateId = require("../middlewares/IdValidator");

const router = express.Router();

router.use(express.json());

// Validate the id
router.param("id", validateId);

// Get all students
router.get("/", getAllStudents);

// Get a single student
router.get("/:id", getStudentById);

// Create a new student
router.post("/", createStudent);

// Update a student
router.put("/:id", updateStudent);

// Delete a student
router.delete("/:id", deleteStudent);

// Delete all students
router.delete("/", deleteAllStudents);

module.exports = router;
