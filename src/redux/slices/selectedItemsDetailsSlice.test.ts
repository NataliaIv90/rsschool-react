import selectedItemDetailsReducer, {
  setSelectedItem,
  removeSelectedItemByName,
  clearAllSelectedItems,
} from './selectedItemsDetailsSlice';
import { IStarWarsCharacter } from '../../types/types';
import { describe, expect, it } from 'vitest';

describe('selectedItemDetailsSlice', () => {
  it('should handle initial state', () => {
    expect(selectedItemDetailsReducer(undefined, { type: 'unknown' })).toEqual({
      items: null,
    });
  });

  it('should handle setSelectedItem', () => {
    const previousState = { items: null };
    const character: IStarWarsCharacter = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'Tatooine',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-10T16:16:29.192Z',
      edited: '2014-12-20T21:17:50.325Z',
      url: 'http://swapi.dev/api/people/1/',
    };
    expect(
      selectedItemDetailsReducer(previousState, setSelectedItem(character))
    ).toEqual({
      items: {
        'Luke Skywalker': character,
      },
    });
  });

  it('should handle removeSelectedItemByName', () => {
    const previousState = {
      items: {
        'Luke Skywalker': {
          name: 'Luke Skywalker',
          // other fields...
        } as IStarWarsCharacter,
      },
    };
    expect(
      selectedItemDetailsReducer(
        previousState,
        removeSelectedItemByName('Luke Skywalker')
      )
    ).toEqual({
      items: null,
    });
  });

  it('should handle clearAllSelectedItems', () => {
    const previousState = {
      items: {
        'Luke Skywalker': {
          name: 'Luke Skywalker',
          // other fields...
        } as IStarWarsCharacter,
      },
    };
    expect(
      selectedItemDetailsReducer(previousState, clearAllSelectedItems())
    ).toEqual({
      items: null,
    });
  });
});
