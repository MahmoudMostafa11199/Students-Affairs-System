import * as api from '../api/courseApi.js';
import { getInstructors } from '../api/employeeApi.js';
import CourseView from '../view/CourseView.js';

const controlCourses = async function () {
  try {
    const data = await api.getCoursesWithInstructor();

    CourseView.render(data);

    //
  } catch (err) {
    console.error('Controller Error 💥:', err.message);
  }
};

// Control Sort Course
const controlSortCourse = async function (sortBy, order) {
  try {
    const sortedCourses = await api.sortCourse(sortBy, order);
    const instructors = await getInstructors();

    const courseWithInstructors = sortedCourses.map((crs) => ({
      ...crs,
      instructorName:
        instructors.find((ins) => ins.courseId === crs.id)?.name ||
        'Waiting for Instructor',
    }));

    return courseWithInstructors;

    //
  } catch (err) {
    console.error('Controller Error 💥:', err.message);
  }
};

// Control Search Course
const controlSearchCourse = async function (query) {
  try {
    const searchedCourses = await api.searchCourses(query);
    const instructors = await getInstructors();

    const courseWithInstructors = searchedCourses.map((crs) => ({
      ...crs,
      instructorName:
        instructors.find((ins) => ins.courseId === crs.id)?.name ||
        'Waiting for Instructor',
    }));

    return courseWithInstructors;

    //
  } catch (err) {
    console.error('Controller Error 💥:', err.message);
  }
};

CourseView.addHandlerRender(controlCourses);
CourseView.sort(controlSortCourse);
CourseView.search(controlSearchCourse);
