import { IStarWarsCharacter } from '../../types/types';
import { getKeysToPrint } from './getKeysToPrint';

export function createCSVRows<T extends object>(selectedItems: T): string {
  const keys = getKeysToPrint(selectedItems);
  const header = keys.join(',');

  const rows = Object.values(selectedItems).map((el) => {
    let row = '';
    keys.forEach((key, index) => {
      row +=
        ((el[key as keyof IStarWarsCharacter] || '') as string) +
        (index < keys.length - 1 ? ',' : '');
    });
    return row;
  });

  const csvContent = header + rows;

  return csvContent;
}
