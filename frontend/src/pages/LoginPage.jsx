import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { login as loginApi } from '../services/authService';
import useAuth from '../hooks/useAuth';
import { handleApiError } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const { loading, error, request } = useApi(loginApi);
  const [formError, setFormError] = useState(null);
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.username || form.username.length < 3) errs.username = 'Username is required and must be at least 3 characters.';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    console.log('Form submitted with:', form);
    if (!validate()) {
      console.log('Validation failed:', errors);
      return;
    }
    try {
      console.log('Calling API with username:', form.username, 'password:', form.password);
      const data = await request(form.username, form.password);
      console.log('API response:', data);
      login(data.user, data.access_token);
      console.log('Logged in, navigating to /');
      navigate('/');
    } catch (err) {
      console.log('API error:', err);
      setFormError(handleApiError(err));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 p-8 bg-white shadow-lg rounded-lg font-sans">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold transition w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {formError && <div className="text-red-500 mt-2">{formError}</div>}
        {error && <div className="text-red-500 mt-2">{error.message}</div>}
      </form>
    </div>
  );
};

export default LoginPage;