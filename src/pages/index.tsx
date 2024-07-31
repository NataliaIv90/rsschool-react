import React from 'react';

import { SearchPage } from '@/components/searchPage';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Loader } from '@/shared/components';

const Home = () => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  return (
    <PageWrapper>
      {isLoading ? <Loader /> : null}
      <SearchPage />
    </PageWrapper>
  );
};
export default Home;
