import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStarWarsCharacter } from '../../types/types';

type SelectedItemsDetailsState = {
  items: IStarWarsCharacter[] | null;
};

const initialState: SelectedItemsDetailsState = {
  items: null,
};

const selectedItemDetailsSlice = createSlice({
  name: 'selectedItemDetails',
  initialState,
  reducers: {
    setSelectedItem(state, action: PayloadAction<IStarWarsCharacter>) {
      state.items = state.items
        ? [...state.items, action.payload]
        : [action.payload];
    },
    removeSelectedItemByName(state, action: PayloadAction<string>) {
      if (state.items) {
        state.items = state.items.filter(
          (item) => item.name !== action.payload
        );
      }
    },
    clearAllSelectedItems(state) {
      state.items = [];
    },
  },
});

export const {
  setSelectedItem,
  removeSelectedItemByName,
  clearAllSelectedItems,
} = selectedItemDetailsSlice.actions;
export default selectedItemDetailsSlice.reducer;
