import { MockedFunction, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { BrowserRouter, useParams } from 'react-router-dom';
import { DetailedCards } from './DetailedCard';
// import navigateToPage from '../../shared/navigate';
// import { responseById } from '../../test/mockData';
import { renderWithProviders } from '../../test/testUtils';

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useOutletContext: () => ({
      isCloseDetailed: false,
      currentPage: 1,
    }),
    useParams: vi.fn(),
  };
});

// vi.mock('../api/people');
// vi.mock('../../shared/navigate');

const Mocktest = () => {
  return (
    <BrowserRouter>
      <DetailedCards />
    </BrowserRouter>
  );
};

describe('Detailed Card', () => {
  /*  beforeEach(() => {
    responseById;
  }); */

  it('Should view loading', async () => {
    /*     (
      PeopleService.getPeopleById as MockedFunction<
        typeof PeopleService.getPeopleById
      >
    ).mockResolvedValue(responseById.data);

    */
    (useParams as MockedFunction<typeof useParams>).mockImplementation(() => {
      return { cardId: '4' };
    });
    //render(<Mocktest />);
    renderWithProviders(<Mocktest />);
    screen.debug();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('detailed-card')).toBeNull();

    const detailedCard = await screen.findByTestId('detailed-card');
    screen.debug();

    expect(screen.queryByText('Loading...')).toBeNull();
    expect(detailedCard).toBeInTheDocument();
  });

  /*   it('Should close detailed card', async () => {
    (
      PeopleService.getPeopleById as MockedFunction<
        typeof PeopleService.getPeopleById
      >
    ).mockResolvedValue(responseById.data);

    navigateToPage as MockedFunction<typeof navigateToPage>;

    (useParams as MockedFunction<typeof useParams>).mockImplementation(() => {
      return { cardId: '4' };
    });

    render(<Mocktest />);

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

    (
      PeopleService.getPeopleById as MockedFunction<
        typeof PeopleService.getPeopleById
      >
    ).mockResolvedValue(responseById.data);

    (useParams as MockedFunction<typeof useParams>).mockImplementation(() => {
      return { cardId: '4' };
    });

    render(<Mocktest />);

    const detailedCard = await screen.findByTestId('detailed-card');
    expect(detailedCard).toBeInTheDocument;

    cardData.map((item, index) => {
      expect(
        screen.getByText(new RegExp(dataTitle[index] + ': ' + item))
      ).toBeInTheDocument();
    });
  });

  it('Should fetch detailed information', async () => {
    (
      PeopleService.getPeopleById as MockedFunction<
        typeof PeopleService.getPeopleById
      >
    ).mockResolvedValue(responseById.data);
    navigateToPage as MockedFunction<typeof navigateToPage>;

    (useParams as MockedFunction<typeof useParams>).mockImplementation(() => {
      return { cardId: '4' };
    });

    render(<Mocktest />);

    const detailedCard = await screen.findByTestId('detailed-card');
    expect(detailedCard).toBeInTheDocument;
    expect(PeopleService.getPeopleById).toHaveBeenCalledTimes(4);
  });
 */
});
