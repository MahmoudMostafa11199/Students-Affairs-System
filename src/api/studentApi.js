import Student from '../models/Student.js';
import { API_URL } from '../utils/constant.js';
import { generateId, throwErrorRes } from '../utils/helper.js';
import { getCourses } from './courseApi.js';

// Fetch student
export const getStudents = async () => {
  try {
    const res = await fetch(`${API_URL}/students`);

    if (!res.ok)
      throwErrorRes('Failed to fetch students data. Please try again later.');

    const studentsData = await res.json();

    return studentsData;

    //
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch student
export const getStudentsWithCourseNames = async () => {
  try {
    const res = await fetch(`${API_URL}/students`);

    if (!res.ok)
      throwErrorRes('Failed to fetch students data. Please try again later.');

    const studentsData = await res.json();

    const courses = await getCourses();

    const students = studentsData.map((std) => {
      const courseNames = std.courses.map((courseId) => {
        const courseObj = courses.find((c) => c.id === courseId);

        return courseObj.title;
      });

      return { ...std, courses: courseNames };
    });

    return students;

    //
  } catch (err) {
    console.log(err.message);
  }
};

//
export const getStudentsPagination = async (page = 1, limit = 10) => {
  try {
    const res = await fetch(
      `${API_URL}/students?_page=${page}&_limit=${limit}`,
    );
    if (!res.ok) throwErrorRes('Failed to student pagination.');

    //
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};

// Sort student by (name, age, email, level)
export const sortStudents = async (sortBy, order = 'asc') => {
  try {
    const res = await fetch(
      `${API_URL}/students?_sort=${sortBy}&_order=${order}`,
    );
    if (!res.ok)
      throwErrorRes('Failed to sort students data. Please try again later.');

    const sortedStudent = await res.json();

    const courses = await getCourses();

    const students = sortedStudent.map((std) => ({
      ...std,
      courses: std.courses.map(
        (courseId) => courses.find((c) => c.id === courseId)?.title,
      ),
    }));

    return students;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Search student by (name, age, email, level)
export const searchStudents = async (query) => {
  try {
    const res = await fetch(`${API_URL}/students?q=${query}`);
    if (!res.ok)
      throwErrorRes('Failed to sort students data. Please try again later.');

    const searchedStudent = await res.json();

    const courses = await getCourses();

    const students = searchedStudent.map((std) => ({
      ...std,
      courses: std.courses.map(
        (courseId) => courses.find((c) => c.id === courseId)?.title,
      ),
    }));

    return students;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Create student
export const createStudent = async (data) => {
  try {
    const stdId = generateId('std');

    const newStudent = new Student(
      stdId,
      data.name,
      data.age,
      data.email,
      data.courses,
      data.level,
    );

    const res = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent),
    });

    if (!res.ok) throwErrorRes('Failed to create student');

    return res.ok;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Update student
export const updateStudent = async (id, updatedData) => {
  try {
    const res = await fetch(`${API_URL}/students/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throwErrorRes('Failed to update student');

    return res.ok();

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Delete student
export const deleteStudent = async (id) => {
  try {
    const res = await fetch(`${API_URL}/students/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throwErrorRes('Failed to delete student');

    return res.ok;

    //
  } catch (err) {
    console.error(err.message);
  }
};
