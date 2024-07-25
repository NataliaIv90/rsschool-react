import { fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchForm } from './SearchForm';
import renderWithProviders from '../../../tests/renderWithProviders';

describe('SearchForm', () => {
  it('renders correctly', () => {
    renderWithProviders(
      <SearchForm
        handleFormSubmit={() => {}}
        searchTerm=""
        handleInputChange={() => {}}
      />
    );

    expect(
      screen.getByPlaceholderText('Enter the query...')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('calls handleFormSubmit on form submission', () => {
    const handleFormSubmit = vi.fn();
    renderWithProviders(
      <SearchForm
        handleFormSubmit={handleFormSubmit}
        searchTerm=""
        handleInputChange={() => {}}
      />
    );

    const formElement = screen.getByTestId('search-form');
    fireEvent.submit(formElement);
    expect(handleFormSubmit).toHaveBeenCalled();
  });
});
