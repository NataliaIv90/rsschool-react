import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';
import Page404 from './404';

vi.mock('@/components/routeError', () => ({
  RouteError: () => <div>Route error</div>,
}));

describe('404 page', () => {
  it('renders correctly', () => {
    render(<Page404 />);

    expect(screen.getByText('Route error')).toBeInTheDocument();
  });
});
