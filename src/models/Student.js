import Person from "./Person.js";
let table__title = document.querySelectorAll(".table__title");
let search_input = document.getElementById("search-input");

export default class Student extends Person {
  constructor(_id, _name, _age, _email, _courses, _level) {
    super(_name, _age, _email);

    this.id = _id;
    this.courses = _courses;
    this.level = _level;
  }
}

function generatMarkup(std) {
  const markup = `
      <tr class="table__row">
        <td class="table__data">--</td>
        <td class="table__data">${std.name}</td>
        <td class="table__data">${std.age}</td>
        <td class="table__data">${std.email}</td>
        <td class="table__data">${std.courses.join(" , ")}</td>
        <td class="table__data">${std.level}</td>
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
  data.map((std) => {
    generatMarkup(std);
  });
}

export function sortStudent(data) {
  document.addEventListener("click", (e) => {
    //sort name
    if (e.target.innerText === "Name") {
      data.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      // sort age
    } else if (e.target.innerText === "Age") {
      data.sort((a, b) => a.age - b.age);
      // sort email
    } else if (e.target.innerText === "Email") {
      data.sort(function (a, b) {
        if (a.email < b.email) return -1;
        if (a.email > b.email) return 1;
        return 0;
      });
    } else if (e.target.innerText === "Level/Year") {
      data.sort((a, b) => a.level - b.level);
    }

    document.querySelector(".table__body").innerHTML = "";
    render(data);
  });
}

export function search(data) {
  search_input.addEventListener("input", () => {
    console.log(search_input.value);

    let newData = data.filter((el) => {
      return (
        el.name.toLowerCase().includes(search_input.value) ||
        el.age.toString().includes(search_input.value) ||
        el.courses.toString().toLowerCase().includes(search_input.value) ||
        el.email.toLowerCase().includes(search_input.value) ||
        el.level.toString().includes(search_input.value)
      );
    });
    document.querySelector(".table__body").innerHTML = "";
    render(newData);
  });
}
