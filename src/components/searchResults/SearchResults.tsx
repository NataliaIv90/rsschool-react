import React from 'react';
import { SearchResultsProps } from '../../types/types';
import CharacterCard from '../characterCard/CharacterCard';

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
}): JSX.Element => {
  return (
    <div className="cards">
      {results.length ? (
        results.map((result, index) => (
          <CharacterCard key={index} character={result} />
        ))
      ) : (
        <p>No results to display</p>
      )}
    </div>
  );
};

export default SearchResults;
