import { PeopleResponse, PeopleResult } from '../../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

const URL = `https://swapi.dev/api`;

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getAllPeople: builder.query<PeopleResponse, string>({
      query: (params) => `people?${params}`,
    }),
    getPeopleById: builder.query<PeopleResult, string>({
      query: (id) => `people/${id}`,
    }),
  }),
});

export const {
  useGetAllPeopleQuery,
  useGetPeopleByIdQuery,
  util: { getRunningQueriesThunk },
} = peopleApi;

export const { getAllPeople, getPeopleById } = peopleApi.endpoints;
