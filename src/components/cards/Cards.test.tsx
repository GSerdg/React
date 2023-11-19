import { MockedFunction, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PeopleResponse } from '../../types/types';
import { userEvent } from '@testing-library/user-event';
import { DetailedCards } from '../card-details/DetailedCard';
import { responseAll, responseById } from '../../test/mockData';
import { renderWithProviders } from '../../test/testUtils';
import Cards from './Cards';

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

// vi.mock('../api/people');

const Mocktest = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Cards />} />
        <Route path={'/:page'} element={<Cards />}>
          <Route path={'/:page/:details'} element={<DetailedCards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

describe('Get cards', () => {
  let responseEmpty: PeopleResponse;

  /*   beforeEach(() => {
    responseAll;
    responseById;
    responseEmpty = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  });
 */
  it('component should renders the specified number of cards', async () => {
    /* (
       PeopleService.getAllPeople as MockedFunction<
        typeof PeopleService.getAllPeople
      >
    ).mockResolvedValue(responseAll.data);
 */
    //render(<Mocktest />);
    renderWithProviders(<Mocktest />);

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

  it('should show the message if there are no cards', async () => {
    (
      PeopleService.getAllPeople as MockedFunction<
        typeof PeopleService.getAllPeople
      >
    ).mockResolvedValue(responseEmpty);

    render(<Mocktest />);

    const header = await screen.findByRole('heading', {
      level: 2,
    });

    expect(header).toHaveTextContent(/Not found/);
  });

  it('should open a detailed card when clicking on a card', async () => {
    (
      PeopleService.getAllPeople as MockedFunction<
        typeof PeopleService.getAllPeople
      >
    ).mockResolvedValue(responseAll.data);
    (
      PeopleService.getPeopleById as MockedFunction<
        typeof PeopleService.getPeopleById
      >
    ).mockResolvedValue(responseById.data);

    render(<Mocktest />);

    const card = await screen.findAllByTestId('people-card');

    expect(screen.queryByTestId('cardDetailsContainer')).toBeNull();
    await userEvent.click(card[0]);
    expect(
      await screen.findByTestId('cardDetailsContainer')
    ).toBeInTheDocument();
  });
});
