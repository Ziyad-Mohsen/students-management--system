const XLSX = require("xlsx");
const path = require("path");

const EXCEL_FILE_PATH = path.join(__dirname, "../data/students.xlsx");

// Initialize Excel file if it doesn't exist
function initializeExcelFile() {
  const defaultStudents = [];

  const worksheet = XLSX.utils.json_to_sheet(defaultStudents);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
  XLSX.writeFile(workbook, EXCEL_FILE_PATH);
}

// Read all students from Excel
function readStudents() {
  try {
    const workbook = XLSX.readFile(EXCEL_FILE_PATH);
    const worksheet = workbook.Sheets["Students"];
    return XLSX.utils.sheet_to_json(worksheet);
  } catch (error) {
    // If file doesn't exist, create it
    if (error.code === "ENOENT") {
      initializeExcelFile();
      return readStudents();
    }
    throw error;
  }
}

// Write students to Excel
function writeStudents(students) {
  const worksheet = XLSX.utils.json_to_sheet(students);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
  XLSX.writeFile(workbook, EXCEL_FILE_PATH);
}

module.exports = {
  readStudents,
  writeStudents,
};
