import View from './View.js';

class EmployeeView extends View {
  columnsSort = ['name', 'email', 'role', 'experience'];

  generatMarkup(emp, i) {
    const markup = `
        <tr class="table__row" data-id="${emp.id}">
          <td class="table__data">${i.toString().padStart(2, 0)}</td>
          <td class="table__data">${emp.name}</td>
          <td class="table__data">${emp.email}</td>
          <td class="table__data">${emp.role}</td>
          <td class="table__data">${emp.courseName}</td>
          <td class="table__data">${emp.experience}</td>
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

export default new EmployeeView();
