import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { studentsApi } from '../api';
import { useCodebooks } from '../hooks/useCodebooks';
import CodebookSelect from './CodebookSelect';
import CodebookRadioButtons from './CodebookRadioButtons';

export default function StudentForm({ isEdit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { codebooks, loading: codebooksLoading, error: codebooksError } = useCodebooks();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    house: '',
    year: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id && !codebooksLoading) {
      fetchStudent();
    }
  }, [isEdit, id, codebooksLoading]);

  async function fetchStudent() {
    try {
      setInitialLoading(true);
      setError(null);
      const student = await studentsApi.getById(id);
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        gender: student.gender,
        house: student.house,
        year: student.year,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setInitialLoading(false);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      if (isEdit) {
        await studentsApi.update(id, formData);
      } else {
        await studentsApi.create(formData);
      }

      // Navigate back to student list on success
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading || codebooksLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (codebooksError) {
    return <div className="alert alert-danger">Error loading codebooks: {codebooksError}</div>;
  }

  return (
    <>
      <h1>{isEdit ? 'Edit student' : 'Create student'}</h1>
      <form onSubmit={handleSubmit}>
        <table className="table table-light table-bordered">
          <tbody>
            <tr>
              <th>
                <label htmlFor="firstName" className="form-label">First name</label>
              </th>
              <td>
                <input
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="lastName" className="form-label">Last name</label>
              </th>
              <td>
                <input
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>
                <CodebookRadioButtons
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  codebookItems={codebooks.gender}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="house" className="form-label">House</label>
              </th>
              <td>
                <CodebookSelect
                  id="house"
                  name="house"
                  value={formData.house}
                  onChange={handleInputChange}
                  codebookItems={codebooks.house}
                  showEmptyOption={!isEdit}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="year" className="form-label">Year</label>
              </th>
              <td>
                <CodebookSelect
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  codebookItems={codebooks.year}
                  showEmptyOption={!isEdit}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <nav>
        <Link to="/">Back to student list</Link>
      </nav>
    </>
  );
} 