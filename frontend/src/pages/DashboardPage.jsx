import React from 'react';

import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg font-sans">
      <h1 className="text-3xl font-extrabold mb-4 text-blue-700">Employee Management System</h1>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Add Employee Card */}
        <div className="flex-1 bg-blue-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer" onClick={() => window.location.href = user ? '/add-employee' : '/login'}>
          <h3 className="text-xl font-bold text-blue-700 mb-2">Add Employee</h3>
          <p className="text-gray-700 mb-4">Quickly add a new employee to the system.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition">Add Employee</button>
        </div>
        {/* User Profile Section */}
        <div className="flex-1 bg-green-50 rounded-lg p-6 shadow">
          <h3 className="text-xl font-bold text-green-700 mb-2">User Profile</h3>
          {user ? (
            <div>
              <div className="mb-2"><span className="font-semibold">Username:</span> {user.username || 'N/A'}</div>
              <div className="mb-2"><span className="font-semibold">Email:</span> {user.email || 'N/A'}</div>
              <Link to="/profile" className="text-blue-600 hover:underline">View Profile</Link>
            </div>
          ) : (
            <div>
              <p className="mb-2">Please <Link to="/login" className="text-blue-600 hover:underline">login</Link> to view your profile.</p>
            </div>
          )}
        </div>
      </div>
      {/* Employee Details Section (Sample UI) */}
      <div className="bg-gray-50 rounded-lg p-6 shadow mb-4">
        <h3 className="text-xl font-bold text-gray-700 mb-2">Employee Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">Employee ID:</span> E123
          </div>
          <div>
            <span className="font-semibold">Name:</span> John Doe
          </div>
          <div>
            <span className="font-semibold">Department:</span> Engineering
          </div>
          <div>
            <span className="font-semibold">Salary:</span> $75,000
          </div>
          <div>
            <span className="font-semibold">Joining Date:</span> 2023-01-15
          </div>
          <div>
            <span className="font-semibold">Skills:</span> Python, MongoDB, APIs
          </div>
        </div>
      </div>
      <p className="text-lg text-gray-700 mt-6">Welcome to the Employee Management System!</p>
    </div>
  );
};

export default DashboardPage;
