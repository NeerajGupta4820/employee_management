import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-xl border-b border-blue-800 px-6 py-3 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-8">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 shadow-md">
              <span className="font-bold text-blue-700 text-lg">EM</span>
            </div>
            <span className="font-bold text-xl text-white hidden md:block">
              Employee Manager
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-white text-blue-700 shadow-md' 
                  : 'text-blue-100 hover:text-white hover:bg-blue-600/30'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/employees" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/employees') 
                  ? 'bg-white text-blue-700 shadow-md' 
                  : 'text-blue-100 hover:text-white hover:bg-blue-600/30'
              }`}
            >
              Employees
            </Link>
            {user && (
              <Link 
                to="/add-employee" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-green-600 text-white hover:bg-green-700 shadow-md`}
              >
                Add Employee
              </Link>
            )}
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              {/* User Welcome */}
              <Link to={user ? "/profile" : "/login"} className="hidden md:flex items-center space-x-3 bg-blue-800/40 rounded-full pl-2 pr-4 py-1 cursor-pointer hover:bg-blue-900/60">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-blue-700 text-sm font-bold">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="text-sm text-white underline hover:text-blue-200">
                  Hello, {user.username}
                </span>
              </Link>

              {/* Logout Button */}
              <button 
                onClick={logout} 
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 border border-white/20 hover:border-white/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Sign Up Free</span>
              </Link>
              <Link 
                to="/login" 
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 border border-white/20 hover:border-white/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-center space-x-3 mt-4 pb-2">
        <Link 
          to="/" 
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            isActive('/') 
              ? 'bg-white text-blue-700 shadow-sm' 
              : 'text-blue-100 hover:text-white hover:bg-blue-600/30'
          }`}
        >
          Dashboard
        </Link>
        <Link 
          to="/employees" 
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            isActive('/employees') 
              ? 'bg-white text-blue-700 shadow-sm' 
              : 'text-blue-100 hover:text-white hover:bg-blue-600/30'
          }`}
        >
          Employees
        </Link>
        {user && (
          <Link 
            to="/add-employee" 
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-green-600 text-white hover:bg-green-700 shadow-sm"
          >
            Add Employee
          </Link>
        )}
        <Link 
          to={user ? "/profile" : "/login"} 
          className="px-3 py-1.5 rounded-md text-xs font-medium bg-blue-800 text-white hover:bg-blue-900 shadow-sm"
        >
          Hello
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;