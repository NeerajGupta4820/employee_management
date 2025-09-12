import React from 'react';

const EmployeeCard = ({ employee, onClick }) => (
  <div className="bg-white shadow rounded p-4 mb-4 cursor-pointer" onClick={onClick}>
    <h2 className="text-lg font-semibold">{employee.name}</h2>
    <p className="text-gray-600">{employee.department}</p>
    <p className="text-gray-500">Skills: {employee.skills?.join(', ')}</p>
  </div>
);

export default EmployeeCard;
