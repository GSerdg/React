import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { InputContext } from '../../pages/home/Home';
import Input from './Input';
import { useState } from 'react';

const Mocktest = () => {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('inputValue') || ''
  );
  return (
    <BrowserRouter>
      <InputContext.Provider value={{ inputValue, setInputValue }}>
        <Input searchInput={false} />
      </InputContext.Provider>
    </BrowserRouter>
  );
};

describe('Input', () => {
  it('should set value in localStorage', async () => {
    render(<Mocktest />);

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

    render(<Mocktest />);

    expect(screen.getByTestId('inputField')).toHaveAttribute('value', 'Bob');
  });
});
