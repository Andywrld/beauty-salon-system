// src/hook/useFetch.js
import { useEffect, useState } from 'react';

// Cambia esto si tu servidor corre en otro host/puerto
const API_BASE = 'http://127.0.0.1:8000';

export const useFetch = (path) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const url = path.startsWith('http') ? path : `${API_BASE}${path}`;

        const response = await fetch(url);
        const jsonData = await response.json();
        if (!response.ok) {
          throw new Error(jsonData.detail || 'Error al obtener los datos');
        }

        // Si tu API es paginada y devuelve { results: [...] }, extrae results
        if (jsonData.results && Array.isArray(jsonData.results)) {
          setData(jsonData.results);
        } else {
          setData(jsonData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { data, isLoading, error };
};
