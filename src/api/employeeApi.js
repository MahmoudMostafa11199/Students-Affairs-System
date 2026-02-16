import Employee from '../models/Employee.js';
import { API_URL } from '../utils/constant.js';
import { generateId, throwErrorRes } from '../utils/helper.js';
import { getCourses } from './courseApi.js';

// Fetch Employees
export const getEmployees = async () => {
  try {
    const employeeRes = await fetch(`${API_URL}/employees`);

    if (!employeeRes.ok)
      throwErrorRes('Failed to fetch employees data. Please try again later.');

    const employeesData = await employeeRes.json();

    const courses = await getCourses();

    const employees = employeesData.map((emp) => ({
      ...emp,
      courseName:
        courses.find((crs) => crs.id === emp.courseId)?.title || '...',
    }));

    return employees;

    //
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch Instructor
export const getInstructors = async () => {
  try {
    const res = await fetch(`${API_URL}/employees?role=instructor`);

    if (!res.ok) throwErrorRes('Failed to fetch instructors.');

    const instructors = await res.json();

    return instructors;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Sort employee by (name, email, role, experience)
export const sortEmployee = async (sortBy, order = 'asc') => {
  try {
    const res = await fetch(
      `${API_URL}/employees?_sort=${sortBy}&_order=${order}`,
    );
    if (!res.ok) throwErrorRes('Failed to sort employees data.');

    const sortedEmployees = await res.json();

    const courses = await getCourses();

    const employees = sortedEmployees.map((emp) => ({
      ...emp,
      courseName:
        courses.find((crs) => crs.id === emp.courseId)?.title || '...',
    }));

    return employees;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Search employee by (id, name, email, role, courseId, experience)
export const searchEmployee = async (query) => {
  try {
    const res = await fetch(`${API_URL}/employees?q=${query}`);
    if (!res.ok) throwErrorRes('Failed to sort employees data.');

    const searchedEmployees = await res.json();

    const courses = await getCourses();

    const employees = searchedEmployees.map((emp) => ({
      ...emp,
      courseName:
        courses.find((crs) => crs.id === emp.courseId)?.title || '...',
    }));

    return employees;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Create employee
export const createEmployee = async (data) => {
  try {
    const employeeId = generateId(data.role == 'employee' ? 'emp' : 'ins');

    const newEmployee = new Employee(
      employeeId,
      data.name,
      data.email,
      data.role,
      data.experience,
      data.courseId,
    );

    const res = await fetch(`${API_URL}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee),
    });

    if (!res.ok) throwErrorRes('Failed to create employee.');

    return res.ok;

    //
  } catch (err) {
    console.error(err.message);
  }
};

// Update employee
export const updateEmployee = async (id, updatedEmployee) => {
  try {
    const res = await fetch(`${API_URL}/employees/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEmployee),
    });

    if (!res.ok) throwErrorRes('Failed to update employee.');

    return res.ok;

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

    if (!res.ok) throwErrorRes('Failed to delete employee.');

    return res.ok;

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

    if (!res.ok) throwErrorRes('Failed to delete employee.');

    return res.ok;

    //
  } catch (err) {
    console.error(err.message);
  }
};
