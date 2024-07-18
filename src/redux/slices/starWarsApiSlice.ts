import {
  IStarWarsCharacter,
  TApiQueryProps,
  TResponseData,
} from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://swapi.dev/api/';

export const starWarsApiSlice = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getListData: builder.query<TResponseData, TApiQueryProps>({
      query: ({ page, searchTerm }) =>
        `people/?page=${page || 1}${searchTerm ? `&search=${searchTerm}` : ''}`,
    }),
    getCharacterData: builder.query<IStarWarsCharacter, { id: string }>({
      query: ({ id }) => `people/${id}`,
    }),
  }),
});

export const { useGetListDataQuery, useGetCharacterDataQuery } =
  starWarsApiSlice;
