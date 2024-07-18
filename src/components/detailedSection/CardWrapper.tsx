import React from 'react';
import CharacterCard from '../characterCard/CharacterCard';
import { Button } from '@/shared/components/button/Button';
import { IStarWarsCharacter, TVoidFunction } from '@/types/types';

export type TCardWrapper = {
  character: IStarWarsCharacter;
  handleClose: TVoidFunction;
};

export const CardWrapper: React.FC<TCardWrapper> = ({
  character,
  handleClose,
}) => (
  <div className="detailed-section">
    <CharacterCard character={character} />
    <Button text="Close card" onClick={handleClose} />
  </div>
);
