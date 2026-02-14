// import * as api from "../api/couseApi.js";
import * as Course from "../models/Course.js";

// const controlCourses = async function () {
//   try {
// const data = await api.getCourses();
document.querySelector(".table__body").innerHTML = "";
Course.render();
Course.sortCourse();
Course.search();

//
//   } catch (err) {
// console.error("Controller Error 💥:", err);
//   }
// };

// controlCourses();
