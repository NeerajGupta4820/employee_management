import React, { useState } from 'react';
import { validateRequired } from '../../utils/validators';

const EmployeeForm = ({ initialData = {}, onSubmit, loading }) => {
  const [form, setForm] = useState({
    name: initialData.name || '',
    department: initialData.department || '',
    skills: initialData.skills || [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    setForm((prev) => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()) }));
  };

  const validate = () => {
    const errs = {};
    if (!validateRequired(form.name)) errs.name = 'Name is required.';
    if (!validateRequired(form.department)) errs.department = 'Department is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      </div>
      <div>
        <label className="block">Department</label>
        <input name="department" value={form.department} onChange={handleChange} className="border p-2 w-full" />
        {errors.department && <span className="text-red-500 text-sm">{errors.department}</span>}
      </div>
      <div>
        <label className="block">Skills (comma separated)</label>
        <input name="skills" value={form.skills.join(', ')} onChange={handleSkillsChange} className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default EmployeeForm;
