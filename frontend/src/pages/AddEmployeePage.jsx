import React, { useState } from 'react';
import { createEmployee } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaUser, FaBuilding, FaDollarSign, FaCalendarAlt, FaCode, FaPlus, FaExclamationTriangle } from 'react-icons/fa';

const AddEmployeePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
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
    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (formError) {
      setFormError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const payload = {
        ...form,
        salary: Number(form.salary),
        skills: form.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
      };
      
      await createEmployee(payload);
      navigate('/employees');
    } catch (err) {
      console.error('Error adding employee:', err);
      
      // Handle different types of errors
      if (err.response) {
        // Backend validation errors
        const errorData = err.response.data;
        
        if (err.response.status === 400 && errorData.detail === 'Employee ID already exists') {
          setFieldErrors({ employee_id: 'Employee ID already exists. Please use a different ID.' });
        } 
        else if (err.response.status === 422) {
          // Pydantic validation errors
          if (errorData.detail && typeof errorData.detail === 'string') {
            if (errorData.detail.includes('Pydantic parse error')) {
              // Extract field-specific errors from the message
              const errorMessage = errorData.detail;
              if (errorMessage.includes('employee_id')) {
                setFieldErrors({ employee_id: 'Invalid Employee ID format. Use only letters, numbers, underscores, and hyphens.' });
              } else if (errorMessage.includes('name')) {
                setFieldErrors({ name: 'Name can only contain letters, spaces, dots, and hyphens.' });
              } else if (errorMessage.includes('salary')) {
                setFieldErrors({ salary: 'Salary must be between 0 and 1,000,000.' });
              } else if (errorMessage.includes('joining_date')) {
                setFieldErrors({ joining_date: 'Joining date must be in YYYY-MM-DD format.' });
              } else if (errorMessage.includes('skills')) {
                setFieldErrors({ skills: 'Skills cannot be empty. Please enter at least one skill.' });
              } else {
                setFormError('Please check your input values. Some fields contain invalid data.');
              }
            } else {
              setFormError(errorData.detail);
            }
          } else if (Array.isArray(errorData.detail)) {
            // Handle array of validation errors
            const errors = {};
            errorData.detail.forEach(error => {
              const field = error.loc[error.loc.length - 1];
              errors[field] = error.msg;
            });
            setFieldErrors(errors);
          }
        } else {
          setFormError(errorData.detail || 'Failed to add employee. Please try again.');
        }
      } else if (err.request) {
        setFormError('Network error. Please check your connection and try again.');
      } else {
        setFormError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
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
      
      {formError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <FaExclamationTriangle className="text-red-500 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-800">Error</h3>
            <p className="text-red-600">{formError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaUser className="text-blue-600" /> Employee ID *
            </label>
            <input
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              className={`border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                fieldErrors.employee_id ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              placeholder="E.g., EMP123"
            />
            {fieldErrors.employee_id && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <FaExclamationTriangle className="text-xs" /> {fieldErrors.employee_id}
              </p>
            )}
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaUser className="text-blue-600" /> Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                fieldErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              placeholder="E.g., John Doe"
            />
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <FaExclamationTriangle className="text-xs" /> {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Department Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaBuilding className="text-blue-600" /> Department *
            </label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className={`border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                fieldErrors.department ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              placeholder="E.g., Engineering"
            />
            {fieldErrors.department && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <FaExclamationTriangle className="text-xs" /> {fieldErrors.department}
              </p>
            )}
          </div>

          {/* Salary Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaDollarSign className="text-blue-600" /> Salary *
            </label>
            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              className={`border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                fieldErrors.salary ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              placeholder="E.g., 75000"
              min="0"
              max="1000000"
              step="0.01"
            />
            {fieldErrors.salary && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <FaExclamationTriangle className="text-xs" /> {fieldErrors.salary}
              </p>
            )}
          </div>

          {/* Joining Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaCalendarAlt className="text-blue-600" /> Joining Date *
            </label>
            <input
              name="joining_date"
              type="date"
              value={form.joining_date}
              onChange={handleChange}
              className={`border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                fieldErrors.joining_date ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {fieldErrors.joining_date && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <FaExclamationTriangle className="text-xs" /> {fieldErrors.joining_date}
              </p>
            )}
          </div>

          {/* Skills Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FaCode className="text-blue-600" /> Skills (comma separated) *
            </label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className={`border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                fieldErrors.skills ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              placeholder="E.g., Python, MongoDB, APIs"
            />
            {fieldErrors.skills && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <FaExclamationTriangle className="text-xs" /> {fieldErrors.skills}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 justify-center w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          <FaPlus /> {loading ? 'Saving...' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
};

export default AddEmployeePage;