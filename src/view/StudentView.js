import View from './View.js';

class StudentView extends View {
  columnsSort = ['name', 'age', 'email', 'level'];

  //
  markupCourse(course) {
    return `<span class="course">${course}</span>`;
  }

  //
  generatMarkup(std, i) {
    const markup = `
        <tr class="table__row" data-id="${std.id}">
          <td class="table__data">${i.toString().padStart(2, 0)}</td>
          <td class="table__data">${std.name}</td>
          <td class="table__data">${std.age}</td>
          <td class="table__data">${std.email}</td>
          <td class="table__data">${std.courses.map(this.markupCourse).join('')}</td>
          <td class="table__data">${std.level}</td>
          <th class="table__data">
            <div class="table__actions">
              <button class="btn btn--edit">Edit</button>
              <button class="btn btn--delete">Delete</button>
            </div>
          </td>
        </tr>`;

    this.tableBody.insertAdjacentHTML('beforeend', markup);
  }
}

export default new StudentView();
