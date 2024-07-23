import React, { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSaveSearchQuery } from '../../shared/hooks/useSaveSearchQuery';
import { scrollToTop } from '../../shared/utils/scrollToTop/scrollToTop';
import { useGetListDataQuery } from '../../redux/slices/starWarsApiSlice';
import { RouteError } from '../routeError/RouteError';
import { Search } from './search/Search';
import { useLoading } from '../../shared/hooks/useLoading';
import { useDispatch } from 'react-redux';
import { setCurrentPageItems } from '../../redux/slices/currentPageItemsSlice';

const SearchPage: React.FC = (): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useSaveSearchQuery();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const dispatch = useDispatch();

  const {
    data: results,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetListDataQuery({
    page,
    searchTerm,
  });

  const handleSearchTermChange = useCallback(
    async (newSearchTerm: string): Promise<void> => {
      await setSearchTerm(newSearchTerm);
    },
    [setSearchTerm]
  );

  const handleCharacterSelect = useCallback(
    (id: string) => {
      navigate(`/details/?page=${page}&id=${id}`);
    },
    [navigate, page]
  );

  const handlePageChange = useCallback(
    (newPage: number): void => {
      scrollToTop();
      navigate(`/?page=${newPage}`);
    },
    [navigate]
  );

  const handleSearch = useCallback((): void => {
    scrollToTop();
    navigate('/?page=1');
  }, [navigate]);

  React.useEffect(() => {
    if (results) {
      dispatch(setCurrentPageItems(results));
    }
  }, [results, dispatch]);

  useLoading(isLoading, isFetching);

  if (isError) {
    return <RouteError currentError={error} />;
  }

  return (
    <Search
      results={results}
      handlePageChange={handlePageChange}
      handleCharacterSelect={handleCharacterSelect}
      handleSearch={handleSearch}
      handleSearchTermChange={handleSearchTermChange}
      params={{ page }}
      searchTerm={searchTerm}
    />
  );
};

export default SearchPage;
