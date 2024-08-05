import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EContextValue } from '@/types/types';
import { ThemeProvider, ThemeContext } from './ThemeContext';

describe('ThemeProvider', () => {
  it('should provide the default light theme', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(value) => (
            <span data-testid="theme-value">
              {value?.theme === EContextValue.LIGHT ? 'Light' : 'Dark'}
            </span>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value').textContent).toBe('Light');
  });

  it('should toggle theme from light to dark', async () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(value) => (
            <>
              <span data-testid="theme-value">
                {value?.theme === EContextValue.LIGHT ? 'Light' : 'Dark'}
              </span>
              <button onClick={value?.toggleTheme} data-testid="toggle-theme">
                Toggle Theme
              </button>
            </>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value').textContent).toBe('Light');

    await userEvent.click(screen.getByTestId('toggle-theme'));

    expect(screen.getByTestId('theme-value').textContent).toBe('Dark');
  });

  it('should toggle theme from dark to light', async () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(value) => (
            <>
              <span data-testid="theme-value">
                {value?.theme === EContextValue.LIGHT ? 'Light' : 'Dark'}
              </span>
              <button onClick={value?.toggleTheme} data-testid="toggle-theme">
                Toggle Theme
              </button>
            </>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    await userEvent.click(screen.getByTestId('toggle-theme'));
    expect(screen.getByTestId('theme-value').textContent).toBe('Dark');

    await userEvent.click(screen.getByTestId('toggle-theme'));
    expect(screen.getByTestId('theme-value').textContent).toBe('Light');
  });
});
