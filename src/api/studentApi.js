import { API_URL } from '../utils/constant.js';
import { getCourses } from './courseApi.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Fetch student
export const getStudents = async () => {
  try {
    const res = await fetch(`${API_URL}/students`);

    if (!res.ok)
      throw new Error('Failed to fetch students data. Please try again later.');

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

// Create student
export const createStudent = async (data) => {
  try {
    const stdId = `std-${uuidv4().substring(0, 8)}`;

    const newStudent = {
      id: stdId,
      ...data,
      courses: [data.courses],
    };

    const res = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent),
    });

    

    //
  } catch (err) {
    console.log(err.message);
  }
};
