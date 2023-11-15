import { beforeEach, describe, it, vi, MockedFunction, expect } from 'vitest';
import PeopleService from './people';
import axios from 'axios';
// import { PeopleResponse, PeopleResult } from '../../types/types';
import { responseAll, responseByName, responseById } from '../../test/mockData';

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
  beforeEach(() => {
    responseAll;
    responseById;
    responseByName;
  });

  it('should get peoples data', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue(
      responseAll
    );
    const page = 1;
    const data = await PeopleService.getAllPeople(page);

    expect(axios.get).toBeCalled;
    expect(data.results.length > 0).toBe(true);
  });

  it('should get people by name data', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue(
      responseByName
    );
    const page = 1;
    const name = 'Boba';
    const data = await PeopleService.getPeopleByName(name, page);

    expect(axios.get).toBeCalled;
    expect(data.results[0].name).toBe('Boba Fett');
  });

  it('should get people by id', async () => {
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
