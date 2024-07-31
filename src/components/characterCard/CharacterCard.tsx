import React from 'react';
import { ICharacterCardProps } from '../../types/types';
import { characterCardData } from '../../assets/data/dataArrays';
import { EContextValue } from '../../types/types';
import { useTheme } from '../../shared/context/themeContext/useTheme';

const CharacterCard: React.FC<ICharacterCardProps> = ({
  character,
}): React.JSX.Element => {
  const theme = useTheme().theme;

  return (
    <article
      className={`character-card${theme === EContextValue.DARK ? ' dark' : ''}`}
    >
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
    </article>
  );
};

export default CharacterCard;
