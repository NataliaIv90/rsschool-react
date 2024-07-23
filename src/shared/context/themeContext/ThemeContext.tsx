import { EContextValue, ThemeContextType } from '../../../types/types';
import React, {
  PropsWithChildren,
  ReactNode,
  useState,
  useEffect,
} from 'react';

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

  useEffect(() => {
    const root = document.body;
    if (theme === EContextValue.DARK) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
