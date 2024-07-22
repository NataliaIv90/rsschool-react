import React from 'react';
import { SearchResultsProps } from '../../types/types';
import { Button } from '../../shared/components/button/Button';
import { CheckboxInput } from './checkboxInput/CheckboxInput';

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onCharacterSelect,
}) => (
  <section className="search-results">
    {results.map((character) => (
      <section className="search-results-item" key={character.name}>
        <CheckboxInput character={character} />
        <Button
          classNames="search-results-btn"
          text={character.name}
          key={character.name}
          onClick={() =>
            onCharacterSelect(character.url.split('/people/')[1].split('/')[0])
          }
        />
      </section>
    ))}
  </section>
);

export default SearchResults;
