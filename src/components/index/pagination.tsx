import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevPage}
        className="font-bold"
        disabled={currentPage <= 1}
      >
        &larr; Prev
      </button>
      <button>
        Halaman <strong>{currentPage}</strong> dari{" "}
        <strong>{totalPages}</strong>
      </button>
      <button
        onClick={onNextPage}
        className="font-bold"
        disabled={currentPage >= totalPages}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;