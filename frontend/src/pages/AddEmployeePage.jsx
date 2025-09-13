import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { createEmployee } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { handleApiError } from '../utils/helpers';
import { FaUser, FaBuilding, FaDollarSign, FaCalendarAlt, FaCode, FaPlus } from 'react-icons/fa';

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
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-2xl font-sans">
      <h2 className="text-3xl font-bold mb-8 text-blue-800 flex items-center gap-2">
        <FaUser /> Add New Employee
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaUser className="text-blue-600" /> Employee ID
            </label>
            <input
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaUser className="text-blue-600" /> Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaBuilding className="text-blue-600" /> Department
            </label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaDollarSign className="text-blue-600" /> Salary
            </label>
            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaCalendarAlt className="text-blue-600" /> Joining Date
            </label>
            <input
              name="joining_date"
              type="date"
              value={form.joining_date}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaCode className="text-blue-600" /> Skills (comma separated)
            </label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 justify-center w-full md:w-auto"
          disabled={loading}
        >
          <FaPlus /> {loading ? 'Saving...' : 'Add Employee'}
        </button>
        {formError && <div className="text-red-600 mt-4 text-center">{formError}</div>}
      </form>
    </div>
  );
};

export default AddEmployeePage;