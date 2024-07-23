import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button, TButtonProps } from './Button';

const buttonProps: TButtonProps = {
  text: 'Test button',
};

describe('Button', () => {
  test('renders', () => {
    render(<Button text={buttonProps.text} />);
    expect(screen.getByText(buttonProps.text)).toBeDefined();
  });
});
