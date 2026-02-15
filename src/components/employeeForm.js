import { getCoursesWithoutInstructors } from '../api/courseApi.js';
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from '../api/employeeApi.js';

// Elements
const modal = document.querySelectorAll('.modal');
const modalForm = document.querySelector('.modal-employee-form');
const modalDelete = document.querySelector('.modal-delete');
const overlay = document.querySelector('.overlay');
const showModal = document.querySelector('.btn--add');
const btnCloseModal = document.querySelectorAll('.close-modal');
const selectCourses = document.querySelector('.emp-courses');
const formCancel = document.querySelectorAll('.form-cancel');
const formAdd = document.querySelector('.modal-form');
const btnConfirmDelete = document.querySelector('.form-delete');

//-----------------------
// State
let editingId = null;
let deletingId = null;
let employees;
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
  document.querySelector('.modal-employee-form .modal-title').textContent =
    'Add Employee';
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
    await deleteEmployee(deletingId);
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
      document.querySelector(`.error-${input.name}`).textContent =
        input.name + ' required';
      hasErrro = true;

      //
    } else {
      document.querySelector('.error-' + input.name).textContent = '';
    }
  }

  if (hasErrro) return;

  // Email Duplication Check by (email)
  const existingEmail = employees.some((emp) => {
    return emp.email == formInputs[1].value.trim() && editingId !== emp.id;
  });

  if (existingEmail) {
    document.querySelector('.error-email').textContent = 'Email already exists';
    return;
  }

  const employeeData = {
    name: formInputs[0].value,
    email: formInputs[1].value,
    role: formInputs[2].value,
    courseId: formInputs[3].value,
    experience: formInputs[4].value,
  };

  if (editingId) {
    await updateEmployee(editingId, employeeData);

    //
  } else {
    await createEmployee(employeeData);
  }
  closeModal();
});

document.querySelector('.table').addEventListener('click', (e) => {
  const tableRow = e.target.closest('.table__row');
  if (!tableRow) return;

  const courseId = tableRow.dataset.id;

  // Delete button
  if (e.target.classList.contains('btn--delete')) {
    deletingId = courseId;
    openModalDelete();
  }

  // Edit button
  if (e.target.classList.contains('btn--edit')) {
    editingId = courseId;
    const employee = employees.find((emp) => emp.id == editingId);

    document.querySelector('.modal-employee-form .modal-title').textContent =
      'Edit Course';
    document.querySelector('.form-create').textContent = 'Save Changes';

    const formInputs = formAdd.querySelectorAll('.form-input');
    formInputs[0].value = employee.name;
    formInputs[1].value = employee.email;
    formInputs[2].value = employee.role;
    formInputs[3].value = employee.courseId;
    formInputs[4].value = employee.experience;

    openModalForm();
  }
});

// Load init courses
const load = async () => {
  courses = await getCoursesWithoutInstructors();
  employees = await getEmployees();

  courses.map((crs) => {
    const opt = `<option value="${crs.id}">${crs.title}</option>`;

    selectCourses.insertAdjacentHTML('beforeend', opt);
  });
};

load();
