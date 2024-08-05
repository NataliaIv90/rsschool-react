import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TResponseData } from '../../types/types';

type CurrentPageItemsState = {
  items: TResponseData;
};

const initialState: CurrentPageItemsState = {
  items: {} as TResponseData,
};

export const currentPageItemsSlice = createSlice({
  name: 'currentPageItems',
  initialState,
  reducers: {
    setCurrentPageItems(state, action: PayloadAction<TResponseData>) {
      state.items = action.payload;
    },
  },
});

export const { setCurrentPageItems } = currentPageItemsSlice.actions;
export default currentPageItemsSlice.reducer;
