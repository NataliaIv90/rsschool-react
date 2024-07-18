import React from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchInput from '../searchInput/SearchInput';
import SearchResults from '../searchResults/SearchResults';
import { Pagination } from '../pagination/Pagination';
import { useSaveSearchQuery } from '../../shared/hooks/useSaveSearchQuery';
import { Loader } from '../../shared/components/loader/Loader';
import { scrollToTop } from '../../shared/utils/scrollToTop';
import { useGetListDataQuery } from '../../redux/slices/starWarsApiSlice';
import { RouteError } from '../routeError/RouteError';

export const SearchPage: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useSaveSearchQuery();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = {
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

  console.log(results);

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

  if (isError) {
    return <RouteError currentError={error} />;
  }

  return (
    <div className="search-page">
      {isLoading || isFetching ? <Loader /> : null}
      <SearchInput
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        isLoading={isLoading}
      />
      <div className="search-main-section">
        {Array.isArray(results?.results) && results?.results?.length ? (
          <>
            <SearchResults
              results={results.results}
              onCharacterSelect={handleCharacterSelect}
            />
            <Outlet />
          </>
        ) : (
          <p>No data to display</p>
        )}
      </div>
      {Array.isArray(results?.results) && results?.results?.length ? (
        <Pagination
          count={results.count || 0}
          currentPage={parseInt(params.page, 10)}
          onPageChange={handlePageChange}
        />
      ) : null}
    </div>
  );
};
