import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import CardsPagination from './CardsPagination';
import { renderWithProviders } from '../../test/testUtils';

const setupMyTest = () => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <>Navigated from Start</>,
      },
      {
        path: '/:page',
        element: (
          <CardsPagination
            currentPage={3}
            isNextPage={true}
            isPrevPage={true}
          />
        ),
      },
    ],
    {
      initialEntries: ['/page=3'],
      initialIndex: 0,
    }
  );

  renderWithProviders(<RouterProvider router={router} />);

  return { router };
};

describe('Cards pagination', () => {
  it('should change the URL address then click next button', async () => {
    const { router } = setupMyTest();

    expect(router.state.location.pathname).toEqual('/page=3');

    const nextBtn = screen.getByTestId('next');

    userEvent.click(nextBtn);
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/page=4');
    });
  });

  it('should change the URL address then click prev button', async () => {
    const { router } = setupMyTest();

    expect(router.state.location.pathname).toEqual('/page=3');

    const prevBtn = screen.getByTestId('prev');

    userEvent.click(prevBtn);
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/page=2');
    });
  });
});
