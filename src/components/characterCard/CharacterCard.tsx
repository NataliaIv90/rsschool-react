import React from 'react';
import { ICharacterCardProps } from '../../types/types';
import { characterCardData } from '../../assets/data/dataArrays';

const CharacterCard: React.FC<ICharacterCardProps> = ({
  character,
}): JSX.Element => (
  <div className="character-card">
    <div className="card-image"></div>
    <div className="card-content">
      <h2 className="card-title">{character.name}</h2>
      {characterCardData.map((data) => (
        <p key={data.value}>
          <span>{data.text}:</span>
          <span>
            {character[data.value]} {data.measurement ? data.measurement : ''}
          </span>
        </p>
      ))}
    </div>
  </div>
);

export default CharacterCard;
