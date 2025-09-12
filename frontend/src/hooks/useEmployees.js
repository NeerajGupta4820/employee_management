import { useState, useEffect } from 'react';
import { getEmployees, getAllEmployees } from '../services/employeeService'; // Named imports

const useEmployees = (filters, page) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Filters:", filters, "Page:", page);
    setLoading(true);
    
    // Agar koi filter nahi hai to saari employees get karo
    if (Object.keys(filters).length === 0) {
      getAllEmployees({ skip: (page - 1) * 10, limit: 10 }) // Direct function call
        .then((data) => {
          console.log("All employees data:", data);
          setEmployees(data);
        })
        .catch((err) => {
          console.error("Error fetching all employees:", err);
          setError(err);
        })
        .finally(() => setLoading(false));
    } else {
      // Agar filter hai to normal API use karo
      getEmployees({ ...filters, skip: (page - 1) * 10, limit: 10 }) // Direct function call
        .then((data) => {
          console.log("Filtered employees data:", data);
          setEmployees(data);
        })
        .catch((err) => {
          console.error("Error fetching filtered employees:", err);
          setError(err);
        })
        .finally(() => setLoading(false));
    }
  }, [filters, page]);

  return { employees, loading, error };
};

export default useEmployees;