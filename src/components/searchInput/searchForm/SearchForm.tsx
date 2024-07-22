import { RootState } from '@/redux/store';
import { Button } from '../../../shared/components/button/Button';
import { TSearchForm } from '@/types/types';
import React from 'react';
import { useSelector } from 'react-redux';

export const SearchForm: React.FC<TSearchForm> = ({
  handleFormSubmit,
  searchTerm,
  handleInputChange,
}): React.JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);

  return (
    <form className="search-form" onSubmit={handleFormSubmit}>
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
