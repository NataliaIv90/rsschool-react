import React, { useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const [isNeedToFetchData, setNeedToFetchData] = useState<boolean>(true);

  const handleSearchTermChange = async (searchTerm: string): Promise<void> => {
    await setSearchTerm(searchTerm);
  };

  const handleSearch = (): void => {
    setCurrentPage(1);
    fetchResults(1, searchTerm);
  };

  const handlePageChange = (page: number): void => {
    scrollToTop();
    setCurrentPage(page);
    fetchResults(page, searchTerm);
  };

  const handleCharacterSelect = (id: string) => {
    navigate(`/details/${id}`);
  };

  const fetchResults = useCallback(
    (page: number, searchTerm?: string) => {
      let apiUrl = `https://swapi.dev/api/people/?page=${page}`;
      if (searchTerm) {
        apiUrl += `&search=${searchTerm}`;
      }
      setLoading(true);

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResults(data.results);
          setLoading(false);
          setCount(data.count);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    },
    [setLoading]
  );

  if (isNeedToFetchData) {
    setNeedToFetchData(false);
    fetchResults(1, searchTerm);
  }

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
        <SearchResults
          results={results}
          onCharacterSelect={handleCharacterSelect}
        />
        <Outlet />
      </div>
      <Pagination
        count={count}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
