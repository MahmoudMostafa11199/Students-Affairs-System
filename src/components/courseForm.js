import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from '../api/courseApi.js';

// Elements
const modal = document.querySelectorAll('.modal');
const modalForm = document.querySelector('.modal-course-form');
const modalDelete = document.querySelector('.modal-delete');
const overlay = document.querySelector('.overlay');
const showModal = document.querySelector('.btn--add');
const btnCloseModal = document.querySelectorAll('.close-modal');
const formCancel = document.querySelectorAll('.form-cancel');
const formAdd = document.querySelector('.modal-form');
const btnConfirmDelete = document.querySelector('.form-delete');

//-----------------------
// State
let editingId = null;
let deletingId = null;
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
  document.querySelector('.modal-course-form .modal-title').textContent =
    'Add Course';
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
    await deleteCourse(deletingId);
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

  // credit hours Validation
  if (isNaN(Number(formInputs[2].value))) {
    document.querySelector('.error-creditHours').textContent =
      'credit hours is invalid';
    return;
  }

  // Course Duplication Check by (code course)
  const existingCourse = courses.some((crs) => {
    return (
      crs.code == formInputs[1].value.toUpperCase().trim() &&
      editingId !== std.id
    );
  });

  if (existingCourse) {
    document.querySelector('.error-code').textContent = 'Course already exists';
    return;
  }

  const courseData = {
    title: formInputs[0].value,
    code: formInputs[1].value,
    creditHours: +formInputs[2].value,
    description: formInputs[3].value,
  };

  if (editingId) {
    await updateCourse(editingId, courseData);

    //
  } else {
    await createCourse(courseData);
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
    const course = courses.find((crs) => crs.id == editingId);

    document.querySelector('.modal-course-form .modal-title').textContent =
      'Edit Course';
    document.querySelector('.form-create').textContent = 'Save Changes';

    const formInputs = formAdd.querySelectorAll('.form-input');
    formInputs[0].value = course.title;
    formInputs[1].value = course.code;
    formInputs[2].value = course.creditHours;
    formInputs[3].value = course.description;

    openModalForm();
  }
});

// Load init courses
const load = async () => {
  courses = await getCourses();
};

load();
