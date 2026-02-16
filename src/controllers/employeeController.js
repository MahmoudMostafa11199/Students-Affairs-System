import * as api from '../api/employeeApi.js';
import EmployeeView from '../view/EmployeeView.js';

const controlEmployees = async function () {
  try {
    const data = await api.getEmployees();

    EmployeeView.render(data);

    //
  } catch (err) {
    console.error('Controller Error 💥:', err);
  }
};

// Control Sort Employees
const controlSortEmployees = async function (sortBy, order) {
  try {
    const sortedEmployees = await api.sortEmployee(sortBy, order);

    return sortedEmployees;
    //
  } catch (err) {
    console.error('Controller Error 💥:', err.message);
  }
};

// Control Search Employees
const controlSearchEmployees = async function (query) {
  try {
    const searchedEmployees = await api.searchEmployee(query);

    return searchedEmployees;
    //
  } catch (err) {
    console.error('Controller Error 💥:', err.message);
  }
};

(() => {
  EmployeeView.addHandlerRender(controlEmployees);
  EmployeeView.sort(controlSortEmployees);
  EmployeeView.search(controlSearchEmployees);
})();
