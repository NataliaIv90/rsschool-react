import { describe, vi, it, expect, afterEach, Mock } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { DetailedView } from './DetailedSection';
import { mockedCharacter } from '@/tests/mocks/mock';
import { renderWithProviders } from '@/tests/renderWithProviders';
import { useGetCharacterDataQuery } from '@/redux/slices/starWarsApiSlice';

vi.mock('@/redux/slices/starWarsApiSlice', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useGetCharacterDataQuery: vi.fn(),
  };
});

const mockPush = vi.fn();
const mockUseSearchParams = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: mockUseSearchParams,
  }),
}));

vi.mock('../routeError/RouteError', () => ({
  RouteError: ({ currentError }: { currentError: { message: string } }) => (
    <div>{currentError.message}</div>
  ),
}));

describe('DetailedView Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('navigates to the correct URL when close button is clicked', async () => {
    mockUseSearchParams.mockImplementation((param: string) =>
      param === 'id' ? '1' : '1'
    );

    (useGetCharacterDataQuery as Mock).mockReturnValue({
      data: mockedCharacter,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<DetailedView />);

    const closeButton = screen.getByText('Close card');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?page=1');
    });
  });

  it('handles missing search parameters', async () => {
    mockUseSearchParams.mockImplementation((param: string) => null);

    (useGetCharacterDataQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<DetailedView />);

    expect(screen.queryByText(mockedCharacter.name)).not.toBeInTheDocument();
    expect(screen.getByText('Character ID is missing')).toBeInTheDocument();
  });
});
