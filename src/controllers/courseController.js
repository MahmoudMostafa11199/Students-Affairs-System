import * as api from "../api/courseApi.js";
import * as Course from "../models/Course.js";

const controlCourses = async function () {
  try {

    const data = await api.getCoursesWithInstructor();

    document.querySelector(".table__body").innerHTML = "";
    Course.render(data);
    Course.sortCourse(data);
    Course.search(data);

    //
  } catch (err) {
    console.error("Controller Error 💥:", err);
  }
};

controlCourses();
