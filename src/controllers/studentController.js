import * as api from '../api/studentApi.js';
import StudentView from '../view/StudentView.js';

//  Control Fetch Student
const controlFetchStudents = async function () {
  try {
    const students = await api.getStudentsWithCourseNames();

    StudentView.render(students);

    //
  } catch (err) {
    console.error('Controller Error 💥:', err.message);
  }
};

// Control Sort Student
const controlSortStudent = async function (sortBy, order) {
  try {
    const sortedStudent = await api.sortStudents(sortBy, order);

    return sortedStudent;
    //
  } catch (err) {
    console.error('Controller Error 💥:', err.message);
  }
};

// Control Search Student
const controlSearchStudent = async function (query) {
  try {
    const searchedStudent = await api.searchStudents(query);

    return searchedStudent;
    //
  } catch (err) {
    console.error('Controller Error 💥:', err.message);
  }
};

StudentView.addHandlerRender(controlFetchStudents);
StudentView.sort(controlSortStudent);
StudentView.search(controlSearchStudent);
