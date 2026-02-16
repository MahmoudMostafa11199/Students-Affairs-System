import Person from './Person.js';

export default class Student extends Person {
  constructor(_id, _name, _age, _email, _courses, _level) {
    super(_id, _name, _email);

    this.age = _age;
    this.courses = _courses;
    this.level = _level;
  }
}
