import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { starWarsApiSlice } from './slices/starWarsApiSlice';
import loaderReducer from './slices/loaderSlice';
import currentPageItemsReducer from './slices/currentPageItemsSlice';
import selectedItemDetailsReducer from './slices/selectedItemsDetailsSlice';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    [starWarsApiSlice.reducerPath]: starWarsApiSlice.reducer,
    currentPageItems: currentPageItemsReducer,
    selectedItemDetails: selectedItemDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApiSlice.middleware),
});

export const rootReducer = combineReducers({
  loader: loaderReducer,
  [starWarsApiSlice.reducerPath]: starWarsApiSlice.reducer,
  currentPageItems: currentPageItemsReducer,
  selectedItemDetails: selectedItemDetailsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
