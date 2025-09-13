import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-[65vw] h-[65vh]  mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg font-sans">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Employee Management System</h1>
      <p className="text-lg text-gray-700 mt-6 mb-6 text-center">Welcome to the Employee Management System!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* View Employees Card */}
        <div
          className="flex-1 bg-blue-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer"
          onClick={() => navigate(user ? '/employees' : '/login')}
        >
          <h3 className="text-xl font-bold text-blue-700 mb-2">View Employees</h3>
          <p className="text-gray-700 mb-4">Click here to see all employee details.</p>
          <p className="text-gray-700">Access the full employee list now.</p>
        </div>
        {/* Add Employee Card */}
        {user ? (
          <div
            className="flex-1 bg-green-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate('/add-employee')}
          >
            <h3 className="text-xl font-bold text-green-700 mb-2">Add Employee</h3>
            <p className="text-gray-700 mb-4">Add a new employee to the system.</p>
            <p className="text-gray-700">Start by entering their details.</p>
          </div>
        ) : (
          <div
            className="flex-1 bg-gray-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate('/login')}
          >
            <h3 className="text-xl font-bold text-gray-700 mb-2">Login to Add Employee</h3>
            <p className="text-gray-700 mb-4">Please log in to add employees.</p>
            <p className="text-gray-700">Access the add employee feature.</p>
          </div>
        )}
        {/* User Profile Card */}
        {user ? (
          <div
            className="flex-1 bg-purple-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            <h3 className="text-xl font-bold text-purple-700 mb-2">User Profile</h3>
            <p className="text-gray-700 mb-4">View your profile information.</p>
            <p className="text-gray-700">Manage your account details.</p>
          </div>
        ) : (
          <div
            className="flex-1 bg-gray-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate('/login')}
          >
            <h3 className="text-xl font-bold text-gray-700 mb-2">Login to View Profile</h3>
            <p className="text-gray-700 mb-4">Please log in to see your profile.</p>
            <p className="text-gray-700">Access your account details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;