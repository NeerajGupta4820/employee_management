import { useState, useEffect } from 'react';
import { getEmployees, getAllEmployees } from '../services/employeeService';

const useEmployees = (filters, page) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      let data;
      
      if (Object.keys(filters).length === 0) {
        data = await getAllEmployees({ skip: (page - 1) * 10, limit: 10 });
      } else {
        data = await getEmployees({ ...filters, skip: (page - 1) * 10, limit: 10 });
      }
      
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [filters, page]);

  return { employees, loading, error, refetch: fetchEmployees };
};

export default useEmployees;