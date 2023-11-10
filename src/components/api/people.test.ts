import { beforeEach, describe, it, vi, MockedFunction, expect } from 'vitest';
import PeopleService from './people';
import axios from 'axios';
import { PeopleResponse, PeopleResult } from '../../types/types';

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  };
});

describe('get people data', () => {
  let responseAll: { data: PeopleResponse };
  let responseByName: { data: PeopleResponse };
  let responseById: { data: PeopleResult };

  beforeEach(() => {
    responseAll = {
      data: {
        count: 82,
        next: 'https://swapi.dev/api/people/?page=4',
        previous: 'https://swapi.dev/api/people/?page=2',
        results: [
          {
            birth_year: '31.5BBY',
            created: '2014-12-15T12:49:32.457000Z',
            edited: '2014-12-20T21:17:50.349000Z',
            eye_color: 'brown',
            films: [
              'https://swapi.dev/api/films/2/',
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/5/',
            ],
            gender: 'male',
            hair_color: 'black',
            height: '183',
            homeworld: 'https://swapi.dev/api/planets/10/',
            mass: '78.2',
            name: 'Boba Fett',
            skin_color: 'fair',
            species: [],
            starships: ['https://swapi.dev/api/starships/21/'],
            url: 'https://swapi.dev/api/people/22/',
            vehicles: [],
          },
          {
            birth_year: '15BBY',
            created: '2014-12-15T12:51:10.076000Z',
            edited: '2014-12-20T21:17:50.351000Z',
            eye_color: 'red',
            films: ['https://swapi.dev/api/films/2/'],
            gender: 'none',
            hair_color: 'none',
            height: '200',
            homeworld: 'https://swapi.dev/api/planets/28/',
            mass: '140',
            name: 'IG-88',
            skin_color: 'metal',
            species: ['https://swapi.dev/api/species/2/'],
            starships: [],
            url: 'https://swapi.dev/api/people/23/',
            vehicles: [],
          },
          {
            birth_year: '53BBY',
            created: '2014-12-15T12:53:49.297000Z',
            edited: '2014-12-20T21:17:50.355000Z',
            eye_color: 'red',
            films: ['https://swapi.dev/api/films/2/'],
            gender: 'male',
            hair_color: 'none',
            height: '190',
            homeworld: 'https://swapi.dev/api/planets/29/',
            mass: '113',
            name: 'Bossk',
            skin_color: 'green',
            species: ['https://swapi.dev/api/species/7/'],
            starships: [],
            url: 'https://swapi.dev/api/people/24/',
            vehicles: [],
          },
        ],
      },
    };
    responseByName = {
      data: {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            birth_year: '31.5BBY',
            created: '2014-12-15T12:49:32.457000Z',
            edited: '2014-12-20T21:17:50.349000Z',
            eye_color: 'brown',
            films: [
              'https://swapi.dev/api/films/2/',
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/5/',
            ],
            gender: 'male',
            hair_color: 'black',
            height: '183',
            homeworld: 'https://swapi.dev/api/planets/10/',
            mass: '78.2',
            name: 'Boba Fett',
            skin_color: 'fair',
            species: [],
            starships: ['https://swapi.dev/api/starships/21/'],
            url: 'https://swapi.dev/api/people/22/',
            vehicles: [],
          },
        ],
      },
    };
    responseById = {
      data: {
        birth_year: '31.5BBY',
        created: '2014-12-15T12:49:32.457000Z',
        edited: '2014-12-20T21:17:50.349000Z',
        eye_color: 'brown',
        films: [
          'https://swapi.dev/api/films/2/',
          'https://swapi.dev/api/films/3/',
          'https://swapi.dev/api/films/5/',
        ],
        gender: 'male',
        hair_color: 'black',
        height: '183',
        homeworld: 'https://swapi.dev/api/planets/10/',
        mass: '78.2',
        name: 'Boba Fett',
        skin_color: 'fair',
        species: [],
        starships: ['https://swapi.dev/api/starships/21/'],
        url: 'https://swapi.dev/api/people/22/',
        vehicles: [],
      },
    };
  });

  it('get peoples data', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue(
      responseAll
    );
    const page = 1;
    const data = await PeopleService.getAllPeople(page);

    expect(axios.get).toBeCalled;
    expect(data.results.length > 0).toBe(true);
  });

  it('get people by name data', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue(
      responseByName
    );
    const page = 1;
    const name = 'Boba';
    const data = await PeopleService.getPeopleByName(name, page);

    expect(axios.get).toBeCalled;
    expect(data.results[0].name).toBe('Boba Fett');
  });

  it('get people by id', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue(
      responseById
    );
    const id = '22';
    const data = await PeopleService.getPeopleById(id);
    const idFromUrl = data.url.match(/\d+/)?.[0];

    expect(axios.get).toBeCalled;
    expect(idFromUrl).toBe('22');
  });
});
