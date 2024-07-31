import { FC } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/shared/components';
import { RootState } from '@/redux/store';
import { TSearchForm } from '@/types/types';

export const SearchForm: FC<TSearchForm> = ({
  handleFormSubmit,
  searchTerm,
  handleInputChange,
}): React.JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);

  return (
    <form
      className="search-form"
      onSubmit={handleFormSubmit}
      data-testid="search-form"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter the query..."
        className="form-input"
      />
      <Button
        text="Search"
        onEventClick={handleFormSubmit}
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
};
