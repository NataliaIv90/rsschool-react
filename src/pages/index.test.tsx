import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Home from './index';
import renderWithProviders from '@/tests/renderWithProviders';

vi.mock('@/shared/components', () => ({
  Loader: () => <div data-testid="loader">Loader</div>,
}));

vi.mock('@/components/searchPage', () => ({
  SearchPage: () => <div data-testid="search-page">SearchPage</div>,
}));

describe('Home Component', () => {
  it('renders Loader when isLoading is true', () => {
    const initialState = {
      loader: { isLoading: true },
    };

    renderWithProviders(<Home />, { initialState });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('search-page')).toBeInTheDocument();
  });

  it('does not render Loader when isLoading is false', () => {
    const initialState = {
      loader: { isLoading: false },
    };

    renderWithProviders(<Home />, { initialState });

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('search-page')).toBeInTheDocument();
  });
});
