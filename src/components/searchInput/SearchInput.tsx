import { Component, ChangeEvent } from 'react';

interface SearchInputProps {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

class SearchInput extends Component<SearchInputProps> {
  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchTermChange(event.target.value);
  };

  handleSearchClick = () => {
    this.props.onSearch();
  };

  render() {
    const { searchTerm, isLoading } = this.props;

    return (
      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={this.handleInputChange}
          placeholder="Search..."
        />
        <button
          type="submit"
          onClick={this.handleSearchClick}
          disabled={isLoading}
        >
          Search
        </button>
      </form>
    );
  }
}

export default SearchInput;
