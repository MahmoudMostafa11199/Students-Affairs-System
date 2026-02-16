import Person from './Person.js';

export default class Employee extends Person {
  constructor(_id, _name, _email, _role, _experience, _courseId) {
    super(_id, _name, _email);
    this.role = _role;
    this.experience = _experience;
    this.courseId = _courseId;
  }
}
