import { MockedFunction, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { DetailedCards } from '../card-details/DetailedCard';
import { renderWithProviders } from '../../test/testUtils';
import Cards from './Cards';

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useParams: vi.fn(),
  };
});

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
  it('component should renders the specified number of cards', async () => {
    (useParams as MockedFunction<typeof useParams>).mockImplementation(() => {
      return { page: 'page=1' };
    });

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
    (useParams as MockedFunction<typeof useParams>).mockImplementation(() => {
      return { page: 'page=2' };
    });

    renderWithProviders(<Mocktest />);

    const header = await screen.findByRole('heading', {
      level: 2,
    });

    expect(header).toHaveTextContent(/Not found/);
  });

  it('should open a detailed card when clicking on a card', async () => {
    (useParams as MockedFunction<typeof useParams>).mockImplementation(() => {
      return { page: 'page=1' };
    });

    renderWithProviders(<Mocktest />);

    const card = await screen.findAllByTestId('people-card');

    expect(screen.queryByTestId('cardDetailsContainer')).toBeNull();
    await userEvent.click(card[0]);
    expect(
      await screen.findByTestId('cardDetailsContainer')
    ).toBeInTheDocument();
  });
});
