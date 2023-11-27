import { PeopleResponse, PeopleResult } from '../../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = `https://swapi.dev/api`;

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<PeopleResponse, string>({
      query: (params) => `people?${params}`,
    }),
    getPeopleById: builder.query<PeopleResult, string>({
      query: (id) => `people/${id}`,
    }),
  }),
});

export const { useGetAllPeopleQuery, useGetPeopleByIdQuery } = peopleApi;
