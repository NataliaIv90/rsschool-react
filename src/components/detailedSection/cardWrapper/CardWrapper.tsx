import { FunctionComponent, JSX } from 'react';

import { Button } from '@/shared/components';
import { CharacterCard } from '@/components/characterCard';
import { IStarWarsCharacter, TVoidFunction } from '@/types/types';

export type TCardWrapper = {
  character?: IStarWarsCharacter;
  handleClose: TVoidFunction;
};

export const CardWrapper: FunctionComponent<TCardWrapper> = ({
  character,
  handleClose,
}): JSX.Element => (
  <section className="detailed-section">
    {character ? (
      <CharacterCard character={character} />
    ) : (
      <p>No character found.</p>
    )}
    <Button text="Close card" onClick={handleClose} />
  </section>
);
