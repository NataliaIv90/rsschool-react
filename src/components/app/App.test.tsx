import { describe, expect, it, vi } from 'vitest';
import { screen, RenderOptions } from '@testing-library/react';
import App from './App';
import renderWithProviders from '../../tests/renderWithProviders';
import { EContextValue } from '../../types/types';
import { RootState } from '../../redux/store';

interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: Partial<RootState>;
}

vi.mock('../../shared/context/themeContext/useTheme', () => ({
  useTheme: () => ({
    theme: EContextValue.DARK,
    toggleTheme: vi.fn(),
  }),
}));

vi.mock('../../shared/components/button/Button', () => ({
  Button: vi.fn(({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  )),
}));

vi.mock('../../shared/components/loader/Loader', () => ({
  Loader: vi.fn(() => <div>Loading...</div>),
}));

vi.mock('../flyoutElement/FlyoutElement', () => ({
  FlyoutElement: vi.fn(() => <div>Flyout element</div>),
}));

vi.mock('../searchPage/SearchPage', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    __esModule: true,
    ...actual,
    default: vi.fn(() => <div>Search page</div>),
  };
});

describe('App Component', () => {
  it('does not display loader when isLoading is false', () => {
    renderWithProviders(<App />, {
      preloadedState: { loader: { isLoading: false } },
    } as ExtendedRenderOptions);

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
