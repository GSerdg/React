import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './test/testUtils';

const Mocktest = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe('App', () => {
  it('Should renders', () => {
    renderWithProviders(<Mocktest />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('React APP');
  });
});
