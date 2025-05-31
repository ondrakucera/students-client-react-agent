import { useState, useEffect } from 'react';
import { codebooksApi } from '../api';

export function useCodebooks() {
  const [codebooks, setCodebooks] = useState({
    gender: [],
    house: [],
    year: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCodebooks() {
      try {
        setLoading(true);
        setError(null);

        const [genderItems, houseItems, yearItems] = await Promise.all([
          codebooksApi.getItems('gender'),
          codebooksApi.getItems('house'),
          codebooksApi.getItems('year'),
        ]);

        setCodebooks({
          gender: genderItems,
          house: houseItems,
          year: yearItems,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCodebooks();
  }, []);

  return { codebooks, loading, error };
} 