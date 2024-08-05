import { describe, expect, it, vi, beforeEach, Mock } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/tests/renderWithProviders';
import { SearchPage } from './SearchPage';
// import { useGetListDataQuery } from '@/redux/slices';

vi.mock('../routeError/RouteError', () => ({
  RouteError: vi.fn(({ currentError }) => <div>{currentError.message}</div>),
}));

// vi.mock('../../redux/slices/starWarsApiSlice', async (importOriginal) => {
//   const actual: object = await importOriginal();
//   return {
//     ...actual,
//     useGetListDataQuery: vi.fn(),
//   };
// });
const useGetListDataQuery = vi.fn();
vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '1', page: '1' },
    push: vi.fn(),
  }),
}));

describe('SearchPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly without errors', () => {
    (useGetListDataQuery as Mock).mockReturnValue({
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
});
