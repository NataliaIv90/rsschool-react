import { useSelector } from 'react-redux';
import { createAndDownloadFile } from '../utils/createAndDownloadFile';
import { createCSVRows } from '../utils/createCSVRows';
import { RootState } from '../../redux/store';

export const useHandleDownload = () => {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItemDetails.items
  );

  return () => {
    if (!selectedItems) return;

    const selectedItemsLength = selectedItems
      ? Object.keys(selectedItems).length
      : 0;
    const csvContent = createCSVRows(selectedItems);
    createAndDownloadFile(csvContent, selectedItemsLength);
  };
};
