import { describe, expect, test } from 'vitest';
import { getKeysToPrint } from './getKeysToPrint';
import { mockedCharacter } from '../../../tests/mocks/mock';

describe('getKeysToPrint', () => {
  test('should return keys with string values', () => {
    const keysToPrint = getKeysToPrint({ character: mockedCharacter });
    expect(keysToPrint).toEqual([
      'name',
      'height',
      'mass',
      'hair_color',
      'skin_color',
      'eye_color',
      'birth_year',
      'gender',
      'homeworld',
      'created',
      'edited',
      'url',
    ]);
  });
});
