import Person from './Person.js';

export default class Student extends Person {
  constructor(_id, _name, _age, _email, _courses, _level) {
    super(_name, _age, _email);

    this.id = _id;
    this.courses = _courses;
    this.level = _level;
  }
}

export function generatMarkup(std) {
  const markup = `
      <tr class="table__row">
        <td class="table__data">--</td>
        <td class="table__data">${std.name}</td>
        <td class="table__data">${std.age}</td>
        <td class="table__data">${std.email}</td>
        <td class="table__data">${std.courses.join(', ')}</td>
        <td class="table__data">${std.level}</td>
        <th class="table__data">
          <div class="table__actions">
            <button class="btn btn--edit">Edit</button>
            <button class="btn btn--delete">Delete</button>
          </div>
        </td>
      </tr>`;

  document
    .querySelector('.table__body')
    .insertAdjacentHTML('beforeend', markup);
}

export function render(data) {
  data.map((std) => {
    generatMarkup(std);
  });
}
