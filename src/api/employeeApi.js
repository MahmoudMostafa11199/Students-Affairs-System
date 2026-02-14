import { API_URL } from '../utils/constant.js';
import { generateId } from '../utils/helper.js';
import { getCourse } from './courseApi.js';

// Fetch Employees
export const getEmployees = async () => {
  try {
    const employeeRes = await fetch(`${API_URL}/employees`);

    if (!employeeRes.ok)
      throw new Error(
        'Failed to fetch employees data. Please try again later.',
      );

    const employeesData = await employeeRes.json();

    return employeesData;

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
