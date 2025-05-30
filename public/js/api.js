const STUDENTS_ENDPOINT = `/api/students`;

export async function fetchStudents() {
  const response = await fetch(STUDENTS_ENDPOINT);
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  const data = await response.json();
  return data;
}

export async function addStudent(student) {
  const response = await fetch(STUDENTS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to add student");
  }
}

export async function deleteStudent(id) {
  const response = await fetch(`${STUDENTS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }
}

export async function deleteAllStudents() {
  const response = await fetch(STUDENTS_ENDPOINT, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete all students");
  }
}

export async function editStudent(id, updatedStudent) {
  const response = await fetch(`${STUDENTS_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStudent),
  });

  if (!response.ok) {
    throw new Error("Failed to update student");
  }
}

export async function getStudentById(id) {
  const response = await fetch(`${STUDENTS_ENDPOINT}/${id}`);
  const student = await response.json();

  if (!response.ok) {
    throw new Error("Failed to get student");
  }

  return student;
}
