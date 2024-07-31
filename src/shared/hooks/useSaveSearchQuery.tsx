import { useEffect, useState } from 'react';

export const useSaveSearchQuery = (initialQuery = '') => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    // Check if window is defined to ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      const savedSearchTerm = localStorage.getItem('searchTerm');
      if (savedSearchTerm) {
        setSearchTerm(savedSearchTerm);
      }
    }
  }, []);

  useEffect(() => {
    // Save the search term to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchTerm', searchTerm);
    }
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

// import { useState, useEffect } from 'react';

// export const useSaveSearchQuery = (initialQuery = '') => {
//   const [searchTerm, setSearchTerm] = useState(() => {
//     return localStorage.getItem('searchTerm') || initialQuery;
//   });

//   useEffect(() => {
//     localStorage.setItem('searchTerm', searchTerm);
//   }, [searchTerm]);

//   return [searchTerm, setSearchTerm] as const;
// };
