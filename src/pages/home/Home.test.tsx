import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

const Mocktest = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

describe('Home', () => {
  it('Have 2 buttons, form', () => {
    // ARRANGE
    render(<Mocktest />);

    const button = screen.getAllByRole('button');
    // ACT
    // EXPECT
    expect(button.length).toBe(2);
    expect(button[0]).toHaveTextContent('Error');
    expect(button[1]).toHaveAttribute('value', 'Find');
  });

  it('Have text input', () => {
    // ARRANGE
    render(<Mocktest />);

    const input = document.body.querySelector('.finder');
    // ACT
    // EXPECT
    expect(input).toBeInTheDocument();
  });
});
