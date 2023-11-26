import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiBase from '../constants/apiBase';
import limitsPerPage from '../constants/limitsPerPage';
import { CharacterResponse, SearchResponse } from '../../types';

interface SearchQueryType {
  path: string;
  search: string;
  page: number;
  limit?: string | number;
}

interface CharacterSearchQueryType {
  path: string;
  id: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiBase.baseUrl }),
  endpoints: (builder) => ({
    getSearchResult: builder.query<SearchResponse, SearchQueryType>({
      query: ({ path, search = '', page = 1, limit = limitsPerPage.opt1 }) => {
        return `${path}?filter[name_cont]=${search}&page[size]=${limit}&page[number]=${page || '1'}`;
      },
    }),
    getCharacterResult: builder.query<CharacterResponse, CharacterSearchQueryType>({
      query: ({ path, id }) => `${path}${id}`,
    }),
  }),
});

export const { useGetSearchResultQuery, useGetCharacterResultQuery } = apiSlice;
