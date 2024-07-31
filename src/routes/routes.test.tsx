import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { router } from './routes';

vi.mock('../components/app/App', () => ({
  default: () => <div>App Component</div>,
}));

vi.mock('../components/detailedSection/DetailedSection', () => ({
  DetailedView: () => <div>Detailed View Component</div>,
}));

vi.mock('../components/routeError/RouteError', () => ({
  RouteError: () => <div>Route Error Component</div>,
}));

describe('Router configuration', () => {
  it('renders the App component at the root path', async () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByText('App Component')).toBeInTheDocument();
  });
});
