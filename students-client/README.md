# Student Client React Application

A React-based student management application that provides CRUD operations for managing student records.

## Features

- **Student List**: View all students in a table format with sorting
- **Student Detail**: View detailed information about a specific student
- **Create Student**: Add new students with form validation
- **Edit Student**: Update existing student information
- **Delete Student**: Remove students with confirmation dialog

## Prerequisites

- Node.js (version 14 or higher)
- A running REST API server at `http://localhost:8080` (see `students-server-restapi-node` directory)

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

## API Integration

The application integrates with a REST API that provides:

- Student CRUD operations (`/students`)
- Codebook data for dropdowns (`/codebooks/{codebookCode}`)
  - Gender codebook (`/codebooks/gender`)
  - House codebook (`/codebooks/house`) 
  - Year codebook (`/codebooks/year`)

## Routing

- `/` - Student list page
- `/students/:id` - Student detail page
- `/students/:id/edit` - Edit student page
- `/students/create` - Create new student page

## Technologies Used

- React 19
- React Router DOM 7
- Bootstrap 5.3.5
- Vite (build tool)

## Project Structure

```
src/
├── components/
│   ├── StudentList.jsx     # Main student list view
│   ├── StudentDetail.jsx   # Student detail view
│   └── StudentForm.jsx     # Create/edit student form
├── hooks/
│   └── useCodebooks.js     # Custom hook for codebook data
├── api.js                  # API service functions
├── App.jsx                 # Main app with routing
└── main.jsx               # Application entry point
```
