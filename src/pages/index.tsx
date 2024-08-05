import { useSelector } from 'react-redux';

import { Loader } from '@/shared/components';
import { RootState } from '@/redux/store';
import { SearchPage } from '@/components/searchPage';

const Home = () => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  return (
    <>
      {isLoading ? <Loader /> : null}
      <SearchPage />
    </>
  );
};
export default Home;
