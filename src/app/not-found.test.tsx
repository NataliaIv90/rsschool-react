import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/components/routeError', () => ({
  RouteError: ({ currentError }: { currentError: string }) => (
    <div>{currentError}</div>
  ),
}));

describe('NotFound Component', () => {
  it('renders RouteError with the correct error message', () => {
    render(<NotFound />);

    expect(
      screen.getByText('Error 404: This page is not found')
    ).toBeInTheDocument();
  });
});
