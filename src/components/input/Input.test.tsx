import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';
import { renderWithProviders } from '@/test/testUtils';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createMockRouter from '@/test/mockRouter';
import { NextRouter } from 'next/router';

const Mocktest = () => {
  return (
    <RouterContext.Provider
      value={
        createMockRouter({ query: { searchParams: 'page=1' } }) as NextRouter
      }
    >
      <Input />
    </RouterContext.Provider>
  );
};

describe('Input', () => {
  it('should change value in form', async () => {
    renderWithProviders(<Mocktest />);

    await userEvent.type(screen.getByTestId('inputField'), 'Ann');
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('inputField')).toHaveValue('Ann');

    await userEvent.clear(screen.getByTestId('inputField'));
    await userEvent.type(screen.getByTestId('inputField'), 'An');
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('inputField')).toHaveValue('An');
  });
});
