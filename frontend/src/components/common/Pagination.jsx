import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center mt-4">
    <button
      className="px-3 py-1 mx-1 bg-gray-200 rounded"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </button>
    <span className="mx-2">Page {currentPage} of {totalPages}</span>
    <button
      className="px-3 py-1 mx-1 bg-gray-200 rounded"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;
