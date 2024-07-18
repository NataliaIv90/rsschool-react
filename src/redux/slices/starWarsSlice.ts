import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacterCardData } from '@/assets/data/dataArrays';

export type TStartWarsSliceState = {
  data: ICharacterCardData[] | [];
  isLoading: boolean;
  error: null | string;
  currentPage: number;
  count: number;
};

const initialState: TStartWarsSliceState = {
  data: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  count: 0,
};

export const starWarsDataSlice = createSlice({
  name: 'starWarsData',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export default starWarsDataSlice.reducer;
