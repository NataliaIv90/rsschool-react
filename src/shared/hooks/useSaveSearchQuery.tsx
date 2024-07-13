import { useState, useEffect } from 'react';

export const useSaveSearchQuery = (initialQuery: string = '') => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('searchTerm') || initialQuery;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem('searchTerm', searchTerm);
    };
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};
