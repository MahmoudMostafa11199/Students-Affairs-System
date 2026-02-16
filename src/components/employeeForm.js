import * as courseApi from '../api/courseApi.js';
import * as employeeApi from '../api/employeeApi.js';
import { isEmailAddress } from '../utils/helper.js';
import BaseForm from './BaseForm.js';

export default class EmployeeForm extends BaseForm {
  constructor() {
    super('Employee', '.modal-employee-form', {
      delete: employeeApi.deleteEmployee,
      update: employeeApi.updateEmployee,
      create: employeeApi.createEmployee,
      get: employeeApi.getEmployees,
    });

    this.selectCourses = document.querySelector('.emp-courses');
    this.roleSelect = document.querySelector('select[name="role"]');

    this._setupSpecialHandlers();
    this.load();
  }

  _setupSpecialHandlers() {
    if (this.roleSelect) {
      this.roleSelect.addEventListener('change', (e) => {
        this._toggleCourseField(e.target.value);
      });
    }

    //
    const addBtn = document.querySelector('.btn--add');
    if (addBtn) {
      addBtn.addEventListener('click', () => this.renderCoursesSelect(null));
    }
  }

  async load() {
    this.items = await this.api.get();
  }

  _toggleCourseField(role) {
    const courseGroup = this.selectCourses;

    if (role === 'instructor') {
      courseGroup.style.display = 'inline-block';
    } else {
      courseGroup.style.display = 'none';
      this.selectCourses.value = '';
    }
  }

  prepareData(inputs) {
    return {
      name: inputs[0].value,
      email: inputs[1].value,
      role: inputs[2].value,
      courseId: inputs[2].value === 'instructor' ? inputs[3].value : null,
      experience: inputs[4].value,
    };
  }

  async fillForm(employee) {
    const inputs = this.modal.formEl.querySelectorAll('.form-input');

    await this.renderCoursesSelect(employee.courseId);

    inputs[0].value = employee.name;
    inputs[1].value = employee.email;
    inputs[2].value = employee.role;
    inputs[3].value = employee.courseId || '';
    inputs[4].value = employee.experience;

    this._toggleCourseField(employee.role);
  }

  validate(inputs) {
    let hasError = false;
    const role = inputs[2].value;

    // Check empty inputs
    inputs.forEach((input) => {
      const errorEl = document.querySelector(`.error-${input.name}`);

      if (input.name === 'course' && role !== 'instructor') return;

      if (!input.value.trim()) {
        errorEl.textContent = `${input.name} required`;
        hasError = true;
      } else {
        errorEl.textContent = '';
      }
    });

    // Email Validation
    if (!isEmailAddress(inputs[1].value)) {
      document.querySelector('.error-email').textContent = 'Email is invalid';
      hasError = true;
    }

    // Email Duplication Check by (email)
    const existingEmail = this.items.some((emp) => {
      return emp.email == inputs[1].value.trim() && this.editingId !== emp.id;
    });

    if (existingEmail) {
      document.querySelector('.error-email').textContent =
        'Email already exists';
      hasError = true;
    }

    return !hasError;
  }

  async renderCoursesSelect(currentCourseId = null) {
    this.selectCourses.innerHTML = '<option value="">Select Course</option>';
    const availableCourses = await courseApi.getCoursesWithoutInstructors();

    //
    if (currentCourseId) {
      const isAlreadyIn = availableCourses.some((c) => c.id == currentCourseId);
      if (!isAlreadyIn) {
        const currentCourse = await courseApi.getCourse(currentCourseId);
        availableCourses.push(currentCourse);
      }
    }

    availableCourses.forEach((crs) => {
      const opt = `<option value="${crs.id}">${crs.title}</option>`;
      this.selectCourses.insertAdjacentHTML('beforeend', opt);
    });
  }
}

new EmployeeForm();
