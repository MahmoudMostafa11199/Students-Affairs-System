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

## How to Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MahmoudMostafa11199/Students-Affairs-System.git
   ```

2. **Install Dependencies:**

   ```bash
   npm install json-server
   ```

3. **Start the API Server:**

   ```bash
   npx json-server --watch db.json
   ```

4. **Launch the App:**

   Open index.html in your browser (Live Server recommended so ES modules load correctly).
