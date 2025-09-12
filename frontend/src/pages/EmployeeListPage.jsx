import React, { useState } from 'react';
import EmployeeCard from '../components/employees/EmployeeCard';
import EmployeeFilters from '../components/employees/EmployeeFilters';
import Pagination from '../components/common/Pagination';
import useEmployees from '../hooks/useEmployees';

const EmployeeListPage = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const { employees, loading, error } = useEmployees(filters, page); // Pass page separately

  const totalPages = 5; // Update based on API response if dynamic

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">All Employees</h2>
      </div>
      <EmployeeFilters filters={filters} onChange={setFilters} />
      {loading && <div className="text-base text-gray-600">Loading...</div>}
      {error && <div className="text-red-500 font-medium">Error loading employees.</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {Array.isArray(employees) && employees.length > 0 ? (
          employees.map(emp => (
            <EmployeeCard key={emp.id} employee={emp} onClick={() => window.location.href = `/employees/${emp.id}`} />
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500">Koi employee nahi mila.</div>
        )}
      </div>
      <div className="mt-8">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default EmployeeListPage;