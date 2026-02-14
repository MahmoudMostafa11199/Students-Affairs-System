import Person from './Person.js';

const search_input = document.getElementById('search-input');
const selectPerPage = document.querySelector(
  '.table-operations__filter #per-page',
);

export default class Student extends Person {
  constructor(_id, _name, _age, _email, _courses, _level) {
    super(_name, _age, _email);

    this.id = _id;
    this.courses = _courses;
    this.level = _level;
  }
}

const markupCourse = (course) => `<span class="course">${course}</span>`;

function generatMarkup(std, i) {
  const markup = `
      <tr class="table__row" data-id="${std.id}">
        <td class="table__data">${i.toString().padStart(2, 0)}</td>
        <td class="table__data">${std.name}</td>
        <td class="table__data">${std.age}</td>
        <td class="table__data">${std.email}</td>
        <td class="table__data">${std.courses.map(markupCourse).join('')}</td>
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

export function render(data, perPage = 10) {
  data.slice(0, perPage).map((std, i) => {
    generatMarkup(std, i + 1);
  });
}

export function sortStudent(data) {
  document.addEventListener('click', (e) => {
    const sortBy = e.target.dataset.title;

    if (
      sortBy === 'name' ||
      sortBy === 'age' ||
      sortBy === 'email' ||
      sortBy === 'courses' ||
      sortBy === 'level'
    ) {
      data.sort(function (a, b) {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    }

    document.querySelector('.table__body').innerHTML = '';
    render(data);
  });
}

export function search(data) {
  search_input.addEventListener('input', () => {
    let newData = data.filter((el) => {
      return (
        el.name.toLowerCase().includes(search_input.value) ||
        el.age.toString().includes(search_input.value) ||
        el.courses.toString().toLowerCase().includes(search_input.value) ||
        el.email.toLowerCase().includes(search_input.value) ||
        el.level.toString().includes(search_input.value)
      );
    });

    document.querySelector('.table__body').innerHTML = '';
    render(newData);
  });
}

export const studentPerPage = (data) => {
  selectPerPage.addEventListener('change', (e) => {
    render(data, e.target.value);
  });
};
