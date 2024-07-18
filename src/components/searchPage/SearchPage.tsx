import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSaveSearchQuery } from '../../shared/hooks/useSaveSearchQuery';
import { scrollToTop } from '../../shared/utils/scrollToTop';
import { useGetListDataQuery } from '../../redux/slices/starWarsApiSlice';
import { RouteError } from '../routeError/RouteError';
import { Search } from './SearchPageComponent';
import { useLoading } from '../../shared/hooks/useLoading';

export type TParams = {
  page: string;
};

export const SearchPage: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useSaveSearchQuery();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params: TParams = {
    page: searchParams.get('page') || '1',
  };

  const {
    data: results,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetListDataQuery({
    page: params.page,
    searchTerm: searchTerm,
  });

  const handleSearchTermChange = async (searchTerm: string): Promise<void> => {
    await setSearchTerm(searchTerm);
  };

  const handleCharacterSelect = (id: string) => {
    navigate(`/details/?page=${params.page}&id=${id}`);
  };

  const handlePageChange = (page: number): void => {
    scrollToTop();
    navigate(`/?page=${page}`);
  };

  const handleSearch = (): void => {
    scrollToTop();
    navigate('/?page=1');
  };

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
      params={params}
      searchTerm={searchTerm}
    />
  );
};
