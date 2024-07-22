import { IStarWarsCharacter } from '../../types/types';

export function getKeysToPrint<T extends object>(obj: T) {
  const arr: IStarWarsCharacter[] = Object.values(obj);
  const keys: (keyof IStarWarsCharacter)[] = Object.keys(
    arr[0]
  ) as (keyof IStarWarsCharacter)[];
  const keysToPrint: string[] = [];

  const checkForStringValue = () => {
    keys.forEach((key) => {
      if (typeof arr[0][key] === 'string') {
        keysToPrint.push(key as string);
      }
    });
  };

  checkForStringValue();
  return keysToPrint;
}
