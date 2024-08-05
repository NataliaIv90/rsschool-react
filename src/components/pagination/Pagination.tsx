import { FC } from 'react';

import { IPagination } from '@/types/types';

export const Pagination: FC<IPagination> = ({
  currentPage,
  count,
  itemsPerPage = 10,
  onPageChange,
}): React.JSX.Element => {
  const totalPagesCount = Math.ceil(count / itemsPerPage);

  const generatePageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPagesCount; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  if (count === 0 || totalPagesCount <= 1) return <></>;

  return (
    <div className="pagination-wrapper">
      <select
        value={currentPage}
        className="pagination-select"
        onChange={(e) => onPageChange(Number(e.target.value))}
        data-testid="pagination-select"
      >
        {pages.map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
    </div>
  );
};
