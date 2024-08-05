import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('should render child components without errors', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should catch and display error when a child component throws an error', () => {
    const ErrorThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('should trigger error handling when "Check Error Boundary" button is clicked', async () => {
    render(
      <ErrorBoundary>
        <div>No error</div>
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Check Error Boundary'));

    expect(
      await screen.findByText('Something went wrong.')
    ).toBeInTheDocument();
    expect(
      await screen.findByText((content) =>
        content.includes('This is a test error thrown from ErrorBoundary.')
      )
    ).toBeInTheDocument();
  });

  it('should render "Go to the home page" button when error is present', async () => {
    render(
      <ErrorBoundary>
        <div>No error</div>
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Check Error Boundary'));

    expect(
      await screen.findByText('Something went wrong.')
    ).toBeInTheDocument();
    expect(screen.getByText('Go to the home page')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go to the home page/i })
    ).toBeInTheDocument();
  });
});
