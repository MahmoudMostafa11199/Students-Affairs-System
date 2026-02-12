import { API_URL } from '../utils/constant.js';
import { getCourses } from './courseApi.js';

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
