const search_input = document.getElementById("search-input");

class Course {
  constructor(_title, _code, _creditHours, _description, _instructor) {
    this.title = _title;
    this.code = _code;
    this.creditHours = _creditHours;
    this.description = _description;
    this.instructor = _instructor;
  }
}

function generatMarkup(crs, i) {
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

  document
    .querySelector(".table__body")
    .insertAdjacentHTML("beforeend", markup);
}

export function render(data) {
  data.map((crs, i) => {
    generatMarkup(crs, i + 1);
  });
}

export function sortCourse(data) {
  document.addEventListener("click", (e) => {
    const sortBy = e.target.dataset.title;
    if (
      sortBy === "title" ||
      sortBy === "code" ||
      sortBy === "creditHours" ||
      sortBy === "description" ||
      sortBy === "instructorName"
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
        el.title.toLowerCase().includes(search_input.value) ||
        el.code.toString().includes(search_input.value) ||
        el.creditHours.toString().toLowerCase().includes(search_input.value) ||
        el.description.toLowerCase().includes(search_input.value) ||
        el.instructorName.toString().includes(search_input.value)
      );
    });

    document.querySelector(".table__body").innerHTML = "";
    render(newData);
  });
}
