import { Outlet } from 'react-router-dom';
import SearchInput from '../searchInput/SearchInput';
import SearchResults from '../searchResults/SearchResults';
import { Pagination } from '../pagination/Pagination';
// import { Loader } from '../../shared/components/loader/Loader';
import React from 'react';
import { TResponseData, TVoidFunction } from '../../types/types';
import { TParams } from './SearchPage';
// import { useSelector } from 'react-redux';

export type TSearchProps = {
  // isLoading: boolean;
  // isFetching: boolean;
  handleSearch: TVoidFunction;
  searchTerm: string;
  handleSearchTermChange: (searchTerm: string) => Promise<void>;
  results?: TResponseData;
  handleCharacterSelect: (id: string) => void;
  params: TParams;
  handlePageChange: (page: number) => void;
};

export const Search: React.FC<TSearchProps> = ({
  // isFetching,
  // isLoading,
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
