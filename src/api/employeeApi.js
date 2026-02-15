import { API_URL } from '../utils/constant.js';
import { generateId } from '../utils/helper.js';
import { getCourses } from './courseApi.js';

// Fetch Employees
export const getEmployees = async () => {
  try {
    const employeeRes = await fetch(`${API_URL}/employees`);

    if (!employeeRes.ok)
      throw new Error(
        'Failed to fetch employees data. Please try again later.',
      );

    const employeesData = await employeeRes.json();

    const courses = await getCourses();

    const employees = employeesData.map((emp) => {
      const course = courses.find((crs) => crs.id === emp.courseId);

      return { ...emp, courseName: course.title };
    });

    return employees;

    //
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch Instructor
export const getInstructors = async () => {
  try {
    const employees = await getEmployees();

    const instructors = employees.filter(
      (emp) => emp.role.toLowerCase() === 'instructor',
    );

    return instructors;
    //
  } catch (err) {
    console.error(err.message);
  }
};

// Create Course
export const createEmployee = async (data) => {
  try {
    const employeeId = generateId(data.role == 'employee' ? 'emp' : 'ins');

    const newEmployee = {
      id: employeeId,
      ...data,
    };

    const res = await fetch(`${API_URL}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee),
    });

    return await res.json();

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Update course
export const updateEmployee = async (id, updatedEmployee) => {
  try {
    const res = await fetch(`${API_URL}/employees/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEmployee),
    });

    return await res.json();

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Delete employee
export const deleteEmployee = async (id) => {
  try {
    const res = await fetch(`${API_URL}/employees/${id}`, {
      method: 'DELETE',
    });

    return await res.json();

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Delete employee by course id
export const deleteEmployeeByCourseId = async (courseId) => {
  try {
    const employees = await getEmployees();

    const instructor = employees.find((emp) => emp.courseId === courseId);

    const res = await fetch(`${API_URL}/employees/${instructor.id}`, {
      method: 'DELETE',
    });

    return await res.json();

    //
  } catch (err) {
    console.error(err.message);
  }
};
