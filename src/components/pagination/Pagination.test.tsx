import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  it('renders without crashing', () => {
    render(<Pagination currentPage={1} count={20} onPageChange={() => { }} />);
    expect(screen.getByTestId('pagination-select')).toBeInTheDocument();
  });

  it('renders correctly with multiple pages', () => {
    render(<Pagination currentPage={1} count={25} onPageChange={() => { }} />);
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('calls onPageChange when the page is changed', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} count={30} onPageChange={onPageChange} />
    );

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '2' } });

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
