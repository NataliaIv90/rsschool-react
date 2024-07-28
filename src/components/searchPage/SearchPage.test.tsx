import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import SearchPage from './SearchPage';
import { useGetListDataQuery } from '../../redux/slices/starWarsApiSlice';
import renderWithProviders from '../../tests/renderWithProviders';

vi.mock('../routeError/RouteError', () => ({
  RouteError: vi.fn(() => <div>Mocked RouteError</div>),
}));

vi.mock('../../redux/slices/starWarsApiSlice', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useGetListDataQuery: vi.fn(),
  };
});

describe('SearchPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly without errors', () => {
    vi.mocked(useGetListDataQuery).mockReturnValue({
      data: { results: [], count: 0 },
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    });

    renderWithProviders(<SearchPage />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });

  it('handles error state correctly', () => {
    vi.mocked(useGetListDataQuery).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error('Test Error'),
      isFetching: false,
      refetch: vi.fn(),
    });

    renderWithProviders(<SearchPage />);

    expect(screen.getByText('Mocked RouteError')).toBeInTheDocument();
  });
});
