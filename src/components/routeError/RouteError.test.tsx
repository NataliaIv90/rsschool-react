import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createMockRouter } from '@/tests/mocks/createMockRouter';
import { RouteError, TRouteError } from './RouteError';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('RouteError Component', () => {
  it('renders error message when an error occurs', () => {
    const mockRouter = createMockRouter({ query: {} });

    vi.mocked(useRouter).mockReturnValue(mockRouter);

    const mockError = {
      status: 404,
      statusText: 'Not Found',
      internal: true,
      data: 'Error: No route matches URL "/569"',
      error: {},
    };

    render(<RouteError currentError={mockError} />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '{"status":404,"statusText":"Not Found","internal":true,"data":"Error: No route matches URL \\"/569\\"","error":{}}'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Back to home')).toBeInTheDocument();
  });

  it('renders custom error message when `currentError` prop is provided', () => {
    const customError: TRouteError = { currentError: 'Custom Error Message' };

    render(<RouteError currentError={customError} />);

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
    const mockRouter = createMockRouter({ query: {} });

    vi.mocked(useRouter).mockReturnValue(mockRouter);

    render(<RouteError />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred.')
    ).toBeInTheDocument();
    expect(screen.queryByText('Not Found')).not.toBeInTheDocument();
    expect(screen.getByText('Back to home')).toBeInTheDocument();
  });
});
