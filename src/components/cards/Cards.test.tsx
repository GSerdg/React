import { MockedFunction, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardsWrapper from './CardsWrapper';
import PeopleService from '../api/people';
import { PeopleResponse, PeopleResult } from '../../types/types';
import { userEvent } from '@testing-library/user-event';
import DetailedCards from '../card-details/DetailedCards';

vi.mock('react-router-dom', async (importOriginal) => {
  let loading = false;
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useOutletContext: () => ({
      setIsLoadingState(state: boolean) {
        loading = state;
      },
      isLoading: loading,
    }),
    useParams: () => ({
      page: 'page=1',
    }),
  };
});

vi.mock('../api/people');

const Mocktest = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CardsWrapper />} />
        <Route path={'/:page'} element={<CardsWrapper />}>
          <Route path={'/:page/:details'} element={<DetailedCards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

describe('Get cards', () => {
  let responseAll: PeopleResponse;
  let responseEmpty: PeopleResponse;
  let responseId: PeopleResult;

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
    responseEmpty = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
    responseId = {
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
    };
  });

  it('component renders the specified number of cards', async () => {
    (
      PeopleService.getAllPeople as MockedFunction<
        typeof PeopleService.getAllPeople
      >
    ).mockResolvedValue(responseAll);

    render(<Mocktest />);

    expect((await screen.findAllByTestId('people-card')).length).toBe(3);

    for (let i = 0; i < 8; i++) {
      await userEvent.click(screen.getByText('-'));
    }

    await userEvent.click(screen.getByText('Set'));
    expect((await screen.findAllByTestId('people-card')).length).toBe(2);

    await userEvent.click(screen.getByText('-'));
    await userEvent.click(screen.getByText('Set'));
    expect((await screen.findAllByTestId('people-card')).length).toBe(1);
  });

  it('message is displayed if no cards are present', async () => {
    (
      PeopleService.getAllPeople as MockedFunction<
        typeof PeopleService.getAllPeople
      >
    ).mockResolvedValue(responseEmpty);

    render(<Mocktest />);

    const header = await screen.findByRole('heading', {
      level: 2,
    });

    expect(header).toHaveTextContent(/Page not found/);
  });

  it('clicking on a card opens a detailed card component', async () => {
    (
      PeopleService.getAllPeople as MockedFunction<
        typeof PeopleService.getAllPeople
      >
    ).mockResolvedValue(responseAll);
    (
      PeopleService.getPeopleById as MockedFunction<
        typeof PeopleService.getPeopleById
      >
    ).mockResolvedValue(responseId);

    render(<Mocktest />);

    const card = await screen.findAllByTestId('people-card');

    expect(screen.queryByTestId('cardDetailsContainer')).toBeNull;
    await userEvent.click(card[0]);
    expect(
      await screen.findByTestId('cardDetailsContainer')
    ).toBeInTheDocument();
  });
});
