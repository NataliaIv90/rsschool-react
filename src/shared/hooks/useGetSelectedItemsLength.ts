import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const useGetSelectedItemsNumber = (): number => {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItemDetails.items
  );

  const selectedItemsLength = selectedItems
    ? Object.keys(selectedItems).length
    : 0;

  return selectedItemsLength;
};
