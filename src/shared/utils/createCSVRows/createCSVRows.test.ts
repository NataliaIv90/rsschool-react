import { describe, expect, test } from 'vitest';
import { createCSVRows } from './createCSVRows';
import { IStarWarsCharacter } from '../../../types/types';
import { mockedCharactersArr } from '../../../tests/mocks/mock';

describe('createCSVRows', () => {
  test('should return correct CSV content', () => {
    const characters = {
      character1: mockedCharactersArr[0],
      character2: mockedCharactersArr[3],
    };
    const csvContent = createCSVRows(characters);
    const expectedHeader =
      'name,height,mass,hair_color,skin_color,eye_color,birth_year,gender,homeworld,created,edited,url';
    const expectedRow1 =
      'Luke Skywalker,172,77,blond,fair,blue,19BBY,male,https://swapi.dev/api/planets/1/,2014-12-09T13:50:51.644000Z,2014-12-20T21:17:56.891000Z,https://swapi.dev/api/people/1/';
    const expectedRow2 =
      'Darth Vader,202,136,none,white,yellow,41.9BBY,male,https://swapi.dev/api/planets/1/,2014-12-10T15:18:20.704000Z,2014-12-20T21:17:50.313000Z,https://swapi.dev/api/people/4/';

    const expectedCSVContent = `${expectedHeader}\n${expectedRow1}\n${expectedRow2}`;
    expect(csvContent).toBe(expectedCSVContent);
  });

  test('should return correct CSV content with empty values', () => {
    const mockCharacterWithEmptyValues: IStarWarsCharacter = {
      ...mockedCharactersArr[0],
      name: '',
      height: '',
    };

    const characters = { character1: mockCharacterWithEmptyValues };
    const csvContent = createCSVRows(characters);
    const expectedHeader =
      'name,height,mass,hair_color,skin_color,eye_color,birth_year,gender,homeworld,created,edited,url';
    const expectedRow =
      ',,77,blond,fair,blue,19BBY,male,https://swapi.dev/api/planets/1/,2014-12-09T13:50:51.644000Z,2014-12-20T21:17:56.891000Z,https://swapi.dev/api/people/1/';

    const expectedCSVContent = `${expectedHeader}\n${expectedRow}`;
    expect(csvContent).toBe(expectedCSVContent);
  });
});
