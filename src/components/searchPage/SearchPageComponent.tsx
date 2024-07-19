import { Outlet } from 'react-router-dom';
import SearchInput from '../searchInput/SearchInput';
import SearchResults from '../searchResults/SearchResults';
import { Pagination } from '../pagination/Pagination';
import React from 'react';
import { TResponseData, TVoidFunction } from '../../types/types';
import { TParams } from './SearchPage';

export type TSearchProps = {
  handleSearch: TVoidFunction;
  searchTerm: string;
  handleSearchTermChange: (searchTerm: string) => Promise<void>;
  results?: TResponseData;
  handleCharacterSelect: (id: string) => void;
  params: TParams;
  handlePageChange: (page: number) => void;
};

export const Search: React.FC<TSearchProps> = ({
  handleSearch,
  searchTerm,
  handleSearchTermChange,
  results,
  handleCharacterSelect,
  params,
  handlePageChange,
}) => (
  <div className="search-page">
    <SearchInput
      onSearch={handleSearch}
      searchTerm={searchTerm}
      onSearchTermChange={handleSearchTermChange}
      isLoading={false}
    />
    {Array.isArray(results?.results) && results?.results?.length ? (
      <>
        <div className="search-main-section">
          <SearchResults
            results={results.results}
            onCharacterSelect={handleCharacterSelect}
          />
          <Outlet />
        </div>
        <Pagination
          count={results.count || 0}
          currentPage={parseInt(params.page, 10)}
          onPageChange={handlePageChange}
        />
      </>
    ) : (
      <p>No data to display</p>
    )}
  </div>
);
