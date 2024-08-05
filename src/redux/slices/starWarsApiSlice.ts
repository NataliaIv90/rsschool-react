import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IStarWarsCharacter,
  TApiQueryProps,
  TResponseData,
} from '@/types/types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const starWarsApiSlice = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  refetchOnMountOrArgChange: 60,
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
