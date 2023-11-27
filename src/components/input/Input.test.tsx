import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Input from './Input';
import { renderWithProviders } from '../../test/testUtils';

const Mocktest = () => {
  return (
    <BrowserRouter>
      <Input />
    </BrowserRouter>
  );
};

describe('Input', () => {
  it('should set value in localStorage', async () => {
    renderWithProviders(<Mocktest />);

    expect(localStorage.getItem('inputValue')).toBe(null);

    await userEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('inputValue')).toBe('');

    await userEvent.type(screen.getByTestId('inputField'), 'A');
    await userEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('inputValue')).toBe('A');

    await userEvent.clear(screen.getByTestId('inputField'));
    await userEvent.type(screen.getByTestId('inputField'), 'An');
    await userEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('inputValue')).toBe('An');
  });

  it('should get value localStorage width mount', async () => {
    localStorage.setItem('inputValue', 'Bob');

    expect(localStorage.getItem('inputValue')).toBe('Bob');

    renderWithProviders(<Mocktest />);

    expect(screen.getByTestId('inputField')).toHaveAttribute('value', 'Bob');
  });
});
