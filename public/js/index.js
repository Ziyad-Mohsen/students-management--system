import { addStudent, deleteAllStudents } from "./api.js";
import { showError, showSuccess, exportToExcel } from "./utils.js";
import { initializeTheme } from "./theme.js";
import { createDeleteAllModal, toggleAddForm } from "./modals.js";
import { getStudents } from "./student.js";
import { initializeView, toggleView } from "./viewOptions.js";
import {
  studentsContainer,
  addFormBtn,
  closeAddFromBtn,
  newStudentForm,
  deleteAllBtn,
  exportExcelBtn,
  toggleViewBtn,
} from "./domElements.js";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  getStudents();
  initializeTheme();
  initializeView();
});

// Events
addFormBtn.addEventListener("click", toggleAddForm);

closeAddFromBtn.addEventListener("click", toggleAddForm);

newStudentForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const newStudent = {
    name: formData.get("name"),
    age: parseInt(formData.get("age")),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  };

  try {
    addStudent(newStudent);
    toggleAddForm();
    this.reset();
    showSuccess("Student added successfully");
    getStudents();
  } catch (error) {
    console.error("Error adding student:", error);
    showError(`Failed to add student: ${error.message}`, studentsContainer);
  }
});

deleteAllBtn.addEventListener("click", () => {
  createDeleteAllModal(deleteAllStudents);
});

exportExcelBtn.addEventListener("click", exportToExcel);

toggleViewBtn.addEventListener("click", toggleView);
