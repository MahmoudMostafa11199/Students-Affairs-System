import { getCourses } from '../api/courseApi.js';
import { createStudent, getStudents } from '../api/studentApi.js';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const showModal = document.querySelector('.btn--add');
const btnCloseModal = document.querySelector('.close-modal');
const formCancel = document.querySelector('.form-cancel');
const selectCourses = document.querySelector('.std-courses');
const formAdd = document.querySelector('.modal-form');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

showModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
formCancel.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//
let students;
let courses;

//
formAdd.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formInputs = e.target.querySelectorAll('.form-input');

  for (const input of formInputs) {
    if (!input.value.trim()) {
      document.querySelector('.error-' + input.name).textContent =
        input.name + ' required';

      //
    } else {
      document.querySelector('.error-' + input.name).textContent = '';
    }
  }

  const isEmptyInput = [...formInputs].some((input) => !input.value.trim());

  if (isEmptyInput) return;

  if (
    isNaN(Number(formInputs[1].value)) ||
    formInputs[1].value < 7 ||
    formInputs[1].value > 70
  ) {
    document.querySelector('.error-age').textContent = 'Age is invalid';
    return;
  }

  if (isNaN(Number(formInputs[4].value))) {
    document.querySelector('.error-level').textContent = 'Level is invalid';
    return;
  }

  const existingEmail = students.some((std) => {
    return std.email == formInputs[2].value.trim();
  });

  if (existingEmail) {
    document.querySelector('.error-email').textContent = 'Email already exists';
    return;
  }

  const newStudent = {
    name: formInputs[0].value,
    age: +formInputs[1].value,
    email: formInputs[2].value,
    courses: formInputs[3].value,
    level: +formInputs[4].value,
  };

  await createStudent(newStudent);
  closeModal();
});

// load courses
const load = async () => {
  courses = await getCourses();
  students = await getStudents();

  courses.map((crs) => {
    const opt = `<option value="${crs.id}">${crs.title}</option>`;

    selectCourses.insertAdjacentHTML('beforeend', opt);
  });
};

load();
