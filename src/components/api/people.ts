import axios from 'axios';
import { PeopleResponse } from '../../types/types';

export default class PeopleServise {
  static async getAllPeople(page = 1) {
    const resp: PeopleResponse = (
      await axios.get(`https://swapi.dev/api/people`, {
        params: {
          page,
        },
      })
    ).data;

    return resp;
  }

  static async getPeopleByName(name: string) {
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
