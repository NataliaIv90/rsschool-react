import { AppProps } from 'next/app';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Router } from 'next/router';

import App from './_app';
import { createMockRouter } from '@/tests/mocks/createMockRouter';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/shared/context';

vi.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/assets/metadata', () => ({
  metadata: { title: 'Mock Title' },
}));

vi.mock('@/components/pageWrapper', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-wrapper">{children}</div>
  ),
}));

vi.mock('@/components/errorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

describe('App Component', () => {
  const mockComponent: React.FC = () => (
    <div data-testid="mock-component">Mock Component</div>
  );

  const appProps: AppProps = {
    Component: mockComponent,
    pageProps: {},
    router: createMockRouter as unknown as Router,
  };

  it('renders the App component with necessary providers', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App {...appProps} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.queryByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('page-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('mock-component')).toBeInTheDocument();
    expect(document.title).toBe('Mock Title');
  });
});
