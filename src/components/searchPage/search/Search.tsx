import Image from 'next/image';
import { FunctionComponent } from 'react';

import { Pagination } from '@/components/pagination';
import { SearchResults } from '@/components/searchResults';
import { SearchInput } from '@/components/searchInput';
import { TSearchProps } from '@/types/types';

import Icon from '@/icon.svg';

export const Search: FunctionComponent<TSearchProps> = ({
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
        {searchTerm ? (
          <p className="search-term-description">
            Search results for <strong>{searchTerm}</strong>
          </p>
        ) : null}
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
        <p>
          No data to display for <strong>{searchTerm}</strong>
        </p>
        <div className="no-data-icon-wrapper">
          <Image
            src={Icon}
            alt="Vaider icon"
            width="100"
            className="no-data-icon"
          />
        </div>
      </div>
    )}
  </div>
);
