import { IStarWarsCharacter } from '../../types/types';

export interface ICharacterCardData {
  text: string;
  value: keyof IStarWarsCharacter;
  measurement?: string;
}

export const characterCardData: ICharacterCardData[] = [
  { text: 'Height', value: 'height', measurement: 'cm' },
  { text: 'Mass', value: 'mass', measurement: 'kg' },
  { text: 'Hair Color', value: 'hair_color', measurement: undefined },
  { text: 'Skin Color', value: 'skin_color', measurement: undefined },
  { text: 'Eye Color', value: 'eye_color', measurement: undefined },
  { text: 'Birth Year', value: 'birth_year', measurement: undefined },
  { text: 'Gender', value: 'gender', measurement: undefined },
];
