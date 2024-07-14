import React from 'react';
import { SearchResultsProps } from '../../types/types';

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onCharacterSelect,
}) => {
  return (
    <div className="search-results">
      {results.map((character) => (
        <button
          key={character.name}
          className="btn"
          onClick={() =>
            onCharacterSelect(character.url.split('/people/')[1].split('/')[0])
          }
        >
          {character.name}
        </button>
      ))}
    </div>
  );
};

export default SearchResults;
