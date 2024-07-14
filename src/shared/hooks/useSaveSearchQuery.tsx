import { useState, useEffect } from 'react';

export const useSaveSearchQuery = (initialQuery = '') => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('searchTerm') || initialQuery;
  });

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};
