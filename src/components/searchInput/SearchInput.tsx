import React, { ChangeEvent } from 'react';

interface SearchInputProps {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isLoading,
}): JSX.Element => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter the query..."
        className="form-input"
      />
      <button
        type="submit"
        onClick={handleSearchClick}
        disabled={isLoading}
        className="btn"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
