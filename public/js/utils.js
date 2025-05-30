import { fetchStudents, editStudent } from "./api.js";
import { studentsContainer, studentsTable, tbody } from "./domElements.js";
import { getStudents } from "./student.js";

export const showError = (
  message,
  container,
  permanent = false,
  timeout = 2000
) => {
  // Create column div
  const colDiv = document.createElement("div");
  colDiv.className = "col-12";

  // Create alert div
  const alertDiv = document.createElement("div");
  alertDiv.className = "alert alert-danger";
  alertDiv.setAttribute("role", "alert");
  alertDiv.textContent = message;

  // Build structure
  colDiv.appendChild(alertDiv);
  container.prepend(colDiv);

  if (!permanent) {
    // Remove error
    setTimeout(() => {
      colDiv.remove();
    }, timeout);
  }
};

export const showSuccess = (message) => {
  const alertDiv = document.createElement("div");
  alertDiv.className =
    "alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3";
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
};

export const showNoStudents = () => {
  const col = document.createElement("div");
  col.className = "col-12 text-center";

  const alert = document.createElement("div");
  alert.className = "alert alert-info";
  alert.setAttribute("role", "alert");

  const heading = document.createElement("h4");
  heading.className = "mb-0";
  heading.textContent = "No students to show";

  alert.appendChild(heading);
  col.appendChild(alert);
  studentsContainer.innerHTML = "";
  tbody.innerHTML = "";
  studentsContainer.appendChild(col);
};

export async function exportToExcel() {
  const students = await fetchStudents();
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(students);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
  // Generate Excel file and trigger download'
  const date = new Date().toLocaleDateString();
  XLSX.writeFile(workbook, `students-${date}.xlsx`);
  showSuccess("Students data exported successfully!");
}

export async function saveEditedStudent(id) {
  const form = document.getElementById("editStudentForm");
  const formData = new FormData(form);
  const updatedStudent = {
    name: formData.get("name"),
    age: parseInt(formData.get("age")),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  };

  try {
    editStudent(id, updatedStudent);

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editStudentModal")
    );
    modal.hide();
    showSuccess("Student updated successfully");
    getStudents();
  } catch (error) {
    console.error("Error updating student:", error);
    showError(`Failed to update student: ${error.message}`);
  }
}
