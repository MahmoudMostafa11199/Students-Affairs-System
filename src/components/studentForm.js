import * as courseApi from '../api/courseApi.js';
import * as studentApi from '../api/studentApi.js';
import { isEmailAddress } from '../utils/helper.js';
import BaseForm from './BaseForm.js';

export default class StudentForm extends BaseForm {
  constructor() {
    super('Student', '.modal-student-form', {
      delete: studentApi.deleteStudent,
      update: studentApi.updateStudent,
      create: studentApi.createStudent,
      get: studentApi.getStudents,
    });

    this.checkboxContainer = document.querySelector('#checkbox-container');

    this.load();
  }

  async load() {
    const [courses, students] = await Promise.all([
      courseApi.getCourses(),
      this.api.get(),
    ]);

    this.items = students;
    this.allCourses = courses;

    this.checkboxContainer.innerHTML = this.allCourses
      .map(
        (crs) => `
          <div class="checkbox-item">
            <input type="checkbox" name="courses" value="${crs.id}" id="crs-${crs.id}">
            <label for="crs-${crs.id}">${crs.title}</label>
          </div>
        `,
      )
      .join('');
  }

  prepareData(inputs) {
    const selectedCourses = Array.from(
      document.querySelectorAll('input[name="courses"]:checked'),
    ).map((cb) => cb.value);

    return {
      name: inputs[0].value,
      age: +inputs[1].value,
      email: inputs[2].value,
      courses: selectedCourses,
      level: +inputs[3].value,
    };
  }

  fillForm(student) {
    const inputs = this.modal.formEl.querySelectorAll('.form-input');
    inputs[0].value = student.name;
    inputs[1].value = student.age;
    inputs[2].value = student.email;
    inputs[3].value = student.level;

    document.querySelectorAll('input[name="courses"]').forEach((cb) => {
      cb.checked = student.courses.includes(cb.value);
    });
  }

  validate(inputs) {
    let hasErrro = false;

    // Check empty inputs
    inputs.forEach((input) => {
      const errorEl = document.querySelector(`.error-${input.name}`);
      if (!input.value.trim()) {
        errorEl.textContent = input.name + ' required';
        hasErrro = true;
      } else {
        errorEl.textContent = '';
      }
    });

    // Check courses
    const selectedCourses = Array.from(
      document.querySelectorAll('input[name="courses"]:checked'),
    ).map((cb) => cb.value);

    if (selectedCourses.length === 0) {
      document.querySelector('.error-courses').textContent =
        'Please select at least one course';
      hasErrro = true;
    } else {
      document.querySelector('.error-courses').textContent = '';
    }

    // Age Validation
    if (
      isNaN(Number(inputs[1].value)) ||
      inputs[1].value < 7 ||
      inputs[1].value > 70
    ) {
      document.querySelector('.error-age').textContent = 'Age is invalid';
      hasErrro = true;
    }

    // Level Validation
    if (isNaN(Number(inputs[3].value))) {
      document.querySelector('.error-level').textContent = 'Level is invalid';
      hasErrro = true;
    }

    // Email Validation
    if (!isEmailAddress(inputs[2].value)) {
      document.querySelector('.error-email').textContent = 'Email is invalid';
      hasErrro = true;
    }

    // Email Duplication Check
    const existingEmail = this.items.some((std) => {
      return std.email == inputs[2].value.trim() && this.editingId !== std.id;
    });

    if (existingEmail) {
      document.querySelector('.error-email').textContent =
        'Email already exists';
      hasErrro = true;
    }

    return !hasErrro;
  }
}

new StudentForm();
