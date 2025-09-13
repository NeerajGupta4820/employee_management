import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-[85vw] min-h-[65vh] mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg font-sans">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Employee Management System</h1>
      <p className="text-lg text-gray-700 mt-6 mb-8 text-center">Welcome to the Employee Management System! Manage your employees efficiently with our comprehensive dashboard.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Average Salary for Departments Card */}
        <div
          className="flex flex-col bg-yellow-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer h-full"
          onClick={() => navigate('/department-average-salary')}
        >
          <h3 className="text-xl font-bold text-yellow-700 mb-3">Department Salary Analytics</h3>
          <p className="text-gray-700 mb-4 flex-grow">
            View comprehensive salary statistics across all departments with visual charts and comparisons.
          </p>
          <p className="text-yellow-600 font-medium mt-auto">Click to explore department salary analytics</p>
        </div>

        {/* View Employees Card */}
        <div
          className="flex flex-col bg-blue-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer h-full"
          onClick={() => navigate(user ? '/employees' : '/login')}
        >
          <h3 className="text-xl font-bold text-blue-700 mb-3">Employee Directory</h3>
          <p className="text-gray-700 mb-4 flex-grow">
            Access the complete employee database with search, filter, and detailed view capabilities.
          </p>
          <p className="text-blue-600 font-medium mt-auto">
            {user ? 'Browse all employees' : 'Login to access directory'}
          </p>
        </div>

        {/* Add Employee Card */}
        {user ? (
          <div
            className="flex flex-col bg-green-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer h-full"
            onClick={() => navigate('/add-employee')}
          >
            <h3 className="text-xl font-bold text-green-700 mb-3">Add New Employee</h3>
            <p className="text-gray-700 mb-4 flex-grow">
              Create new employee records with detailed information including department, salary, and skills.
            </p>
            <p className="text-green-600 font-medium mt-auto">Create a new employee profile</p>
          </div>
        ) : (
          <div
            className="flex flex-col bg-gray-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer h-full"
            onClick={() => navigate('/login')}
          >
            <h3 className="text-xl font-bold text-gray-700 mb-3">Add New Employee</h3>
            <p className="text-gray-700 mb-4 flex-grow">
              Authentication required to add new employees to the management system.
            </p>
            <p className="text-gray-600 font-medium mt-auto">Login to access this feature</p>
          </div>
        )}

        {/* User Profile Card */}
        {user ? (
          <div
            className="flex flex-col bg-purple-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer h-full"
            onClick={() => navigate('/profile')}
          >
            <h3 className="text-xl font-bold text-purple-700 mb-3">User Profile</h3>
            <p className="text-gray-700 mb-4 flex-grow">
              Manage your account settings, update your preferences, and view your activity history.
            </p>
            <p className="text-purple-600 font-medium mt-auto">Manage your account</p>
          </div>
        ) : (
          <div
            className="flex flex-col bg-gray-50 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer h-full"
            onClick={() => navigate('/login')}
          >
            <h3 className="text-xl font-bold text-gray-700 mb-3">User Profile</h3>
            <p className="text-gray-700 mb-4 flex-grow">
              Login to access your personalized dashboard and user profile settings.
            </p>
            <p className="text-gray-600 font-medium mt-auto">Sign in to your account</p>
          </div>
        )}
      </div>

      {/* Additional information about the assessment requirements */}
      <div className="mt-10 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Python + MongoDB Assessment Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-blue-700">Core CRUD APIs</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>Create Employee with unique ID validation</li>
              <li>Get Employee by ID with 404 handling</li>
              <li>Update Employee with partial updates</li>
              <li>Delete Employee with success response</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-700">Querying & Aggregation</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>List employees by department</li>
              <li>Average salary by department aggregation</li>
              <li>Search employees by skill</li>
              <li>Pagination support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;