import React, { useState, useMemo } from 'react';
import { FaEye, FaEdit, FaTrash, FaSearch, FaFrown, FaSync, FaFilter } from 'react-icons/fa';
import Pagination from '../components/common/Pagination';
import useEmployees from '../hooks/useEmployees';
import EmployeeDetailModal from '../components/employees/EmployeeDetailModal';
import EmployeeEditModal from '../components/employees/EmployeeEditModal';
import { deleteEmployee } from '../services/employeeService';

const EmployeeListPage = () => {
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const { employees: allEmployees, loading, error, refetch } = useEmployees(filters, page);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Filter employees based on search input AND department filter
  const filteredEmployees = useMemo(() => {
    let result = allEmployees;
    
    // Apply department filter first
    if (filters.department) {
      result = result.filter(emp => 
        emp.department?.toLowerCase() === filters.department.toLowerCase()
      );
    }
    
    // Then apply search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      result = result.filter(emp => 
        emp.name?.toLowerCase().includes(searchTerm) ||
        emp.department?.toLowerCase().includes(searchTerm) ||
        (emp.skills && emp.skills.some(skill => skill.toLowerCase().includes(searchTerm))) ||
        emp.employee_id?.toLowerCase().includes(searchTerm) ||
        emp.salary?.toString().includes(searchTerm)
      );
    }
    
    return result;
  }, [allEmployees, search, filters.department]);

  // Fetch total employees for pagination
  React.useEffect(() => {
    const fetchTotal = async () => {
      try {
        let res;
        if (Object.keys(filters).length === 0) {
          res = await import('../services/employeeService').then(mod => mod.getAllEmployees({ skip: 0, limit: 10000 }));
        } else {
          res = await import('../services/employeeService').then(mod => mod.getEmployees({ ...filters, skip: 0, limit: 10000 }));
        }
        setTotalEmployees(Array.isArray(res) ? res.length : 0);
      } catch (err) {
        setTotalEmployees(0);
      }
    };
    fetchTotal();
  }, [filters, allEmployees]);

  const handleView = (emp) => {
    setSelectedEmployee(emp);
    setViewModalOpen(true);
  };

  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setEditModalOpen(true);
  };

  const handleDelete = async (emp) => {
    if (window.confirm(`Are you sure you want to delete ${emp.name}?`)) {
      try {
        await deleteEmployee(emp.employee_id);
        alert('Employee deleted successfully!');
        refetch(); // Refresh the list
      } catch (error) {
        alert('Error deleting employee: ' + (error?.response?.data?.detail || error?.message));
      }
    }
  };

  const handleUpdateSuccess = () => {
    refetch(); // Refresh the list after update
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const closeModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setSelectedEmployee(null);
  };

  const clearFilters = () => {
    setFilters({});
    setSearch('');
    setPage(1);
  };

  // Calculate total pages based on filtered employees
  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / 10));

  // Paginate filtered employees
  const paginatedEmployees = useMemo(() => {
    const startIndex = (page - 1) * 10;
    return filteredEmployees.slice(startIndex, startIndex + 10);
  }, [filteredEmployees, page]);

  return (
    <div className="w-[85vw] mx-auto mt-10 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 flex items-center">
          All Employees
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="ml-3 text-blue-500 hover:text-blue-700 transition-all"
          >
            <FaSync className={isRefreshing ? "animate-spin" : ""} />
          </button>
        </h2>
      </div>
      
      {/* Search and Filter Section */}
      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <FaFilter className="text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-blue-800">Search & Filter</h3>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, skill, department, salary, employee ID..."
              className="border border-gray-300 rounded-lg px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Department filter dropdown */}
          <div className="flex flex-col">
            <select
              value={filters.department || ''}
              onChange={e => {
                setFilters(f => ({ ...f, department: e.target.value }));
                setPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
            >
              <option value="">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
          
          {/* Clear Filters Button */}
          {(search || filters.department) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors self-end md:self-center"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
      
      {/* Active Filters Info */}
      {(search || filters.department) && (
        <div className="mb-4 p-3 bg-gray-100 rounded-lg flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Active filters:</span>
          
          {search && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
              Search: "{search}"
              <button 
                onClick={() => setSearch('')}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          
          {filters.department && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
              Department: {filters.department}
              <button 
                onClick={() => setFilters(f => ({ ...f, department: '' }))}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
      
      {/* Results Count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {paginatedEmployees.length} of {filteredEmployees.length} employees
          {filteredEmployees.length !== allEmployees.length && ` (filtered from ${allEmployees.length} total)`}
        </p>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center my-12">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-t-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-blue-700 font-medium">Loading employees...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error loading employees. Please try again.</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        {/* Desktop: Table View */}
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-50 text-blue-700">
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Employee ID</th>
                <th className="py-3 px-4 text-left font-semibold">Salary</th>
                <th className="py-3 px-4 text-left font-semibold">Department</th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && paginatedEmployees.length > 0 ? (
                paginatedEmployees.map(emp => (
                  <tr key={emp.employee_id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium">{emp.name}</td>
                    <td className="py-3 px-4 text-gray-600">{emp.employee_id}</td>
                    <td className="py-3 px-4">Rs. {emp.salary?.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(emp)}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                          title="View"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(emp)}
                          className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-100 transition-colors"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(emp)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                !loading && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FaSearch size={48} className="mb-4 opacity-50" />
                        <FaFrown size={32} className="mb-3 text-gray-300" />
                        <p className="text-xl font-medium text-gray-500 mt-2">No employees found</p>
                        <p className="text-gray-400 mt-1">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card View */}
        <div className="block md:hidden space-y-4">
          {!loading && paginatedEmployees.length > 0 ? (
            paginatedEmployees.map(emp => (
              <div key={emp.employee_id} className="bg-white p-4 rounded-lg shadow border border-gray-100 transition-shadow hover:shadow-md">
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{emp.name}</h3>
                      <p className="text-sm text-gray-600">{emp.employee_id}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {emp.department}
                    </span>
                  </div>
                  <div><span className="font-medium">Salary:</span> Rs. {emp.salary?.toLocaleString()}</div>
                  {emp.skills && emp.skills.length > 0 && (
                    <div>
                      <span className="font-medium">Skills:</span> 
                      <div className="flex flex-wrap gap-1 mt-1">
                        {emp.skills.map(skill => (
                          <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end space-x-2 pt-2">
                    <button 
                      onClick={() => handleView(emp)} 
                      className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-100"
                      title="View"
                    >
                      <FaEye size={16} />
                    </button>
                    <button 
                      onClick={() => handleEdit(emp)} 
                      className="text-green-600 hover:text-green-800 transition-colors p-2 rounded-lg hover:bg-green-100"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(emp)} 
                      className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-100"
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <FaSearch size={48} className="mb-4 opacity-50" />
                  <FaFrown size={32} className="mb-3 text-gray-300" />
                  <p className="text-xl font-medium text-gray-500 mt-2">No employees found</p>
                  <p className="text-gray-400 mt-1">Try adjusting your search or filter</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {!loading && paginatedEmployees.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}

      {/* Modals */}
      {viewModalOpen && (
        <EmployeeDetailModal 
          employee={selectedEmployee} 
          onClose={closeModals} 
        />
      )}
      
      {editModalOpen && (
        <EmployeeEditModal 
          employee={selectedEmployee} 
          onClose={closeModals}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default EmployeeListPage;