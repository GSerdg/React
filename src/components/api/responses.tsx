import axios from 'axios';
import { PeopleResponse } from '../../types/types';

export default class ResponseServise {
  static async getAll(page = 1) {
    const resp: PeopleResponse = (
      await axios.get(`https://swapi.dev/api/people`, {
        params: {
          page,
        },
      })
    ).data;

    return resp;
  }

  static async getForName(name: string) {
    const resp: PeopleResponse = (
      await axios.get(`https://swapi.dev/api/people`, {
        params: {
          search: name,
        },
      })
    ).data;

    return resp;
  }
}
