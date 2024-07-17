import React from 'react';
import { SearchResultsProps } from '../../types/types';
import { Button } from '../../shared/components/button/Button';

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onCharacterSelect,
}) => (
  <div className="search-results">
    {results.map((character) => (
      <Button
        text={character.name}
        key={character.name}
        onClick={() =>
          onCharacterSelect(character.url.split('/people/')[1].split('/')[0])
        }
      />
    ))}
  </div>
);

export default SearchResults;
