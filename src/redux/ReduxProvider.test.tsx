import { render, screen } from '@testing-library/react';
import { ReduxProvider } from './ReduxProvider';
import { describe, expect, it } from 'vitest';

describe('ReduxProvider Component', () => {
  it('renders children correctly', () => {
    render(
      <ReduxProvider>
        <div>Test Child</div>
      </ReduxProvider>
    );

    // Check if the child component is rendered
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
