import { configureStore } from '@reduxjs/toolkit';
import starWarsDataSlice from './slices/starWarsSlice';
import { starWarsApiSlice } from './slices/starWarsApiSlice';
import loaderReducer from './slices/loaderSlice';

// export type TRootState = {
//   loader: TLoaderState;
//   starWarsStoreData: TStartWarsSliceState;
//   starWarsApi: {
//     getListData: QueryDefinition<
//       TApiQueryProps,
//       BaseQueryFn<
//         string | FetchArgs,
//         unknown,
//         FetchBaseQueryError,
//         object,
//         FetchBaseQueryMeta
//       >,
//       never,
//       TResponseData,
//       'starWarsApi'
//     >;
//     getCharacterData: QueryDefinition<
//       { id: string },
//       BaseQueryFn<
//         string | FetchArgs,
//         unknown,
//         FetchBaseQueryError,
//         object,
//         FetchBaseQueryMeta
//       >,
//       never,
//       IStarWarsCharacter,
//       'starWarsApi'
//     >;
//   };
// };

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    starWarsStoreData: starWarsDataSlice,
    [starWarsApiSlice.reducerPath]: starWarsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
