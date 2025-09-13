import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
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
  console.log(employees)
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
    try {
      await deleteEmployee(emp.employee_id);
      alert('Employee deleted successfully!');
      refetch(); // Refresh the list
    } catch (error) {
      alert('Error deleting employee: ' + (error?.response?.data?.detail || error?.message));
    }
  };

  const handleUpdateSuccess = () => {
    refetch(); // Refresh the list after update
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
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700">All Employees</h2>
      </div>
      
      <EmployeeFilters filters={filters} onChange={setFilters} />
      
      {loading && <div className="text-base text-gray-600 text-center">Loading...</div>}
      {error && <div className="text-red-500 font-medium text-center">Error loading employees.</div>}
      
      <div className="mt-6">
        {/* Desktop: Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-blue-50 text-blue-700">
                <th className="py-2 px-4 text-left font-semibold">Name</th>
                <th className="py-2 px-4 text-left font-semibold">Salary</th>
                <th className="py-2 px-4 text-left font-semibold">Department</th>
                <th className="py-2 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(employees) && employees.length > 0 ? (
                employees.map(emp => (
                  <tr key={emp.employee_id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{emp.name}</td>
                    <td className="py-2 px-4">Rs.{emp.salary}</td>
                    <td className="py-2 px-4">{emp.department}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      <button
                        onClick={() => handleView(emp)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="View"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(emp)}
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card View */}
        <div className="block md:hidden space-y-4">
          {Array.isArray(employees) && employees.length > 0 ? (
            employees.map(emp => (
              <div key={emp.employee_id} className="bg-gray-50 p-4 rounded-lg shadow">
                <div className="flex flex-col space-y-2">
                  <div><span className="font-semibold">Name:</span> {emp.name}</div>
                  <div><span className="font-semibold">Salary:</span> Rs.{emp.salary}</div>
                  <div><span className="font-semibold">Department:</span> {emp.department}</div>
                  <div className="flex space-x-4 pt-2">
                    <button onClick={() => handleView(emp)} className="text-blue-600" title="View">
                      <FaEye size={16} />
                    </button>
                    <button onClick={() => handleEdit(emp)} className="text-green-600" title="Edit">
                      <FaEdit size={16} />
                    </button>
                    <button onClick={() => handleDelete(emp)} className="text-red-600" title="Delete">
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No employees found.</div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

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