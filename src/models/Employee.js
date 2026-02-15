import Person from "./Person.js";
const search_input = document.getElementById("search-input");

class Employee extends Person {
  constructor(_name, _age, _email, _role, _experience) {
    super(_name, _age, _email);
    this.role = _role;
    this.experience = _experience;
  }
}
function generatMarkup(emp, i) {
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

  document
    .querySelector(".table__body")
    .insertAdjacentHTML("beforeend", markup);
}

export function render(data) {
  data.map((emp, i) => {
    generatMarkup(emp, i + 1);
  });
}

export function sortCourse(data) {
  document.addEventListener("click", (e) => {
    const sortBy = e.target.dataset.title;
    if (
      sortBy === "name" ||
      sortBy === "email" ||
      sortBy === "role" ||
      sortBy === "courseName" ||
      sortBy === "experience"
    ) {
      data.sort(function (a, b) {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    }
    document.querySelector(".table__body").innerHTML = "";
    render(data);
  });
}

export function search(data) {
  search_input.addEventListener("input", () => {
    let newData = data.filter((el) => {
      return (
        el.name.toLowerCase().includes(search_input.value) ||
        el.email.toString().includes(search_input.value) ||
        el.role.toString().toLowerCase().includes(search_input.value) ||
        el.courseName.toLowerCase().includes(search_input.value) ||
        el.experience.toString().includes(search_input.value)
      );
    });

    document.querySelector(".table__body").innerHTML = "";
    render(newData);
  });
}
