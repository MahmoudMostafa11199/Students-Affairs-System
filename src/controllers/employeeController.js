import * as api from "../api/employeeApi.js";
import * as Employee from "../models/Employee.js";

const controlCourses = async function () {
  try {
    const data = await api.getEmployees();

    document.querySelector(".table__body").innerHTML = "";
    Employee.render(data);
    Employee.sortCourse(data);
    Employee.search(data);

    //
  } catch (err) {
    console.error("Controller Error 💥:", err);
  }
};

controlCourses();
