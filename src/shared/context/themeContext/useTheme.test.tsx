import React from 'react';
import { act, render, renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from './useTheme';
import { EContextValue } from '../../../types/types';

vi.mock('@/shared/context/themeContext/ThemeProvider', () => ({
  ThemeProvider: vi
    .fn()
    .mockImplementation(({ children }) => <div> {children} </div>),
}));

describe('useTheme hook', () => {
  it('should return theme context values when used within a ThemeProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe(EContextValue.LIGHT);
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('should toggle the theme when toggleTheme is called', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result, rerender } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe(EContextValue.LIGHT);

    act(() => {
      result.current.toggleTheme();
    });

    rerender();

    expect(result.current.theme).toBe(EContextValue.DARK);
  });

  it('should log an error if useTheme is used outside of a ThemeProvider', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const TestComponent = () => {
      try {
        useTheme();
      } catch (error) {
        console.error(error);
      }
      return null;
    };

    render(<TestComponent />);

    expect(consoleError).toHaveBeenCalledWith(
      expect.stringMatching(/useTheme must be used within a ThemeProvider/)
    );

    consoleError.mockRestore();
  });
});
