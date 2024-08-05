import { describe, expect, it, vi, beforeEach, Mock } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/tests/renderWithProviders';
import { SearchPage } from './SearchPage';
import { useRouter, useSearchParams } from 'next/navigation';

vi.mock('../routeError/RouteError', () => ({
  RouteError: vi.fn(({ currentError }) => <div>{currentError.message}</div>),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const useGetListDataQuery = vi.fn();

const mockPush = vi.fn();
const mockGet = vi.fn();

describe('SearchPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({
      push: mockPush,
    });
    (useSearchParams as Mock).mockReturnValue({
      get: mockGet,
    });
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
