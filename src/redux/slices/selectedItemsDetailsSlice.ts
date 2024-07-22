import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStarWarsCharacter } from '../../types/types';

type SelectedItemsDetailsState = {
  items: { [key: string]: IStarWarsCharacter } | null;
};

const initialState: SelectedItemsDetailsState = {
  items: null,
};

const selectedItemDetailsSlice = createSlice({
  name: 'selectedItemDetails',
  initialState,
  reducers: {
    setSelectedItem(state, action: PayloadAction<IStarWarsCharacter>) {
      if (!state.items) {
        state.items = {};
      }
      state.items[action.payload.name] = action.payload;
    },
    removeSelectedItemByName(state, action: PayloadAction<string>) {
      if (state.items) {
        const { [action.payload]: _, ...rest } = state.items;
        state.items = Object.keys(rest).length ? rest : null;
      }
    },
    clearAllSelectedItems(state) {
      state.items = null;
    },
  },
});

export const {
  setSelectedItem,
  removeSelectedItemByName,
  clearAllSelectedItems,
} = selectedItemDetailsSlice.actions;
export default selectedItemDetailsSlice.reducer;
