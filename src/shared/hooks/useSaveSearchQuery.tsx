'use client';

import { useEffect, useState } from 'react';

export const useSaveSearchQuery = (initialQuery = '') => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSearchTerm = localStorage.getItem('searchTerm');
      if (savedSearchTerm) {
        setSearchTerm(savedSearchTerm);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchTerm', searchTerm);
    }
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};
