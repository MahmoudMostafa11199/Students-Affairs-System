import * as api from '../api/studentApi.js';
import Student from '../models/Student.js';

const controlStudents = async function () {
  try {
    const data = await api.getStudents();

    document.querySelector('.table__body').innerHTML = '';

    data.map((std) => {
      const studentInstance = new Student(
        std.id,
        std.name,
        std.age,
        std.email,
        std.courses,
        std.level,
      );

      studentInstance.render();
    });

    //
  } catch (err) {
    console.error('Controller Error 💥:', err);
  }
};

controlStudents();
