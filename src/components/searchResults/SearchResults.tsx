import React from 'react';
import { SearchResultsProps } from '../../types/types';
import { Button } from '../../shared/components/button/Button';

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onCharacterSelect,
}) => (
  <div className="search-results">
    {results.map((character) => (
      <div className="search-results-item" key={character.name}>
        <input
          className="search-results-checkbox"
          type="checkbox"
          name="selected-character"
          id={character.name.replaceAll(' ', '')}
        />
        <Button
          classNames="search-results-btn"
          text={character.name}
          key={character.name}
          onClick={() =>
            onCharacterSelect(character.url.split('/people/')[1].split('/')[0])
          }
        />
      </div>
    ))}
  </div>
);

export default SearchResults;
