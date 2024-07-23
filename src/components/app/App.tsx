import React from 'react';
import SearchPage from '../searchPage/SearchPage';
import { Loader } from '../../shared/components/loader/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FlyoutElement } from '../flyoutElement/FlyoutElement';
import { EContextValue } from '@/types/types';
import { Button } from '../../shared/components/button/Button';
import { useTheme } from '../../shared/context/themeContext/useTheme';

const App: React.FC = (): React.JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Button
        classNames="theme-btn"
        onClick={toggleTheme}
        text={theme === EContextValue.LIGHT ? '🌞' : '🌙'}
      />
      {isLoading ? <Loader /> : null}
      <SearchPage />
      <FlyoutElement />
    </>
  );
};

export default App;
