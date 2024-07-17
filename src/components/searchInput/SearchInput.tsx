import React, { ChangeEvent, useCallback } from 'react';
import { SearchInputProps } from '../../types/types';
import { Button } from '../../shared/components/button/Button';

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isLoading,
}): JSX.Element => {
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearchTermChange(event.target.value);
    },
    [onSearchTermChange]
  );

  const handleSearchClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onSearch();
    },
    [onSearch]
  );

  return (
    <form className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter the query..."
        className="form-input"
      />
      <Button
        text="Search"
        onEventClick={handleSearchClick}
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
};

export default SearchInput;
