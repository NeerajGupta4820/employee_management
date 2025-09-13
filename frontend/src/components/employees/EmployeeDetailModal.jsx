import React from 'react';
import { FaTimes } from 'react-icons/fa';

const EmployeeDetailModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Employee Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">ID:</span>
            <span className="text-gray-600">{employee.employee_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-600">{employee.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Department:</span>
            <span className="text-gray-600">{employee.department}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Salary:</span>
            <span className="text-gray-600">${employee.salary}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Joining Date:</span>
            <span className="text-gray-600">{employee.joining_date}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Skills:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {employee.skills?.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;