import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Home from '@/components/home/Home';
import { userEvent } from '@testing-library/user-event';
import { renderWithProviders } from '../../test/testUtils';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createMockRouter from '@/test/mockRouter';
import { NextRouter } from 'next/router';
import ErrorBoundary from '@/components/error-boundary/ErrorBoundary';

const Mocktest = () => {
  return (
    <>
      <RouterContext.Provider
        value={
          createMockRouter({ query: { searchParams: 'page=1' } }) as NextRouter
        }
      >
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </RouterContext.Provider>
    </>
  );
};

describe('Home', () => {
  it('Have 2 buttons, form', () => {
    renderWithProviders(<Mocktest />);

    const button = screen.getAllByRole('button');

    expect(button.length).toBe(2);
    expect(button[0]).toHaveTextContent('Error');
    expect(button[1]).toHaveAttribute('value', 'Find');
  });

  it('Should have search input', () => {
    renderWithProviders(<Mocktest />);

    const input = screen.getByTestId('inputField');

    expect(input).toBeInTheDocument();
  });

  it('Should throw error', async () => {
    renderWithProviders(<Mocktest />);

    const button = screen.getByText(/Error/);
    await userEvent.click(button);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent(/Ohh Error!!!/);
  });
});
