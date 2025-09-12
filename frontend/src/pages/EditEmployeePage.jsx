import React, { useEffect, useState } from 'react';
import EmployeeForm from '../components/employees/EmployeeForm';
import useApi from '../hooks/useApi';
import { getEmployee, updateEmployee } from '../services/employeeService';
import { useParams, useNavigate } from 'react-router-dom';
import { handleApiError } from '../utils/helpers';

const EditEmployeePage = () => {
  const { id } = useParams();
  const { loading, error, request } = useApi(updateEmployee);
  const [formError, setFormError] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployee(id)
      .then(setInitialData)
      .catch(() => setFormError('Error loading employee.'));
  }, [id]);

  const handleSubmit = async (form) => {
    setFormError(null);
    try {
      await request(id, form);
      navigate('/employees');
    } catch (err) {
      setFormError(handleApiError(err));
    }
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
      <EmployeeForm initialData={initialData} onSubmit={handleSubmit} loading={loading} />
      {formError && <div className="text-red-500 mt-2">{formError}</div>}
    </div>
  );
};

export default EditEmployeePage;
