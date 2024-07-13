import React from 'react';
import { IStarWarsCharacter } from '../searchPage/SearchPage';

interface CharacterCardProps {
  character: IStarWarsCharacter;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
}): JSX.Element => (
  <div className="character-card">
    <div className="card-image"></div>
    <div className="card-content">
      <h2 className="card-title">{character.name}</h2>
      <p>
        <span>Height:</span>
        <span> {character.height} cm</span>
      </p>
      <p>
        <span>Mass:</span>
        <span> {character.mass} kg</span>
      </p>
      <p>
        <span>Hair Color:</span>
        <span> {character.hair_color}</span>
      </p>
      <p>
        <span>Skin Color:</span>
        <span> {character.skin_color}</span>
      </p>
      <p>
        <span>Eye Color:</span>
        <span> {character.eye_color}</span>
      </p>
      <p>
        <span>Birth Year:</span>
        <span> {character.birth_year}</span>
      </p>
      <p>
        <span>Gender:</span>
        <span> {character.gender}</span>
      </p>
    </div>
  </div>
);

export default CharacterCard;
