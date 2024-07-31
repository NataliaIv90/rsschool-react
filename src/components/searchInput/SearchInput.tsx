import {
  ChangeEvent,
  FunctionComponent,
  JSX,
  useCallback,
  useState,
} from 'react';

import { SearchInputProps } from '@/types/types';
import { SearchForm } from './searchForm';

const SearchInput: FunctionComponent<SearchInputProps> = ({
  searchTerm: externalSearchTerm,
  onSearchTermChange,
  onSearch,
}): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState(externalSearchTerm);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const handleFormSubmit = useCallback(
    (
      event:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.preventDefault();
      onSearchTermChange(searchTerm);
      onSearch();
    },
    [onSearch, onSearchTermChange, searchTerm]
  );

  return (
    <SearchForm
      handleFormSubmit={handleFormSubmit}
      handleInputChange={handleInputChange}
      searchTerm={searchTerm}
    />
  );
};

export default SearchInput;
