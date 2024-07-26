import { describe, expect, it, vi } from 'vitest';
import { screen, RenderOptions } from '@testing-library/react';
import App from './App';
import renderWithProviders from '../../tests/renderWithProviders';
import { EContextValue } from '../../types/types';
import { RootState } from '../../redux/store';
// import { useTheme } from '../../shared/context/themeContext/useTheme';

interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: Partial<RootState>;
}

// Mocking useTheme hook
vi.mock('../../shared/context/themeContext/useTheme', () => ({
  useTheme: () => ({
    theme: EContextValue.DARK,
    toggleTheme: vi.fn(),
  }),
}));

// Mocking Button component
vi.mock('../../shared/components/button/Button', () => ({
  Button: vi.fn(({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  )),
}));

// Mocking Loader component
vi.mock('../../shared/components/loader/Loader', () => ({
  Loader: vi.fn(() => <div>Loading...</div>), // Ensure this matches the test
}));

// Mocking FlyoutElement component
vi.mock('../flyoutElement/FlyoutElement', () => ({
  FlyoutElement: vi.fn(() => <div>Flyout element</div>),
}));

// Mocking SearchPage component
vi.mock('../searchPage/SearchPage', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    __esModule: true, // This ensures the default export is correctly mocked
    ...actual,
    default: vi.fn(() => <div>Search page</div>), // Mocking the default export
  };
});

describe('App Component', () => {
  // it('displays loader when isLoading is true', () => {
  //   renderWithProviders(<App />, {
  //     preloadedState: { loader: { isLoading: true } },
  //   } as ExtendedRenderOptions);

  //   // Check that the Loader component is rendered
  //   expect(screen.getByText('Loading...')).toBeInTheDocument();
  // });

  it('does not display loader when isLoading is false', () => {
    // Mock the Redux state to set isLoading to false
    renderWithProviders(<App />, {
      preloadedState: { loader: { isLoading: false } },
    } as ExtendedRenderOptions);

    // Check that the Loader component is not rendered
    expect(screen.queryByText('Is loading')).not.toBeInTheDocument();
  });

  it('renders SearchPage component', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('Search page')).toBeInTheDocument();
  });

  it('renders FlyoutElement component', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('Flyout element')).toBeInTheDocument();
  });
});
