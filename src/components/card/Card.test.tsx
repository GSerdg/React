import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { BrowserRouter } from 'react-router-dom';

const Mocktest = () => {
  return (
    <BrowserRouter>
      <Card
        cardData={{
          birth_year: '112BBY',
          created: '2014-12-10T15:10:51.357000Z',
          edited: '2014-12-20T21:17:50.309000Z',
          eye_color: 'yellow',
          films: [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
            'https://swapi.dev/api/films/3/',
          ],
          gender: 'n/a',
          hair_color: 'n/a',
          height: '167',
          homeworld: 'https://swapi.dev/api/planets/1/',
          mass: '75',
          name: 'C-3PO',
          skin_color: 'gold',
          species: ['https://swapi.dev/api/species/2/'],
          starships: [],
          url: 'https://swapi.dev/api/people/2/',
          vehicles: [],
        }}
        setIsCloseDetailed={vi.fn()}
      />
    </BrowserRouter>
  );
};

describe('Card component', () => {
  it('View all data title', () => {
    render(<Mocktest />);

    expect(screen.getByRole('heading')).toHaveTextContent('C-3PO');
    expect(screen.getByText(/gender: n\/a/)).toBeInTheDocument();
    expect(screen.getByText(/birth year: 112BBY/)).toBeInTheDocument();
  });
});
