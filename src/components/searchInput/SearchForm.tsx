import { Button } from '../../shared/components/button/Button';
import { TSearchForm } from '@/types/types';
import React from 'react';

export const SearchForm: React.FC<TSearchForm> = ({
  handleFormSubmit,
  searchTerm,
  handleInputChange,
  isLoading,
}) => (
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
