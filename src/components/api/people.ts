import axios from 'axios';
import { PeopleResponse, PeopleResult } from '../../types/types';

const URL = `https://swapi.dev/api/people`;

export default class PeopleServise {
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
