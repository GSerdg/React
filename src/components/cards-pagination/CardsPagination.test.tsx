import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import CardsPagination from './CardsPagination';
import { InputContext } from '../../pages/home/Home';

const setInputValue = vi.fn();
const inputValue = 'A';

const setupMyTest = () => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <>Navigated from Start</>,
      },
      {
        path: '/page=3',
        element: (
          <InputContext.Provider value={{ inputValue, setInputValue }}>
            <CardsPagination
              currentPage={3}
              isNextPage={true}
              isPrevPage={true}
              isLoading={false}
            />
          </InputContext.Provider>
        ),
      },
    ],
    {
      initialEntries: ['/page=3'],
      initialIndex: 0,
    }
  );

  render(<RouterProvider router={router} />);

  return { router };
};

describe('Cards pagination', () => {
  it('click next button', async () => {
    const { router } = setupMyTest();

    expect(router.state.location.pathname).toEqual('/page=3');

    const nextBtn = screen.getByTestId('next');

    userEvent.click(nextBtn);
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/search=A&page=4');
    });
  });

  it('click prev button', async () => {
    const { router } = setupMyTest();

    expect(router.state.location.pathname).toEqual('/page=3');

    const prevBtn = screen.getByTestId('prev');

    userEvent.click(prevBtn);
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/search=A&page=2');
    });
  });
});
