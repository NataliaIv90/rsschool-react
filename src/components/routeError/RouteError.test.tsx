import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RouteError, TRouteError } from './RouteError';
import { BrowserRouter as Router, useRouteError } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useRouteError: vi.fn(),
  };
});

describe('RouteError Component', () => {
  it('renders error message from `useRouteError` when an error occurs', () => {
    vi.mocked(useRouteError).mockReturnValue({
      statusText: 'Not Found',
    });

    render(
      <Router>
        <RouteError />
      </Router>
    );

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred.')
    ).toBeInTheDocument();
    expect(screen.getByText('Back to home')).toBeInTheDocument();
  });

  it('renders custom error message when `currentError` prop is provided', () => {
    const customError: TRouteError = { currentError: 'Custom Error Message' };

    render(
      <Router>
        <RouteError currentError={customError} />
      </Router>
    );

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('{"currentError":"Custom Error Message"}')
    ).toBeInTheDocument();
    expect(screen.getByText('Back to home')).toBeInTheDocument();
  });

  it('does not render error message when there is no error', () => {
    vi.mocked(useRouteError).mockReturnValue(null);

    render(
      <Router>
        <RouteError />
      </Router>
    );

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred.')
    ).toBeInTheDocument();
    expect(screen.queryByText('Not Found')).not.toBeInTheDocument();
    expect(screen.getByText('Back to home')).toBeInTheDocument();
  });

  it('renders error message an error occurs', () => {
    const mockError = {
      status: 404,
      statusText: 'Not Found',
      internal: true,
      data: 'Error: No route matches URL "/569"',
      error: {},
    };

    vi.mocked(useRouteError).mockReturnValue(mockError);

    render(
      <Router>
        <RouteError />
      </Router>
    );

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred.')
    ).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(screen.getByText('Back to home')).toBeInTheDocument();
  });
});
