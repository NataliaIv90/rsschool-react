import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';

import { PageWrapper } from './PageWrapper';
import { renderWithProviders } from '@/tests/renderWithProviders';
import { ThemeProvider } from '@/shared/context';

vi.mock('@/shared/components', () => ({
  Button: ({ onClick, text }: { onClick: () => void; text: string }) => (
    <button onClick={onClick} data-testid="theme-btn">
      {text}
    </button>
  ),
  Loader: () => <div data-testid="loader">Loader</div>,
}));

vi.mock('../flyoutElement', () => ({
  FlyoutElement: () => <div data-testid="flyout-element">FlyoutElement</div>,
}));

describe('PageWrapper Component', () => {
  it('renders Loader when isLoading is true', () => {
    const initialState = {
      loader: { isLoading: true },
    };

    renderWithProviders(
      <ThemeProvider>
        <PageWrapper>
          <div data-testid="child">Child Component</div>
        </PageWrapper>
      </ThemeProvider>,
      { initialState }
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('flyout-element')).toBeInTheDocument();
  });

  it('does not render Loader when isLoading is false', () => {
    const initialState = {
      loader: { isLoading: false },
    };

    renderWithProviders(
      <ThemeProvider>
        <PageWrapper>
          <div data-testid="child">Child Component</div>
        </PageWrapper>
      </ThemeProvider>,
      { initialState }
    );

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('flyout-element')).toBeInTheDocument();
  });
});
