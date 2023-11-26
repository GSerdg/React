import { MockedFunction, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DetailedCards } from './DetailedCard';
import navigateToPage from '../../shared/navigate';
import { renderWithProviders } from '../../test/testUtils';
import { responseById } from '../../test/mockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createMockRouter from '@/test/mockRouter';
import { NextRouter } from 'next/router';

vi.mock('../../shared/navigate');

const Mocktest = () => {
  return (
    <RouterContext.Provider
      value={createMockRouter({ query: { id: '4' } }) as NextRouter}
    >
      <DetailedCards />
    </RouterContext.Provider>
  );
};

describe('Detailed Card', () => {
  it('Should close detailed card', async () => {
    navigateToPage as MockedFunction<typeof navigateToPage>;

    renderWithProviders(<Mocktest />);

    const closeBtn = screen.getByRole('button');
    expect(closeBtn).toHaveTextContent('Close');

    await userEvent.click(closeBtn);

    expect(navigateToPage).toHaveBeenCalledTimes(1);
  });

  it('Should view card data', async () => {
    const dataTitle = [
      'gender',
      'birth year',
      'height',
      'eye color',
      'hair color',
      'mass',
      'skin color',
    ];

    const cardData = [
      responseById.data.gender,
      responseById.data.birth_year,
      responseById.data.height,
      responseById.data.eye_color,
      responseById.data.hair_color,
      responseById.data.mass,
      responseById.data.skin_color,
    ];

    renderWithProviders(<Mocktest />);

    const detailedCard = await screen.findByTestId('detailed-card');
    expect(detailedCard).toBeInTheDocument;

    cardData.map((item, index) => {
      expect(
        screen.getByText(new RegExp(dataTitle[index] + ': ' + item))
      ).toBeInTheDocument();
    });
  });

  it('Should fetch detailed information', async () => {
    renderWithProviders(<Mocktest />);

    const detailedCard = await screen.findByTestId('detailed-card');

    expect(detailedCard).toBeInTheDocument;
  });
});
