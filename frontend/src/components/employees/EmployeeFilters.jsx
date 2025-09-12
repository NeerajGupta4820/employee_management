import React from 'react';

const EmployeeFilters = ({ filters, onChange }) => (
  <div className="flex space-x-4 mb-4">
    <input
      type="text"
      placeholder="Search by name..."
      value={filters.name || ''}
      onChange={e => onChange({ ...filters, name: e.target.value })}
      className="border p-2 rounded"
    />
    <input
      type="text"
      placeholder="Department..."
      value={filters.department || ''}
      onChange={e => onChange({ ...filters, department: e.target.value })}
      className="border p-2 rounded"
    />
    <input
      type="text"
      placeholder="Skills..."
      value={filters.skills || ''}
      onChange={e => onChange({ ...filters, skills: e.target.value })}
      className="border p-2 rounded"
    />
  </div>
);

export default EmployeeFilters;
