'use client';

import { EContextValue, ThemeContextType } from '../../../types/types';
import React, { PropsWithChildren, ReactNode, useState } from 'react';

export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

export interface IThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<
  PropsWithChildren<IThemeProviderProps>
> = ({ children }) => {
  const [theme, setTheme] = useState<EContextValue>(EContextValue.LIGHT);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === EContextValue.LIGHT
        ? EContextValue.DARK
        : EContextValue.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={theme === EContextValue.LIGHT ? 'light-theme' : 'dark-theme'}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
