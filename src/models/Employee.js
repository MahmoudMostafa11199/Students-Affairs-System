const search_input = document.getElementById("search-input");

function generatMarkup() {
  const markup = `
      <tr class="table__row" data-id="1">
        <td class="table__data">1</td>
        <td class="table__data">Mahmoud</td>
        <td class="table__data">mahmoud@gmail.com</td>
        <td class="table__data">Instructor</td>
        <td class="table__data">JS</td>
        <td class="table__data">4 years</td>
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

export function render() {
  generatMarkup();
}

export function sortCourse(data) {
  document.addEventListener("click", (e) => {
    const sortBy = e.target.dataset.title;

    if (
      sortBy === "name" ||
      sortBy === "email" ||
      sortBy === "role" ||
      sortBy === "course" ||
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
        el.course.toLowerCase().includes(search_input.value) ||
        el.experience.toString().includes(search_input.value)
      );
    });

    document.querySelector(".table__body").innerHTML = "";
    render(newData);
  });
}
