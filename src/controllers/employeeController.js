// import * as api from "../api/employeeApi.js";
import * as Employee from "../models/Employee.js";

// const controlCourses = async function () {
//   try {
// const data = await api.getCourses();
document.querySelector(".table__body").innerHTML = "";
Employee.render();
Employee.sortCourse();
Employee.search();

//
//   } catch (err) {
// console.error("Controller Error 💥:", err);
//   }
// };

// controlCourses();
