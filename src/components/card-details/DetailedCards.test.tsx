import { MockedFunction, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import DetailedCards from './DetailedCards';
import PeopleService from '../api/people';
import { PeopleResult } from '../../types/types';
import navigateToPage from '../../shared/navigate';

let card: number | undefined = 5;

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useOutletContext: () => ({
      isCloseDetailed: false,
      currentPage: 1,
    }),
    useParams: () => ({
      cardId: card,
    }),
  };
});

vi.mock('../api/people');
vi.mock('../../shared/navigate');

const Mocktest = () => {
  return (
    <BrowserRouter>
      <DetailedCards />
    </BrowserRouter>
  );
};

describe('Detailed Card', () => {
  let response: PeopleResult;

  beforeEach(() => {
    response = {
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

  it('view loading', async () => {
    (
      PeopleService.getPeopleById as MockedFunction<
        typeof PeopleService.getPeopleById
      >
    ).mockResolvedValue(response);
    card = 4;
    render(<Mocktest />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('detailed-card')).toBeNull;

    const detailedCard = await screen.findByTestId('detailed-card');

    expect(screen.queryByText('Loading...')).toBeNull();
    expect(detailedCard).toBeInTheDocument;
  });

  it('Close detailed card', async () => {
    (
      PeopleService.getPeopleById as MockedFunction<
        typeof PeopleService.getPeopleById
      >
    ).mockResolvedValue(response);

    navigateToPage as MockedFunction<typeof navigateToPage>;
    card = 4;

    render(<Mocktest />);

    const closeBtn = screen.getByRole('button');

    expect(closeBtn).toHaveTextContent('Close');
    await userEvent.click(closeBtn);
    expect(navigateToPage).toHaveBeenCalledTimes(1);
  });

  it('View card data', async () => {
    const dataTitle = [
      'gender',
      'birth year',
      'height',
      'eye color',
      'hair color',
      'mass',
      'skin color',
    ];

    (
      PeopleService.getPeopleById as MockedFunction<
        typeof PeopleService.getPeopleById
      >
    ).mockResolvedValue(response);
    card = 4;
    render(<Mocktest />);

    const detailedCard = await screen.findByTestId('detailed-card');
    expect(detailedCard).toBeInTheDocument;

    dataTitle.map((item) => {
      expect(screen.getByText(new RegExp(item))).toBeInTheDocument();
    });
  });

  it('API call to fetch detailed information', async () => {
    (
      PeopleService.getPeopleById as MockedFunction<
        typeof PeopleService.getPeopleById
      >
    ).mockResolvedValue(response);
    navigateToPage as MockedFunction<typeof navigateToPage>;
    card = 4;
    render(<Mocktest />);

    expect(PeopleService.getPeopleById).toHaveBeenCalledTimes(4);
  });
});
