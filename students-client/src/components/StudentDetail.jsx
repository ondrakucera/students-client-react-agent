import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { studentsApi, getCodebookDisplayValue } from '../api';
import { useCodebooks } from '../hooks/useCodebooks';
import './StudentDetail.css';

export default function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { codebooks, loading: codebooksLoading } = useCodebooks();

  useEffect(() => {
    async function fetchStudent() {
      try {
        setLoading(true);
        setError(null);
        const data = await studentsApi.getById(id);
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchStudent();
    }
  }, [id]);

  if (loading || codebooksLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!student) {
    return <div className="alert alert-warning">Student not found</div>;
  }

  return (
    <div className="StudentDetail">
      <h1>Student detail</h1>
      <table className="table table-light table-bordered">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{student.firstName} {student.lastName}</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>{getCodebookDisplayValue(codebooks.gender, student.gender)}</td>
          </tr>
          <tr>
            <th>House</th>
            <td>{getCodebookDisplayValue(codebooks.house, student.house)}</td>
          </tr>
          <tr>
            <th>Year</th>
            <td>{getCodebookDisplayValue(codebooks.year, student.year)}</td>
          </tr>
        </tbody>
      </table>
      <nav>
        <Link to="/">Back to student list</Link>{' '}
        <Link to={`/students/${student.id}/edit`}>
          Edit {student.firstName} {student.lastName}
        </Link>
      </nav>
    </div>
  );
} 