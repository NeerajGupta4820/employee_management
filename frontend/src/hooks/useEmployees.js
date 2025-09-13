import { useState, useEffect } from 'react';
import { getEmployees, getAllEmployees } from '../services/employeeService';

const useEmployees = (filters, page, itemsPerPage = 10) => {
  const [employees, setEmployees] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      // Always use /employees endpoint for paginated, filtered, searched data
      const data = await getEmployees({ ...filters, skip: (page - 1) * itemsPerPage, limit: itemsPerPage });
      setEmployees(data.employees || []);
      setTotal(data.total || 0);
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
  }, [filters, page, itemsPerPage]);

  return { employees, total, loading, error, refetch: fetchEmployees };
};

export default useEmployees;