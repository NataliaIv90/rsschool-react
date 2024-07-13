import { FC } from 'react';

interface IPagination {
  currentPage: number;
  count: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<IPagination> = ({
  currentPage,
  count,
  itemsPerPage = 10,
  onPageChange,
}) => {
  const totalPagesCount = Math.ceil(count / itemsPerPage);

  const generatePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPagesCount, currentPage + 1);

    if (startPage > 2) {
      pages.push(1);
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPagesCount - 1) {
      pages.push('...');
      pages.push(totalPagesCount);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPagesCount) {
      onPageChange(currentPage + 1);
    }
  };

  if (count === 0) return;

  if (count < 11) {
    return (
      <div className="pagination-wrapper">
        <button className="btn" disabled={true}>
          1
        </button>
      </div>
    );
  }

  return (
    <div className="pagination-wrapper">
      <button
        className="btn"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={
            typeof page === 'string'
              ? 'outlined-btn'
              : page === currentPage
                ? 'active btn'
                : 'btn'
          }
          disabled={page === '...' || page === currentPage}
        >
          {page}
        </button>
      ))}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPagesCount}
        className="btn"
      >
        Next
      </button>
    </div>
  );
};
