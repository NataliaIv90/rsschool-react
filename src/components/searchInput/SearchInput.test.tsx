import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchInput from './SearchInput';

// Mock SearchForm to simplify the test
vi.mock('./searchForm/SearchForm', () => ({
  SearchForm: vi.fn(({ handleFormSubmit, handleInputChange, searchTerm }) => (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter the query..."
      />
      <button onClick={handleFormSubmit}>Search</button>
    </div>
  )),
}));

describe('SearchInput', () => {
  it('renders SearchForm with correct props', () => {
    const handleSearchTermChange = vi.fn();
    const handleSearch = vi.fn();

    render(
      <SearchInput
        searchTerm="test"
        onSearchTermChange={handleSearchTermChange}
        onSearch={handleSearch}
      />
    );

    expect(
      screen.getByPlaceholderText('Enter the query...')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('updates state when input value changes', () => {
    const handleSearchTermChange = vi.fn();
    const handleSearch = vi.fn();

    render(
      <SearchInput
        searchTerm="initial"
        onSearchTermChange={handleSearchTermChange}
        onSearch={handleSearch}
      />
    );

    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Enter the query...'), {
      target: { value: 'new value' },
    });

    // Ensure that the input value has updated
    expect(screen.getByPlaceholderText('Enter the query...')).toHaveValue(
      'new value'
    );
  });

  it('updates call search function on Search button click', () => {
    const handleSearchTermChange = vi.fn();
    const handleSearch = vi.fn();

    render(
      <SearchInput
        searchTerm="initial"
        onSearchTermChange={handleSearchTermChange}
        onSearch={handleSearch}
      />
    );

    fireEvent.click(screen.getByText('Search'));

    expect(handleSearch).toHaveBeenCalled();
  });
});
