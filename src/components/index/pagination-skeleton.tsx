import React from "react";

const PaginationSkeleton: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="h-3 bg-gray-300 w-1/12 rounded-full"></div>
      <div className="h-3 bg-gray-300 w-3/12 rounded-full"></div>
      <div className="h-3 bg-gray-300 w-1/12 rounded-full"></div>
    </div>
  );
};

export default PaginationSkeleton;
