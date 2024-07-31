import React from 'react';
import { useSelector } from 'react-redux';

import { Loader } from '@/shared/components';
import { PageWrapper } from '@/components/pageWrapper';
import { RootState } from '@/redux/store';
import { SearchPage } from '@/components/searchPage';

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
