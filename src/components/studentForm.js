import { getCourses } from '../api/courseApi.js';
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from '../api/studentApi.js';
import { isEmailAddress } from '../utils/helper.js';

// Elements
const modal = document.querySelectorAll('.modal');
const modalForm = document.querySelector('.modal-student-form');
const modalDelete = document.querySelector('.modal-delete');
const overlay = document.querySelector('.overlay');
const showModal = document.querySelector('.btn--add');
const btnCloseModal = document.querySelectorAll('.close-modal');
const formCancel = document.querySelectorAll('.form-cancel');
const formAdd = document.querySelector('.modal-form');
const deleteMessage = document.querySelector('.delete-message');
const btnConfirmDelete = document.querySelector('.form-delete');
const checkboxContainer = document.querySelector('#checkbox-container');

//-----------------------
// State
let editingId = null;
let deletingId = null;
let students;
let courses;

//-----------------------
// Functions
// Open and Close modal
const openModalForm = function () {
  modalForm.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const openModalDelete = function () {
  modalDelete.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  [...modal].map((md) => md.classList.add('hidden'));
  overlay.classList.add('hidden');

  editingId = null;
  deletingId = null;
  formAdd.reset();
  document.querySelector('.modal-student-form .modal-title').textContent =
    'Add Student';
  document.querySelector('.form-create').textContent = 'Create';
  document.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
};

// Event Listeners for Modals
showModal.addEventListener('click', openModalForm);
[...btnCloseModal].map((btn) => {
  btn.addEventListener('click', closeModal);
});
[...formCancel].map((btn) => btn.addEventListener('click', closeModal));
overlay.addEventListener('click', closeModal);

// Confirm delete
btnConfirmDelete.addEventListener('click', async () => {
  if (deletingId) {
    await deleteStudent(deletingId);
    closeModal();
  }
});

// Submit (Add / Edit)
formAdd.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formInputs = e.target.querySelectorAll('.form-input');

  let hasErrro = false;
  for (const input of formInputs) {
    if (!input.value.trim()) {
      document.querySelector('.error-' + input.name).textContent =
        input.name + ' required';
      hasErrro = true;

      //
    } else {
      document.querySelector('.error-' + input.name).textContent = '';
    }
  }

  const selectedCourses = Array.from(
    document.querySelectorAll('input[name="courses"]:checked'),
  ).map((cb) => cb.value);

  if (selectedCourses.length === 0) {
    document.querySelector('.error-courses').textContent =
      'Please select at least one course';
    hasErrro = true;
  }

  // Age Validation
  if (
    isNaN(Number(formInputs[1].value)) ||
    formInputs[1].value < 7 ||
    formInputs[1].value > 70
  ) {
    document.querySelector('.error-age').textContent = 'Age is invalid';
    hasErrro = true;
  }

  // Level Validation
  if (isNaN(Number(formInputs[3].value))) {
    document.querySelector('.error-level').textContent = 'Level is invalid';
    hasErrro = true;
  }

  // Email Validation
  if (!isEmailAddress(formInputs[2].value)) {
    document.querySelector('.error-email').textContent = 'Email is invalid';
    hasErrro = true;
  }

  // Email Duplication Check
  const existingEmail = students.some((std) => {
    return std.email == formInputs[2].value.trim() && editingId !== std.id;
  });

  if (existingEmail) {
    document.querySelector('.error-email').textContent = 'Email already exists';
    hasErrro = true;
  }

  if (hasErrro) return;

  const studentData = {
    name: formInputs[0].value,
    age: +formInputs[1].value,
    email: formInputs[2].value,
    courses: selectedCourses,
    level: +formInputs[3].value,
  };

  if (editingId) {
    await updateStudent(editingId, studentData);

    //
  } else {
    await createStudent(studentData);
  }
  closeModal();
});

document.querySelector('.table').addEventListener('click', (e) => {
  const tableRow = e.target.closest('.table__row');
  if (!tableRow) return;

  const studentId = tableRow.dataset.id;
  const student = students.find((std) => std.id == studentId);

  // Delete button
  if (e.target.classList.contains('btn--delete')) {
    deletingId = studentId;

    deleteMessage.querySelector('span').innerText = student.name;
    openModalDelete();
  }

  // Edit button
  if (e.target.classList.contains('btn--edit')) {
    editingId = studentId;

    document
      .querySelectorAll('input[name="courses"]')
      .forEach((cb) => (cb.checked = false));

    student.courses.forEach((courseId) => {
      const checkbox = document.querySelector(`input[value="${courseId}"]`);
      if (checkbox) checkbox.checked = true;
    });

    document.querySelector('.modal-student-form .modal-title').textContent =
      'Edit Student';
    document.querySelector('.form-create').textContent = 'Save Changes';

    const formInputs = formAdd.querySelectorAll('.form-input');
    formInputs[0].value = student.name;
    formInputs[1].value = student.age;
    formInputs[2].value = student.email;
    formInputs[3].value = student.level;

    openModalForm();
  }
});

// Load init courses
const load = async () => {
  courses = await getCourses();
  students = await getStudents();

  checkboxContainer.innerHTML = courses
    .map(
      (crs) => `
    <div class="checkbox-item">
      <input type="checkbox" name="courses" value="${crs.id}" id="crs-${crs.id}">
      <label for="crs-${crs.id}">${crs.title}</label>
    </div>
  `,
    )
    .join('');
};

load();
