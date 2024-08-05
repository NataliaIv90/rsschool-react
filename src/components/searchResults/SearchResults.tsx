import React from 'react';

import { Button } from '@/shared/components';
import { CheckboxInput } from './checkboxInput';
import { SearchResultsProps } from '@/types/types';

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onCharacterSelect,
}) => (
  <ul className="search-results">
    {results.map((character) => (
      <li className="search-results-item" key={character.name}>
        <CheckboxInput character={character} />
        <Button
          classNames="search-results-btn"
          text={character.name}
          key={character.name}
          onClick={() =>
            onCharacterSelect(character.url.split('/people/')[1].split('/')[0])
          }
        />
      </li>
    ))}
  </ul>
);
