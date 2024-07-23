import React, { useState, useEffect } from 'react';
import SearchPage from '../searchPage/SearchPage';
import { Loader } from '../../shared/components/loader/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FlyoutElement } from '../flyoutElement/FlyoutElement';
import { EContextValue } from '../../types/types';
import { Button } from '../../shared/components/button/Button';

interface ThemeContextType {
  theme: EContextValue;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

const App: React.FC = (): React.JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const [theme, setTheme] = useState<EContextValue>(EContextValue.LIGHT);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === EContextValue.LIGHT
        ? EContextValue.DARK
        : EContextValue.LIGHT
    );
  };

  useEffect(() => {
    const root = document.documentElement;
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
      <Button
        classNames="theme-btn"
        onClick={toggleTheme}
        text={theme === EContextValue.LIGHT ? '🌞' : '🌙'}
      />
      {isLoading ? <Loader /> : null}
      <SearchPage />
      <FlyoutElement />
    </ThemeContext.Provider>
  );
};

export default App;
