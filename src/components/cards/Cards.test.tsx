import { MockedFunction, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CardsWrapper from './CardsWrapper';
// import axios from 'axios';
import PeopleService from '../api/people';
import { PeopleResponse } from '../../types/types';

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useOutletContext: () => ({
      isLoading: false,
    }),
    useParams: () => ({
      page: 1,
    }),
  };
});

vi.mock('../api/people');

const Mocktest = () => {
  return (
    <BrowserRouter>
      <CardsWrapper />
    </BrowserRouter>
  );
};

/* describe('Cards component', () => {
  it('Render', () => {
    // ARRANGE
    render(<Mocktest />);
    // ACT
    // EXPECT
    expect(screen.getAllByRole('button').length).toBe(5);
  });
});
 */
describe('Get cards', () => {
  let responseAll: PeopleResponse;

  beforeEach(() => {
    responseAll = {
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
    };
  });

  it('get Peoples', async () => {
    (
      PeopleService.getAllPeople as MockedFunction<
        typeof PeopleService.getAllPeople
      >
    ).mockResolvedValue(responseAll);
    // mock.mockResolvedValue(responseAll);
    /*     const data = await PeopleService.getAllPeople(1);
    console.log(data);
 */ render(<Mocktest />);
    // screen.debug();
    const peoples = await screen.findAllByTestId('people-card');
    // screen.debug();
    expect(peoples.length).toBe(3);
  });
});
