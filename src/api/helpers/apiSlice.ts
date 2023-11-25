import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiBase from '../constants/apiBase';
import limitsPerPage from '../constants/limitsPerPage';
import { SearchResponse } from '../../types';

interface SearchQueryType {
  path: string;
  search: string;
  page: number;
  limit?: string | number;
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
  }),
});

export const { useGetSearchResultQuery } = apiSlice;
