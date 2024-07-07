import React from 'react';
import { IStarWarsCharacter } from '../searchPage/SearchPage';
import CharacterCard from '../characterCard/CharacterCard';

interface SearchResultsProps {
  results: IStarWarsCharacter[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
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
