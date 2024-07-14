import React, { useState, useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchInput from '../searchInput/SearchInput';
import SearchResults from '../searchResults/SearchResults';
import { Pagination } from '../pagination/Pagination';
import { useSaveSearchQuery } from '../../shared/hooks/useSaveSearchQuery';
import { Loader } from '../../shared/components/loader/Loader';
import { scrollToTop } from '../../shared/utils/scrollToTop';
import { IStarWarsCharacter } from '../../types/types';

export const SearchPage: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useSaveSearchQuery();
  const [results, setResults] = useState<IStarWarsCharacter[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [searchParams] = useSearchParams();

  const params = {
    page: searchParams.get('page') || '1',
  };

  const handleSearchTermChange = async (searchTerm: string): Promise<void> => {
    await setSearchTerm(searchTerm);
  };

  const handleSearch = (): void => {
    fetchResults(1, searchTerm);
  };

  const handleCharacterSelect = (id: string) => {
    navigate(`/details/?page=${params.page}&id=${id}`);
  };

  const fetchResults = useCallback((page: number, searchTerm?: string) => {
    let apiUrl = `https://swapi.dev/api/people/?page=${page}`;
    if (searchTerm) {
      apiUrl += `&search=${searchTerm}`;
    }
    setLoading(true);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results);
        setCount(data.count);
        setLoading(false);
        setInitialLoad(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handlePageChange = (page: number): void => {
    scrollToTop();
    navigate(`/?page=${page}`);
    fetchResults(page, searchTerm);
  };

  useEffect(() => {
    if (isInitialLoad) {
      fetchResults(parseInt(params.page, 10), searchTerm);
    }
  }, [isInitialLoad, fetchResults, params.page, searchTerm]);

  return (
    <div className="search-page">
      {isLoading ? <Loader /> : null}
      <SearchInput
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onSearch={handleSearch}
        isLoading={isLoading}
      />
      <div className="search-main-section">
        {results.length ? (
          <>
            <SearchResults
              results={results}
              onCharacterSelect={handleCharacterSelect}
            />
            <Outlet />
          </>
        ) : (
          <p>No data found</p>
        )}
      </div>
      <Pagination
        count={count}
        currentPage={parseInt(params.page, 10)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
