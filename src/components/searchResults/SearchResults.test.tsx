import { fireEvent, render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import { mockedCharactersArr } from '../../tests/mocks/mock';
import { SearchResults } from './SearchResults';

vi.mock('../../shared/components/button/Button', () => ({
  Button: vi.fn(({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  )),
}));

vi.mock('./checkboxInput/CheckboxInput', () => ({
  CheckboxInput: vi.fn(() => (
    <input type="checkbox" data-testid="search-results-checkbox" />
  )),
}));

const onCharacterSelect = vi.fn<(id: string) => void>();

describe('SearchResults component', () => {
  it('Component renders properly', () => {
    render(
      <SearchResults
        results={mockedCharactersArr}
        onCharacterSelect={onCharacterSelect}
      />
    );

    mockedCharactersArr.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });

    expect(screen.getAllByRole('button')).toHaveLength(
      mockedCharactersArr.length
    );

    expect(screen.getAllByTestId('search-results-checkbox')).toHaveLength(
      mockedCharactersArr.length
    );
  });

  it('Button works properly', () => {
    render(
      <SearchResults
        results={mockedCharactersArr}
        onCharacterSelect={onCharacterSelect}
      />
    );

    const firstCharacter = mockedCharactersArr[0];
    fireEvent.click(screen.getByText(firstCharacter.name));

    expect(onCharacterSelect).toHaveBeenCalledWith(
      firstCharacter.url.split('/people/')[1].split('/')[0]
    );
  });
});
