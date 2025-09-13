import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
        {/* Left: Logo & Links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-blue-700">EM</span>
            <span className="font-semibold text-gray-700 hidden md:block">Employee Manager</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/employees"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/employees') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Employees
            </Link>
            <Link
              to="/department-average-salary"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/department-average-salary') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Department
            </Link>
            {user && (
              <Link
                to="/add-employee"
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Employee
              </Link>
            )}
          </div>
        </div>
        {/* Right: User Info & Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center space-x-2">
                <FaUserCircle className="text-blue-600 text-2xl" />
                <span className="text-sm text-gray-700 font-medium">{user.username}</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Mobile: Simple links */}
      <div className="md:hidden flex items-center justify-center space-x-2 py-2 border-t border-gray-100 bg-gray-50">
        <Link to="/" className={`px-2 py-1 rounded text-xs ${isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}>Dashboard</Link>
        <Link to="/employees" className={`px-2 py-1 rounded text-xs ${isActive('/employees') ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}>Employees</Link>
        {user && <Link to="/add-employee" className="px-2 py-1 rounded text-xs bg-blue-600 text-white">Add</Link>}
        <Link to={user ? "/profile" : "/login"} className="px-2 py-1 rounded text-xs bg-gray-200 text-gray-700">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;