import Person from './Person.js';

class Student extends Person {
  constructor(_id, _name, _age, _email, _courses, _level) {
    super(_name, _age, _email);

    this.id = _id;
    this.courses = _courses;
    this.level = _level;
  }

  _generatMarkup() {
    return `
      <tr class="table__row">
        <td class="table__data">--</td>
        <td class="table__data">${this.name}</td>
        <td class="table__data">${this.age}</td>
        <td class="table__data">${this.email}</td>
        <td class="table__data">${this.courses.join(', ')}</td>
        <td class="table__data">${this.level}</td>
        <th class="table__data">
          <div class="table__actions">
            <button class="btn btn--edit">Edit</button>
            <button class="btn btn--delete">Delete</button>
          </div>
        </td>
      </tr>`;
  }

  render() {
    const markup = this._generatMarkup();

    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
}

export default Student;
