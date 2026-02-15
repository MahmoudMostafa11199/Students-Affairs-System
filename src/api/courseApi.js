import { API_URL } from "../utils/constant.js";
import { generateId } from "../utils/helper.js";
import { getInstructors } from "./employeeApi.js";

// Fetch Courses
export const getCourses = async () => {
  try {
    const courseRes = await fetch(`${API_URL}/courses`);

    if (!courseRes.ok)
      throw new Error("Failed to fetch courses data. Please try again later.");

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
      throw new Error("Failed to fetch course data. Please try again later.");

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
    const courses = await getCourses();
    const instructors = await getInstructors();

    const coursesWithInstructor = courses.map((crs) => {
      const instructor = instructors.find((inst) => {
        return crs.id === inst.courseId;
      });

      return {
        ...crs,
        instructorName: instructor ? instructor.name : "Waiting for Instructor",
      };
    });

    return coursesWithInstructor;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Create Course
export const createCourse = async (data) => {
  try {
    const courseId = generateId("crs");

    const newCourse = {
      id: courseId,
      title: data.title,
      code: data.code.toUpperCase(),
      creditHours: Number(data.creditHours),
      description: data.description,
    };

    const res = await fetch(`${API_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    });

    return await res.json();

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Update course
export const updateCourse = async (id, updatedCourse) => {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCourse),
    });

    return await res.json();

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Delete course
export const deleteCourse = async (id) => {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, { method: "DELETE" });

    if (res.ok) await deleteEmployeeByCourseId(id);

    return await res.json();

    //
  } catch (err) {
    console.error(err.message);
  }
};
