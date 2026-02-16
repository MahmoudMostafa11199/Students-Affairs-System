import * as courseApi from '../api/courseApi.js';
import BaseForm from './BaseForm.js';

export default class CourseForm extends BaseForm {
  constructor() {
    super('Course', '.modal-course-form', {
      delete: courseApi.deleteCourse,
      update: courseApi.updateCourse,
      create: courseApi.createCourse,
      get: courseApi.getCourses,
    });

    this.load();
  }

  async load() {
    this.items = await this.api.get();
  }

  prepareData(inputs) {
    return {
      title: inputs[0].value,
      code: inputs[1].value,
      creditHours: +inputs[2].value,
      description: inputs[3].value,
    };
  }

  fillForm(course) {
    const inputs = this.modal.formEl.querySelectorAll('.form-input');
    inputs[0].value = course.title;
    inputs[1].value = course.code;
    inputs[2].value = course.creditHours;
    inputs[3].value = course.description;
  }

  validate(inputs) {
    let hasErrro = false;

    inputs.forEach((input) => {
      const errorEl = document.querySelector(`.error-${input.name}`);

      if (!input.value.trim()) {
        errorEl.textContent = input.name + ' required';
        hasErrro = true;
      } else {
        errorEl.textContent = '';
      }
    });

    // credit hours Validation
    if (isNaN(Number(inputs[2].value))) {
      document.querySelector('.error-creditHours').textContent =
        'credit hours is invalid';
      hasErrro = true;
    }

    // Course Duplication Check by (code course)
    const existingCourse = this.items.some((crs) => {
      return (
        crs.code == inputs[1].value.toUpperCase().trim() &&
        this.editingId !== crs.id
      );
    });

    if (existingCourse) {
      document.querySelector('.error-code').textContent =
        'Course already exists';
      hasErrro = true;
    }

    return !hasErrro;
  }
}

new CourseForm();
