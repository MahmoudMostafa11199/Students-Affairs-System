import * as api from "../api/studentApi.js";
import * as Student from "../models/Student.js";

const controlStudents = async function () {
  try {
    const data = await api.getStudents();
    document.querySelector(".table__body").innerHTML = "";

    Student.render(data);
    Student.sortStudent(data);
    Student.search(data);
    
    // Student.studentPerPage(data);
    //
  } catch (err) {
    console.error("Controller Error 💥:", err);
  }
};

controlStudents();
