import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Loader } from './Loader';

describe('Loader', () => {
  test('renders', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader-wrapper')).toBeDefined();
  });
});
