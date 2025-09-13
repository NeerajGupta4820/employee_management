import React, { useEffect, useState } from 'react';
import { getDepartmentAverageSalaries } from '../services/employeeService';

const DepartmentAverageSalaryPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getDepartmentAverageSalaries();
        setData(result);
        setError(null);
      } catch {
        setError('Failed to fetch average salaries');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">Average Salary by Department</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-2 px-4 text-left">Department</th>
              <th className="py-2 px-4 text-left">Average Salary</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dept) => (
              <tr key={dept.department} className="border-t">
                <td className="py-2 px-4">{dept.department}</td>
                <td className="py-2 px-4">₹{dept.avg_salary?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DepartmentAverageSalaryPage;
