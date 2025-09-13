import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaSearch, FaFrown, FaSync } from 'react-icons/fa';
import EmployeeFilters from '../components/employees/EmployeeFilters';
import Pagination from '../components/common/Pagination';
import useEmployees from '../hooks/useEmployees';
import EmployeeDetailModal from '../components/employees/EmployeeDetailModal';
import EmployeeEditModal from '../components/employees/EmployeeEditModal';
import { deleteEmployee } from '../services/employeeService';

const EmployeeListPage = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const { employees, loading, error, refetch } = useEmployees(filters, page);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Fetch total employees for pagination
  React.useEffect(() => {
    const fetchTotal = async () => {
      try {
        // Get all employees count (filtered or not)
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
  }, [filters, employees]);

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

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalEmployees / 10));

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
      
      <EmployeeFilters filters={filters} onChange={setFilters} />
      
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
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-blue-50 text-blue-700">
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Salary</th>
                <th className="py-3 px-4 text-left font-semibold">Department</th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(employees) && employees.length > 0 ? (
                employees.map(emp => (
                  <tr key={emp.employee_id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium">{emp.name}</td>
                    <td className="py-3 px-4">Rs. {emp.salary.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleView(emp)}
                          className="text-blue-600 hover:text-blue-800 p-1 transition-colors"
                          title="View"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(emp)}
                          className="text-green-600 hover:text-green-800 p-1 transition-colors"
                          title="Edit"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(emp)}
                          className="text-red-600 hover:text-red-800 p-1 transition-colors"
                          title="Delete"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                !loading && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center">
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
          {Array.isArray(employees) && employees.length > 0 ? (
            employees.map(emp => (
              <div key={emp.employee_id} className="bg-white p-4 rounded-lg shadow border border-gray-100 transition-shadow hover:shadow-md">
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{emp.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {emp.department}
                    </span>
                  </div>
                  <div><span className="font-medium">Salary:</span> Rs. {emp.salary.toLocaleString()}</div>
                  <div className="flex justify-end space-x-4 pt-2">
                    <button 
                      onClick={() => handleView(emp)} 
                      className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-full hover:bg-blue-50"
                      title="View"
                    >
                      <FaEye size={16} />
                    </button>
                    <button 
                      onClick={() => handleEdit(emp)} 
                      className="text-green-600 hover:text-green-800 transition-colors p-2 rounded-full hover:bg-green-50"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(emp)} 
                      className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-full hover:bg-red-50"
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

      {Array.isArray(employees) && employees.length > 0 && (
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