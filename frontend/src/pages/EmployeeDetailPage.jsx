import React, { useEffect, useState } from 'react';
import { getEmployee } from '../services/employeeService';
import { useParams } from 'react-router-dom';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEmployee(id)
      .then(setEmployee)
      .catch(() => setError('Error loading employee.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!employee) return <div>No employee found.</div>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{employee.name}</h2>
      <p className="mb-2">Department: {employee.department}</p>
      <p>Skills: {employee.skills?.join(', ')}</p>
    </div>
  );
};

export default EmployeeDetailPage;
