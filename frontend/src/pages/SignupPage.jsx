import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { register as registerApi } from '../services/authService';
import { handleApiError } from '../utils/helpers';

const SignupPage = () => {
  const { loading, error, request } = useApi(registerApi);
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.username || form.username.length < 3) errs.username = 'Username is required.';
    if (!form.email.includes('@')) errs.email = 'Invalid email.';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);
    if (!validate()) return;
    try {
      await request(form);
      setSuccess(true);
    } catch (err) {
      setFormError(handleApiError(err));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 p-8 bg-white shadow-lg rounded-lg font-sans">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Sign Up</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block">Username</label>
          <input name="username" value={form.username} onChange={handleChange} className="border p-2 w-full" />
          {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
        </div>
        <div>
          <label className="block">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="border p-2 w-full" />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>
        <div>
          <label className="block">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="border p-2 w-full" />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {formError && <div className="text-red-500 mt-2 font-medium">{formError}</div>}
      {success && <div className="text-green-500 mt-2 font-medium">Registration successful! You can now log in.</div>}
    </div>
  );
};

export default SignupPage;
