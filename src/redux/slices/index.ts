import { starWarsApiSlice } from './starWarsApiSlice';
import { selectedItemDetailsSlice } from './selectedItemsDetailsSlice';
import { loaderSlice } from './loaderSlice';
import { currentPageItemsSlice } from './currentPageItemsSlice';

export const { useGetListDataQuery, useGetCharacterDataQuery } =
  starWarsApiSlice;

export const {
  setSelectedItem,
  removeSelectedItemByName,
  clearAllSelectedItems,
} = selectedItemDetailsSlice.actions;

export const { startLoading, stopLoading } = loaderSlice.actions;

export const { setCurrentPageItems } = currentPageItemsSlice.actions;

export { starWarsApiSlice };
