import { Outlet } from 'react-router-dom';
import SearchInput from '../../searchInput/SearchInput';
import SearchResults from '../../searchResults/SearchResults';
import { Pagination } from '../../pagination/Pagination';
import React from 'react';
import { TSearchProps } from '../../../types/types';

export const Search: React.FC<TSearchProps> = ({
  handleSearch,
  searchTerm,
  handleSearchTermChange,
  results,
  handleCharacterSelect,
  params,
  handlePageChange,
}): React.JSX.Element => (
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
