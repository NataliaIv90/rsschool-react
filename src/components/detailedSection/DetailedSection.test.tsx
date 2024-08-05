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
vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '1', page: '1' },
    push: mockPush,
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
    (useGetCharacterDataQuery as Mock).mockReturnValue({
      data: mockedCharacter,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<DetailedView />);

    const closeButton = screen.getByText('Close card');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?page=1');
    });
  });

  it('handles missing search parameters', async () => {
    (useGetCharacterDataQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<DetailedView />);

    expect(screen.queryByText(mockedCharacter.name)).not.toBeInTheDocument();
  });
});
