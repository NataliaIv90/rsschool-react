import React, { useState, useCallback } from 'react';
import SearchInput from '../searchInput/SearchInput';
import SearchResults from '../searchResults/SearchResults';
import { Pagination } from '../pagination/Pagination';
import { useSaveSearchQuery } from '../../shared/hooks/useSaveSearchQuery';
import { Loader } from '../../shared/components/loader/Loader';
import { scrollToTop } from '../../shared/utils/scrollToTop';

export interface IStarWarsCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export const SearchPage: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useSaveSearchQuery();
  const [results, setResults] = useState<IStarWarsCharacter[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isNeedToFetch, setNeedToFetch] = useState<boolean>(true);

  const handleSearchTermChange = (searchTerm: string): void => {
    setSearchTerm(searchTerm);
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

  if (isNeedToFetch) {
    setNeedToFetch(false);
    fetchResults(currentPage, searchTerm);
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
      <SearchResults results={results} />
      <Pagination
        count={count}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
