import axios from 'axios';
import { PeopleResponse, PeopleResult } from '../../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = `https://swapi.dev/api`;

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  tagTypes: ['Peoples', 'PeoplesById'],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<PeopleResponse, string>({
      query: (params) => `people?${params}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ url }) => ({
                type: 'Peoples' as const,
                url,
              })),
              { type: 'Peoples', id: 'LIST1' },
            ]
          : [{ type: 'Peoples', id: 'LIST1' }],
    }),
    getPeopleById: builder.query<PeopleResult, string>({
      query: (id) => `people/${id}`,
      providesTags: (result) =>
        result
          ? [
              ...[result].map(({ url }) => ({
                type: 'PeoplesById' as const,
                url,
              })),
              { type: 'PeoplesById', id: 'LIST2' },
            ]
          : [{ type: 'PeoplesById', id: 'LIST2' }],
    }),
  }),
});

export const { useGetAllPeopleQuery, useGetPeopleByIdQuery } = peopleApi;

export default class PeopleService {
  static async getAllPeople(page: number) {
    const resp: PeopleResponse = (
      await axios.get(URL, {
        params: {
          page,
        },
      })
    ).data;

    return resp;
  }

  static async getPeopleByName(name: string, page: number) {
    const resp: PeopleResponse = (
      await axios.get(URL, {
        params: {
          search: name,
          page,
        },
      })
    ).data;

    return resp;
  }

  static async getPeopleById(id: string) {
    const resp: PeopleResult = (await axios.get(`${URL}/${id}`)).data;

    return resp;
  }
}
