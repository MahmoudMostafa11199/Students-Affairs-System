# Students Affairs System

The Students Affairs System is a lightweight web application designed to manage academic records for Students, Courses, Instructors, and Employees. Built for Student Affairs Staff , the system demonstrates modern JavaScript practices, including Object-Oriented Programming (OOP) and asynchronous data handling.

## Key features

- CRUD for Students, Courses, Employees
- Table views with sorting, searching and client-side pagination controls
- Uses `json-server` (dev) to serve `src/data/db.json`

## Folder structure

```
Students-Affairs-System/
├── .gitignore
├── index.html
├── package.json
├── README.md
├── src/
│   ├── api/
│   │   ├── courseApi.js
│   │   ├── employeeApi.js
│   │   └── studentApi.js
│   ├── components/
│   │   ├── BaseForm.js
│   │   ├── courseForm.js
│   │   ├── employeeForm.js
│   │   ├── modal.js
│   │   └── studentForm.js
│   ├── controllers/
│   │   ├── courseController.js
│   │   ├── employeeController.js
│   │   └── studentController.js
│   ├── data/
│   │   └── db.json
│   ├── imgs/
│   ├── models/
│   │   ├── Course.js
│   │   ├── Employee.js
│   │   ├── Person.js
│   │   └── Student.js
│   ├── pages/
│   │   ├── course.html
│   │   ├── employee.html
│   │   └── student.html
│   ├── styles/
│   │   ├── entities.css
│   │   └── globalStyle.css
│   ├── utils/
│   │   ├── constant.js
│   │   └── helper.js
│   └── view/
│       ├── CourseView.js
│       ├── EmployeeView.js
│       ├── StudentView.js
│       └── View.js
└── README.md

```

## Quick start

1. Serve the mock API using `json-server`:

```bash
npx json-server --watch src/data/db.json
```

2. Open a page in the browser, for example `src/pages/student.html` (use a static server or Live Server extension so ES modules load correctly).
