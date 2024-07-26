import { describe, vi, it, expect, afterEach, Mock } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { DetailedView } from './DetailedSection';
import { useGetCharacterDataQuery } from '../../redux/slices/starWarsApiSlice';
import renderWithProviders from '../../tests/renderWithProviders';

// Mock RouteError correctly
vi.mock('../routeError/RouteError', () => ({
  RouteError: vi.fn(({ currentError }) => <div>{currentError.message}</div>),
}));

const navigate = vi.fn();

// Mock Button component
vi.mock('../../shared/components/button/Button', () => ({
  Button: vi.fn(({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  )),
}));

// Mock react-router-dom correctly
vi.mock('react-router-dom', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
    useSearchParams: () => [new URLSearchParams({ page: '1', id: '1' })],
  };
});

vi.mock('../../redux/slices/starWarsApiSlice', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useGetCharacterDataQuery: vi.fn(),
  };
});

describe('DetailedView Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders error state', () => {
    const errorMessage = 'Error fetching data';
    (useGetCharacterDataQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      isError: true,
      error: { message: errorMessage },
    });

    renderWithProviders(<DetailedView />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders with character data', async () => {
    const mockCharacter = { name: 'Luke Skywalker' };
    (useGetCharacterDataQuery as Mock).mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<DetailedView />);

    await waitFor(() => {
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
      expect(screen.getByText('Close card')).toBeInTheDocument();
    });
  });

  it('navigates to the correct URL when close button is clicked', async () => {
    const mockCharacter = { name: 'Luke Skywalker' };
    (useGetCharacterDataQuery as Mock).mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<DetailedView />);

    const closeButton = screen.getByText('Close card');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/?page=1'); // Ensure navigation works as expected
    });
  });

  it('handles missing search parameters', async () => {
    vi.mock('react-router-dom', async (importOriginal) => {
      const actual: object = await importOriginal();
      return {
        ...actual,
        useNavigate: () => navigate,
        useSearchParams: () => [new URLSearchParams({ page: '1' })], // No 'id'
      };
    });

    (useGetCharacterDataQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<DetailedView />);

    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });
});
