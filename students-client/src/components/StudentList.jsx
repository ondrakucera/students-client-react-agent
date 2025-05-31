import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentsApi, getCodebookDisplayValue } from '../api';
import { useCodebooks } from '../hooks/useCodebooks';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { codebooks, loading: codebooksLoading } = useCodebooks();

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      setLoading(true);
      setError(null);
      const data = await studentsApi.getAll();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(studentId, studentName) {
    if (window.confirm(`Are you sure you want to delete ${studentName}?`)) {
      try {
        await studentsApi.delete(studentId);
        // Refresh the list after successful deletion
        await fetchStudents();
      } catch (err) {
        alert(`Failed to delete student: ${err.message}`);
      }
    }
  }

  if (loading || codebooksLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <>
      <h1>List of students</h1>
      <table className="table table-light table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>House</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
              </td>
              <td>{getCodebookDisplayValue(codebooks.gender, student.gender)}</td>
              <td>{getCodebookDisplayValue(codebooks.house, student.house)}</td>
              <td>{getCodebookDisplayValue(codebooks.year, student.year)}</td>
              <td>
                <Link to={`/students/${student.id}/edit`}>Edit</Link>{' '}
                <button
                  type="button"
                  className="btn btn-danger student-delete"
                  onClick={() => handleDelete(student.id, `${student.firstName} ${student.lastName}`)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <Link to="/students/create">Create new student</Link>
      </nav>
    </>
  );
} 