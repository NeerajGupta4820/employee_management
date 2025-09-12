import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { createEmployee } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { handleApiError } from '../utils/helpers';

const AddEmployeePage = () => {
  const { user } = useAuth();
  const { loading, error, request } = useApi(createEmployee);
  const [formError, setFormError] = useState(null);
  const [form, setForm] = useState({
    employee_id: '',
    name: '',
    department: '',
    salary: '',
    joining_date: '',
    skills: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      const payload = {
        ...form,
        salary: Number(form.salary),
        skills: form.skills.split(',').map(s => s.trim()),
      };
      await request(payload);
      navigate('/employees');
    } catch (err) {
      setFormError(handleApiError(err));
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg font-sans">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Employee ID</label>
          <input name="employee_id" value={form.employee_id} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Department</label>
          <input name="department" value={form.department} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Salary</label>
          <input name="salary" type="number" value={form.salary} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Joining Date</label>
          <input name="joining_date" type="date" value={form.joining_date} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Skills (comma separated)</label>
          <input name="skills" value={form.skills} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Saving...' : 'Add Employee'}
        </button>
        {formError && <div className="text-red-500 mt-2">{formError}</div>}
      </form>
    </div>
  );
};

export default AddEmployeePage;
