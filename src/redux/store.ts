import { configureStore } from '@reduxjs/toolkit';
import starWarsDataSlice from './slices/starWarsSlice';
import { starWarsApiSlice } from './slices/starWarsApiSlice';
import loaderReducer from './slices/loaderSlice';
import currentPageItemsReducer from './slices/currentPageItemsSlice';
import selectedItemDetailsReducer from './slices/selectedItemsDetailsSlice';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    starWarsStoreData: starWarsDataSlice,
    [starWarsApiSlice.reducerPath]: starWarsApiSlice.reducer,
    currentPageItems: currentPageItemsReducer,
    selectedItemDetails: selectedItemDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
