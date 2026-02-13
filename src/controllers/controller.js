import * as api from "../api/studentApi.js";
import * as Student from "../models/Student.js";

const controlStudents = async function () {
  try {
    const data = await api.getStudents();
    document.querySelector(".table__body").innerHTML = "";
    // data.map((std) => {
    //   const studentInstance = new Student(
    //     std.id,
    //     std.name,
    //     std.age,
    //     std.email,
    //     std.courses,
    //     std.level,
    //   );

    //   studentInstance.render();
    // });

    Student.render(data);
    Student.sortStudent(data);
    Student.search(data);
    //
  } catch (err) {
    console.error("Controller Error 💥:", err);
  }
};

controlStudents();
