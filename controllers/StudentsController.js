const {
  readStudents,
  writeStudents,
  getNextId,
} = require("../models/StudentsModel");

// Get all students
const getAllStudents = (req, res) => {
  res.json(readStudents());
};

// Get student by ID
const getStudentById = (req, res) => {
  const Students = readStudents();
  const student = Students.find((student) => student.id === parseInt(req.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
};

// Create a new student
const createStudent = (req, res) => {
  const newStudent = {
    id: Math.floor(Math.random() * 1000000),
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };
  writeStudents([...readStudents(), newStudent]);
  res.status(201).json(newStudent);
};

// Update a student
const updateStudent = (req, res) => {
  let Students = readStudents();
  const student = Students.find((student) => student.id === parseInt(req.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  const newStudent = {
    id: req.id,
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };
  Students = Students.map((student) =>
    student.id === parseInt(req.id) ? newStudent : student
  );
  writeStudents(Students);
  res.json(newStudent);
};

// Delete a student
const deleteStudent = (req, res) => {
  let Students = readStudents();
  const student = Students.find((student) => student.id === parseInt(req.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  Students = Students.filter((student) => student.id !== parseInt(req.id));
  writeStudents(Students);
  res.json(student);
};

// Delete all students
const deleteAllStudents = (req, res) => {
  writeStudents([]);
  res.json({ message: "All students deleted" });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  deleteAllStudents,
};
