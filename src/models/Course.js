const search_input = document.getElementById("search-input");
function generatMarkup() {
  const markup = `
      <tr class="table__row" data-id="1">
        <td class="table__data">1</td>
        <td class="table__data">JS</td>
        <td class="table__data">0121</td>
        <td class="table__data">12 H</td>
        <td class="table__data">Best Couse</td>
        <td class="table__data">Mahmoud</td>
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
  generatMarkup();
}

export function sortCourse(data) {
  document.addEventListener("click", (e) => {
    const sortBy = e.target.dataset.title;

    if (
      sortBy === "title" ||
      sortBy === "code" ||
      sortBy === "credit" ||
      sortBy === "description" ||
      sortBy === "instructor"
    ) {
      data.sort(function (a, b) {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    }

    document.querySelector(".table__body").innerHTML = "";
    render();
  });
}

export function search(data) {
  search_input.addEventListener("input", () => {
    let newData = data.filter((el) => {
      return (
        el.title.toLowerCase().includes(search_input.value) ||
        el.code.toString().includes(search_input.value) ||
        el.credit.toString().toLowerCase().includes(search_input.value) ||
        el.description.toLowerCase().includes(search_input.value) ||
        el.instructor.toString().includes(search_input.value)
      );
    });

    document.querySelector(".table__body").innerHTML = "";
    render(newData);
  });
}
