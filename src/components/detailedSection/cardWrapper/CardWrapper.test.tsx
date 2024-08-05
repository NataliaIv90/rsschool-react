import { describe, vi, it, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';

import { CardWrapper } from './CardWrapper';
import { IStarWarsCharacter } from '@/types/types';
import { mockedCharacter } from '@/tests/mocks/mock';
import { renderWithProviders } from '@/tests/renderWithProviders';

const handleClose = vi.fn();

vi.mock('../../shared/components/button/Button', () => ({
  Button: vi.fn(({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  )),
}));

vi.mock('../../characterCard/CharacterCard', async (importOriginal) => {
  const originalModule: object = await importOriginal();
  return {
    ...originalModule,
    CharacterCard: ({ character }: { character: IStarWarsCharacter }) => (
      <div>
        <span>{character.name}</span>
      </div>
    ),
  };
});

describe('CardWrapper renders correctly', () => {
  it('renders the character data and close button', () => {
    renderWithProviders(
      <CardWrapper handleClose={handleClose} character={mockedCharacter} />
    );

    expect(screen.getByText(mockedCharacter.name)).toBeInTheDocument();
    expect(screen.getByText('Close card')).toBeInTheDocument();
  });

  it('close button works properly', () => {
    renderWithProviders(
      <CardWrapper handleClose={handleClose} character={mockedCharacter} />
    );
    fireEvent.click(screen.getByText('Close card'));
    expect(handleClose).toBeCalled();
  });

  it('renders the page properly in case there is no character data', () => {
    renderWithProviders(
      <CardWrapper handleClose={handleClose} character={undefined} />
    );

    expect(screen.getByText('No character found.')).toBeInTheDocument();
    expect(screen.getByText('Close card')).toBeInTheDocument();
  });
});
