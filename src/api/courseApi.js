import Course from '../models/Course.js';
import { API_URL } from '../utils/constant.js';
import { generateId, throwErrorRes } from '../utils/helper.js';
import { getInstructors } from './employeeApi.js';
import { getStudents, updateStudent } from './studentApi.js';

// Fetch Courses
export const getCourses = async () => {
  try {
    const courseRes = await fetch(`${API_URL}/courses`);

    if (!courseRes.ok)
      throwErrorRes('Failed to fetch courses data. Please try again later.');

    const coursesData = await courseRes.json();

    return coursesData;
    //
  } catch (err) {
    console.error(err.message);
  }
};

// Fetch Course by id
export const getCourse = async (id) => {
  try {
    const courseRes = await fetch(`${API_URL}/courses/${id}`);

    if (!courseRes.ok)
      throwErrorRes('Failed to fetch course data. Please try again later.');

    const course = await courseRes.json();

    return course;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Fetch Courses with Instructor name
export const getCoursesWithInstructor = async () => {
  try {
    const [courses, instructors] = await Promise.all([
      getCourses(),
      getInstructors(),
    ]);

    const coursesWithInstructor = courses.map((crs) => ({
      ...crs,
      instructorName:
        instructors.find((ins) => ins.courseId === crs.id)?.name ||
        'Waiting for Instructor',
    }));

    return coursesWithInstructor;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Fetch Courses not available Instructor name
export const getCoursesWithoutInstructors = async () => {
  try {
    const [courses, instructors] = await Promise.all([
      getCourses(),
      getInstructors(),
    ]);

    const availableCourses = courses.filter((crs) => {
      const isAssigned = instructors.some((inst) => crs.id === inst.courseId);

      return !isAssigned;
    });

    return availableCourses;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Sort Course by (title, code, creditHours, description)
export const sortCourse = async (sortBy, order = 'asc') => {
  try {
    const res = await fetch(
      `${API_URL}/courses?_sort=${sortBy}&_order=${order}`,
    );
    if (!res.ok) throwErrorRes('Failed to sort courses data. ');

    const sortedCourses = await res.json();

    return sortedCourses;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Search Course by (title, code, creditHours, description)
export const searchCourses = async (query) => {
  try {
    const res = await fetch(`${API_URL}/courses?q=${query}`);
    if (!res.ok) throwErrorRes('Failed to sort courses data.');

    const searchedStudent = await res.json();

    return searchedStudent;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Create Course
export const createCourse = async (data) => {
  try {
    const courseId = generateId('crs');

    const newCourse = new Course(
      courseId,
      data.title,
      data.code.toUpperCase(),
      Number(data.creditHours),
      data.description,
    );

    const res = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse),
    });

    if (!res.ok) throwErrorRes('Failed to create course');

    return res.ok;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Update course
export const updateCourse = async (id, updatedCourse) => {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCourse),
    });

    if (!res.ok) throwErrorRes('Failed to update course');

    return res.ok;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Delete course
export const deleteCourse = async (id) => {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throwErrorRes('Failed to delete course');

    // delte courseId from student courses
    const students = await getStudents();

    const updatedPromises = students
      .filter((std) => std.courses.includes(id))
      .map((std) => {
        const updatedCourses = std.courses.filter((crs) => crs !== id);
        return updateStudent(std.id, { courses: updatedCourses });
      });

    if (res.ok) {
      await Promise.all(updatedPromises);
      await deleteEmployeeByCourseId(id);
    }

    return res.ok;

    //
  } catch (err) {
    console.error(err.message);
  }
};
