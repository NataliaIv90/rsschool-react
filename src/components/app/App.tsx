import React from 'react';
import SearchPage from '../searchPage/SearchPage';
import { Loader } from '../../shared/components/loader/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FlyoutElement } from '../flyoutElement/FlyoutElement';

const App: React.FC = (): React.JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);

  return (
    <div className="App">
      {isLoading ? <Loader /> : null}
      <SearchPage />
      <FlyoutElement />
    </div>
  );
};

export default App;
