import React from 'react';
import CharacterCard from '../characterCard/CharacterCard';
import { Button } from '../../shared/components/button/Button';
import { IStarWarsCharacter, TVoidFunction } from '../../types/types';

export type TCardWrapper = {
  character?: IStarWarsCharacter;
  handleClose: TVoidFunction;
};

export const CardWrapper: React.FC<TCardWrapper> = ({
  character,
  handleClose,
}): React.JSX.Element => (
  <section className="detailed-section">
    {character ? (
      <CharacterCard character={character} />
    ) : (
      <p>No character found.</p>
    )}
    <Button text="Close card" onClick={handleClose} />
  </section>
);
