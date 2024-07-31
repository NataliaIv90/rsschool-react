import SearchInput from '../../searchInput/SearchInput';
import SearchResults from '../../searchResults/SearchResults';
import { Pagination } from '../../pagination/Pagination';
import React from 'react';
import { TSearchProps } from '../../../types/types';
import Image from 'next/image';
import Icon from '@/icon.svg';

export const Search: React.FC<TSearchProps> = ({
  handleSearch,
  searchTerm,
  handleSearchTermChange,
  results,
  handleCharacterSelect,
  params,
  handlePageChange,
  children,
}): React.JSX.Element => (
  <div className="search-page">
    <SearchInput
      onSearch={handleSearch}
      searchTerm={searchTerm}
      onSearchTermChange={handleSearchTermChange}
    />
    {Array.isArray(results?.results) && results?.results?.length ? (
      <>
        <div className="search-main-section">
          <SearchResults
            results={results.results}
            onCharacterSelect={handleCharacterSelect}
          />
          {children}
        </div>
        <Pagination
          count={results.count || 0}
          currentPage={parseInt(params.page, 10)}
          onPageChange={handlePageChange}
        />
      </>
    ) : (
      <div>
        <p>No data to display</p>
        <div className="no-data-icon-wrapper">
          <Image src={Icon} alt="Vaider icon" width="100" />
        </div>
      </div>
    )}
  </div>
);
