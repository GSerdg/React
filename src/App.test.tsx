import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

const Mocktest = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe('App', () => {
  it('Should renders', () => {
    render(<Mocktest />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('React APP');
  });
});
