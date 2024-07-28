import { IStarWarsCharacter } from '../../../types/types';
import { getKeysToPrint } from '../getKeysToPrint/getKeysToPrint';

export function createCSVRows<T extends object>(selectedItems: T): string {
  const keys = getKeysToPrint(selectedItems);
  const header = keys.join(',');

  const rows = Object.values(selectedItems).map((el) => {
    return keys
      .map((key) => (el[key as keyof IStarWarsCharacter] || '') as string)
      .join(',');
  });

  const csvContent = [header, ...rows].join('\n');

  return csvContent;
}
