import { createDeleteStudentModal, createEditModal } from "./modals.js";
import { deleteStudent } from "./api.js";
import { saveEditedStudent, showError, showNoStudents } from "./utils.js";
import { fetchStudents } from "./api.js";
import {
  deleteAllBtn,
  studentsContainer,
  studentsTable,
} from "./domElements.js";

export default function createStudentCard(student) {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";

  const card = document.createElement("div");
  card.className = "card h-100";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = student.name || "-";

  const text = document.createElement("p");
  text.className = "card-text";
  text.innerHTML = `
    <strong>Age:</strong> ${student.age || "-"}<br>
    <strong>Email:</strong> ${student.email || "-"}<br>
    <strong>Phone:</strong> ${student.phone || "-"}<br>
    <strong>Address:</strong> ${student.address || "-"}
  `;

  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "d-flex gap-2";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-primary btn-sm";
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.addEventListener("click", () =>
    createEditModal(student.id, saveEditedStudent)
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.addEventListener("click", () =>
    createDeleteStudentModal(student.id, deleteStudent)
  );

  // Append everything
  buttonWrapper.appendChild(editBtn);
  buttonWrapper.appendChild(deleteBtn);

  cardBody.appendChild(title);
  cardBody.appendChild(text);
  cardBody.appendChild(buttonWrapper);

  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}

export function createStudentRow(student) {
  const tr = document.createElement("tr");

  const idCell = document.createElement("th");
  idCell.scope = "row";
  idCell.textContent = student.id || "-";
  tr.appendChild(idCell);

  const nameCell = document.createElement("td");
  nameCell.textContent = student.name || "-";
  tr.appendChild(nameCell);

  const ageCell = document.createElement("td");
  ageCell.textContent = student.age || "-";
  tr.appendChild(ageCell);

  const emailCell = document.createElement("td");
  emailCell.textContent = student.email || "-";
  tr.appendChild(emailCell);

  const phoneCell = document.createElement("td");
  phoneCell.textContent = student.phone || "-";
  tr.appendChild(phoneCell);

  const addressCell = document.createElement("td");
  addressCell.textContent = student.address || "-";
  tr.appendChild(addressCell);

  const controlsCell = document.createElement("td");
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "d-flex gap-2";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-primary btn-sm";
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.addEventListener("click", () =>
    createEditModal(student.id, saveEditedStudent)
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.addEventListener("click", () =>
    createDeleteStudentModal(student.id, deleteStudent)
  );

  buttonWrapper.appendChild(editBtn);
  buttonWrapper.appendChild(deleteBtn);
  controlsCell.appendChild(buttonWrapper);
  tr.appendChild(controlsCell);

  return tr;
}

// Show students
export async function getStudents() {
  try {
    const data = await fetchStudents();
    console.log(data);
    displayStudents(data);
  } catch (error) {
    console.error("Error fetching students:", error);
    showError(
      `Error loading students: ${error.message}`,
      studentsContainer,
      true
    );
  }
}

export function displayStudents(studentsData) {
  if (!studentsData?.length) {
    // Hide Delete All Button
    deleteAllBtn.style.display = "none";
    // Show no students to show
    showNoStudents(studentsContainer);
    return;
  }
  // Show Delete All Button
  deleteAllBtn.style.display = "block";
  // Display student
  studentsContainer.innerHTML = "";
  studentsTable.querySelector("tbody").innerHTML = "";
  studentsData.reverse().forEach((student) => {
    // Append to student container
    const studentCard = createStudentCard(student);
    studentsContainer.appendChild(studentCard);
    // Append to table
    const row = createStudentRow(student);
    studentsTable.querySelector("tbody").appendChild(row);
  });
}
