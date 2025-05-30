import { showError, showSuccess } from "./utils.js";
import { studentsContainer } from "./domElements.js";
import { getStudents } from "./student.js";
import { getStudentById } from "./api.js";

export function createDeleteAllModal(deleteFunc) {
  const modalHtml = `
    <div class="modal fade" id="deleteAllConfirmationModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title">Delete All Students</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <i class="fas fa-exclamation-triangle text-warning mb-3" style="font-size: 3rem;"></i>
            <h4 class="mb-3">Are you absolutely sure?</h4>
            <p class="text-muted">This will permanently delete all students. This action cannot be undone.</p>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" id="confirmDeleteAllBtn">
              <i class="fas fa-trash-alt"></i> Delete All Students
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add modal to document body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Get the modal element
  const modal = new bootstrap.Modal(
    document.getElementById("deleteAllConfirmationModal")
  );

  // Add event listener for the confirm delete button
  document
    .getElementById("confirmDeleteAllBtn")
    .addEventListener("click", async function () {
      try {
        deleteFunc();

        modal.hide();
        showSuccess("All students deleted successfully");
        getStudents();
      } catch (error) {
        console.error("Error deleting all students:", error);
        showError(
          `Failed to delete all students: ${error.message}`,
          studentsContainer
        );
      }
    });

  // Remove modal from DOM after it's hidden
  document
    .getElementById("deleteAllConfirmationModal")
    .addEventListener("hidden.bs.modal", function () {
      this.remove();
    });

  // Show the modal
  modal.show();
}

export function createDeleteStudentModal(studentId, deleteFunc) {
  const modalHtml = `
      <div class="modal fade" id="deleteStudentModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Delete Student</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center">
              <i class="fas fa-exclamation-triangle text-warning mb-3" style="font-size: 3rem;"></i>
              <h4 class="mb-3">Are you sure?</h4>
              <p class="text-muted">This will permanently delete student.</p>
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirmDeleteStudentBtn">
                <i class="fas fa-trash-alt"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

  // Insert modal into body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modalElement = document.getElementById("deleteStudentModal");
  const modalInstance = new bootstrap.Modal(modalElement);

  document
    .getElementById("confirmDeleteStudentBtn")
    .addEventListener("click", async function () {
      const btn = this;
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Deleting...`;

      try {
        deleteFunc(studentId);

        modalInstance.hide();
        showSuccess("student deleted successfully");
        getStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
        showError(
          `Failed to delete student: ${error.message}`,
          studentsContainer
        );
      }
    });

  // Remove modal from DOM after it's hidden
  modalElement.addEventListener("hidden.bs.modal", function () {
    this.remove();
  });

  modalInstance.show();
}

export async function createEditModal(studentId, editFunc) {
  try {
    const student = await getStudentById(studentId);
    const modalHtml = `
    <div class="modal fade" id="editStudentModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Student</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="editStudentForm">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name" value="${student.name}" required>
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">Age</label>
                <input type="number" class="form-control" id="age" name="age" value="${student.age}" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" value="${student.email}" required>
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input type="tel" class="form-control" id="phone" name="phone" value="${student.phone}" required>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <textarea class="form-control" id="address" name="address" required>${student.address}</textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="confirmEditStudentBtn">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    const modal = new bootstrap.Modal(
      document.getElementById("editStudentModal")
    );
    modal.show();

    document
      .getElementById("confirmEditStudentBtn")
      .addEventListener("click", () => {
        editFunc(studentId);
      });

    document
      .getElementById("editStudentModal")
      .addEventListener("hidden.bs.modal", function () {
        this.remove();
      });
  } catch (error) {
    console.error(error);
    showError("Failed to get student", studentsContainer);
  }
}

export function toggleAddForm() {
  const addForm = document.getElementById("addStudentForm");
  const addFormBtn = document.getElementById("add-student-btn");
  const isHidden = !addForm.classList.contains("show");

  if (isHidden) {
    addForm.classList.add("show");
    addFormBtn.innerHTML = '<i class="fas fa-minus"></i>';
  } else {
    addForm.classList.remove("show");
    addFormBtn.innerHTML = '<i class="fas fa-plus"></i>';
  }
}
