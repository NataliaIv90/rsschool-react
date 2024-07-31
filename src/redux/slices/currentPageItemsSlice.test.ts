import currentPageItemsReducer, {
  setCurrentPageItems,
} from './currentPageItemsSlice';
import { TResponseData } from '../../types/types';
import { describe, expect, it } from 'vitest';

describe('currentPageItemsSlice', () => {
  it('should handle initial state', () => {
    expect(currentPageItemsReducer(undefined, { type: 'unknown' })).toEqual({
      items: {},
    });
  });

  it('should handle setCurrentPageItems', () => {
    const previousState = { items: {} };
    const newItems: TResponseData = {
      count: 1,
      next: undefined,
      previous: undefined,
      results: [
        {
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
        },
      ],
    };

    expect(
      currentPageItemsReducer(previousState, setCurrentPageItems(newItems))
    ).toEqual({
      items: newItems,
    });
  });
});
