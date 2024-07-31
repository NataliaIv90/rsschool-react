import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Search } from './Search';
import { mockedCharacter } from '../../../tests/mocks/mock';

vi.mock('../../searchInput/SearchInput', () => ({
  __esModule: true,
  default: (props: { searchTerm: string; onSearch: (e: string) => void }) => (
    <input
      data-testid="search-input"
      value={props.searchTerm}
      onChange={(e) => props.onSearch(e.target.value)}
    />
  ),
}));

vi.mock('../../searchResults/SearchResults', () => ({
  __esModule: true,
  default: (props: object) => <div data-testid="search-results" {...props} />,
}));

vi.mock('../../pagination/Pagination', () => ({
  __esModule: true,
  Pagination: (props: object) => <div data-testid="pagination" {...props} />,
}));

vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet">Outlet</div>,
}));

describe('Search Component', () => {
  it('renders SearchInput component', () => {
    render(
      <Search
        handleSearch={vi.fn()}
        searchTerm="test"
        handleSearchTermChange={vi.fn()}
        results={{ results: [], count: 0 }}
        handleCharacterSelect={vi.fn()}
        params={{ page: '1' }}
        handlePageChange={vi.fn()}
      />
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('renders SearchResults and Pagination when there are results', () => {
    render(
      <Search
        handleSearch={vi.fn()}
        searchTerm="test"
        handleSearchTermChange={vi.fn()}
        results={{ results: [mockedCharacter], count: 1 }}
        handleCharacterSelect={vi.fn()}
        params={{ page: '1' }}
        handlePageChange={vi.fn()}
      />
    );

    expect(screen.getByTestId('search-results')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('renders "No data to display" message when there are no results', () => {
    render(
      <Search
        handleSearch={vi.fn()}
        searchTerm="test"
        handleSearchTermChange={vi.fn()}
        results={{ results: [], count: 0 }}
        handleCharacterSelect={vi.fn()}
        params={{ page: '1' }}
        handlePageChange={vi.fn()}
      />
    );

    expect(screen.getByText('No data to display')).toBeInTheDocument();
  });

  it('calls handleSearch when SearchInput triggers onSearch', () => {
    const handleSearch = vi.fn();
    render(
      <Search
        handleSearch={handleSearch}
        searchTerm="test"
        handleSearchTermChange={vi.fn()}
        results={{ results: [], count: 0 }}
        handleCharacterSelect={vi.fn()}
        params={{ page: '1' }}
        handlePageChange={vi.fn()}
      />
    );

    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'new search term' },
    });

    expect(handleSearch).toHaveBeenCalled();
  });
});
