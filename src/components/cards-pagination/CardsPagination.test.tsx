import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardsPagination from './CardsPagination';
import { renderWithProviders } from '../../test/testUtils';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createMockRouter from '@/test/mockRouter';
import { NextRouter } from 'next/router';

describe('Cards pagination', () => {
  it('should change the URL address then click next button', async () => {
    const router = createMockRouter({
      query: { searchParams: 'page=3' },
    }) as NextRouter;

    renderWithProviders(
      <RouterContext.Provider value={router}>
        <CardsPagination isNextPage={true} isPrevPage={true} currentPage={3} />
      </RouterContext.Provider>
    );

    const nextBtn = await screen.findByTestId('next');

    await userEvent.click(nextBtn);
    expect(router.push).toHaveBeenCalledWith('/page=4');
  });

  it('should change the URL address then click prev button', async () => {
    const router = createMockRouter({
      query: { searchParams: 'page=3' },
    }) as NextRouter;

    renderWithProviders(
      <RouterContext.Provider value={router}>
        <CardsPagination isNextPage={true} isPrevPage={true} currentPage={3} />
      </RouterContext.Provider>
    );

    const prevBtn = await screen.findByTestId('prev');

    await userEvent.click(prevBtn);
    expect(router.push).toHaveBeenCalledWith('/page=2');
  });
});
