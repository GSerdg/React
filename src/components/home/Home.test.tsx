import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';

import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import ErrorBoundary from '../../components/error-boundary/ErrorBoundary';
import { renderWithProviders } from '../../test/testUtils';

const Mocktest = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    </BrowserRouter>
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
