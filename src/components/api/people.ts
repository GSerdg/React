import axios from 'axios';
import { PeopleResponse, PeopleResult } from '../../types/types';

export default class PeopleServise {
  static async getAllPeople(page: number) {
    const resp: PeopleResponse = (
      await axios.get(`https://swapi.dev/api/people`, {
        params: {
          page,
        },
      })
    ).data;

    return resp;
  }

  static async getPeopleByName(name: string, page: number) {
    const resp: PeopleResponse = (
      await axios.get(`https://swapi.dev/api/people`, {
        params: {
          search: name,
          page,
        },
      })
    ).data;

    return resp;
  }

  static async getPeopleByLink(link: string) {
    const resp: PeopleResult = (await axios.get(link)).data;

    return resp;
  }
}
