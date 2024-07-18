import { configureStore } from '@reduxjs/toolkit';
import starWarsDataSlice from './slices/starWarsSlice';
import { starWarsApiSlice } from './slices/starWarsApiSlice';

export const store = configureStore({
  reducer: {
    starWarsStoreData: starWarsDataSlice,
    [starWarsApiSlice.reducerPath]: starWarsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApiSlice.middleware),
});
