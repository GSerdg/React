import axios from 'axios';
import { PeopleResponse, PeopleResult } from '../../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsNextPage, setIsPrevPage } from '../../app/cardsSlice';

const URL = `https://swapi.dev/api`;

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  tagTypes: ['Peoples'],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<PeopleResponse, number>({
      query: (page) => `people?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ url }) => ({
                type: 'Peoples' as const,
                url,
              })),
              { type: 'Peoples', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const { useGetAllPeopleQuery } = peopleApi;

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
