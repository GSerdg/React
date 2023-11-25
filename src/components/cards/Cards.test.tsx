import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { renderWithProviders } from '@/test/testUtils';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createMockRouter from '@/test/mockRouter';
import { NextRouter } from 'next/router';
import Cards from './Cards';

const Mocktest = () => {
  return (
    <RouterContext.Provider
      value={
        createMockRouter({ query: { searchParams: 'page=1' } }) as NextRouter
      }
    >
      <Cards />
    </RouterContext.Provider>
  );
};

describe('Get cards', () => {
  it('component should renders the specified number of cards', async () => {
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
    renderWithProviders(
      <RouterContext.Provider
        value={
          createMockRouter({ query: { searchParams: 'page=2' } }) as NextRouter
        }
      >
        <Cards />
      </RouterContext.Provider>
    );

    const header = await screen.findByRole('heading', {
      level: 2,
    });

    expect(header).toHaveTextContent(/Not found/);
  });

  // it('should open a detailed card when clicking on a card', async () => {
  //   renderWithProviders(<Mocktest1 />);

  //   const card = await screen.findAllByTestId('people-card');

  //   expect(screen.queryByTestId('cardDetailsContainer')).toBeNull();
  //   await userEvent.click(card[0]);
  //   expect(vi.fn()).toHaveBeenCalled();
  //   // expect(
  //   //   await screen.findByTestId('cardDetailsContainer')
  //   // ).toBeInTheDocument();
  // });
});
