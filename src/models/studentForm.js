import { getCourses } from '../api/courseApi.js';
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from '../api/studentApi.js';

// Elements
const modal = document.querySelectorAll('.modal');
const modalForm = document.querySelector('.modal-student-form');
const modalDelete = document.querySelector('.modal-delete');
const overlay = document.querySelector('.overlay');
const showModal = document.querySelector('.btn--add');
const btnCloseModal = document.querySelectorAll('.close-modal');
const formCancel = document.querySelectorAll('.form-cancel');
const selectCourses = document.querySelector('.std-courses');
const formAdd = document.querySelector('.modal-form');
const btnConfirmDelete = document.querySelector('.form-delete');

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
  document.querySelector('.modal-create .modal-title').textContent =
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

  if (hasErrro) return;

  // Age Validation
  if (
    isNaN(Number(formInputs[1].value)) ||
    formInputs[1].value < 7 ||
    formInputs[1].value > 70
  ) {
    document.querySelector('.error-age').textContent = 'Age is invalid';
    return;
  }

  // Level Validation
  if (isNaN(Number(formInputs[4].value))) {
    document.querySelector('.error-level').textContent = 'Level is invalid';
    return;
  }

  // Email Duplication Check
  const existingEmail = students.some((std) => {
    return std.email == formInputs[2].value.trim() && editingId !== std.id;
  });

  if (existingEmail) {
    document.querySelector('.error-email').textContent = 'Email already exists';
    return;
  }

  const studentData = {
    name: formInputs[0].value,
    age: +formInputs[1].value,
    email: formInputs[2].value,
    courses: [formInputs[3].value],
    level: +formInputs[4].value,
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

  // Delete button
  if (e.target.classList.contains('btn--delete')) {
    deletingId = studentId;
    openModalDelete();
  }

  // Edit button
  if (e.target.classList.contains('btn--edit')) {
    editingId = studentId;
    const student = students.find((std) => std.id == editingId);

    document.querySelector('.modal-create .modal-title').textContent =
      'Edit Student';
    document.querySelector('.form-create').textContent = 'Save Changes';

    const courseIds = courses.filter((crs) =>
      student.courses.includes(crs.title),
    );

    const formInputs = formAdd.querySelectorAll('.form-input');
    formInputs[0].value = student.name;
    formInputs[1].value = student.age;
    formInputs[2].value = student.email;
    formInputs[3].value = courseIds[0].id;
    formInputs[4].value = student.level;

    openModalForm();
  }
});

// Load init courses
const load = async () => {
  courses = await getCourses();
  students = await getStudents();

  courses.map((crs) => {
    const opt = `<option value="${crs.id}">${crs.title}</option>`;

    selectCourses.insertAdjacentHTML('beforeend', opt);
  });
};

load();
