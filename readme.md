# Students Affairs System

The Students Affairs System is a lightweight web application designed to manage academic records for Students, Courses, Instructors, and Employees. Built for Student Affairs Staff , the system demonstrates modern JavaScript practices, including Object-Oriented Programming (OOP) and asynchronous data handling.

## Key Features

- Full CRUD Operations: Create, Read, Update, and Delete records for all entities.
- Interactive Data Grid: A table view that displays data dynamically with sorting and searching capabilities.
- Server-side Pagination: Efficient data loading using \_page and \_limit parameters via json-server.
- Live Search: Instant record filtering using keyword queries.
- Column Sorting: Capability to sort data by specific headers in ascending or descending order.

## Folder structure

```

STUDENTS-AFFAIRS-SYSTEM/
├── src/
│   ├── api/                # Data fetching logic using Fetch API
│   │   ├── studentApi.js   # API calls for Student records
│   │   ├── courseApi.js    # API calls for Course records
│   │   ├── instructorApi.js# API calls for Instructor records
│   │   └── employeeApi.js  # API calls for Employee records
│   │
│   ├── models/             # OOP Classes representing entities
│   │   ├── Person.js       # Base class for shared properties
│   │   ├── Student.js      # Student class inheriting from Person
│   │   ├── Instructor.js   # Instructor class
│   │   ├── Employee.js     # Employee class
│   │   └── Course.js       # Course entity class
│   │
│   ├── components/         # UI Logic and reusable components
│   │   ├── TableRenderer.js# Dynamically building the Data Grid
│   │   ├── Pagination.js   # Logic for page switching (Next/Prev)
│   │   └── Search.js       # Search and filtering functionality
│   │
│   ├── pages/              # HTML templates for different views
│   └── styles/             # CSS files for layout and styling
│
├── data/
│   └── db.json             # Mock database for json-server
│
├── index.html              # Main application entry point
└── README.md               # Project documentation

```
