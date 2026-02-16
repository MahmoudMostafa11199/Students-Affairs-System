import View from './View.js';

class CourseView extends View {
  columnsSort = ['title', 'code', 'creditHours', 'description'];

  generatMarkup(crs, i) {
    const markup = `
      <tr class="table__row" data-id="${crs.id}">
        <td class="table__data">${i.toString().padStart(2, 0)}</td>
        <td class="table__data">${crs.title}</td>
        <td class="table__data">${crs.code}</td>
        <td class="table__data">${crs.creditHours}</td>
        <td class="table__data">${crs.description}</td>
        <td class="table__data">${crs.instructorName}</td>
        <th class="table__data">
          <div class="table__actions">
            <button class="btn btn--edit">Edit</button>
            <button class="btn btn--delete">Delete</button>
          </div>
        </td>
      </tr> `;

    this.tableBody.insertAdjacentHTML('beforeend', markup);
  }
}

export default new CourseView();
