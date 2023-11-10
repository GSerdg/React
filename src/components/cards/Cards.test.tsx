import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RenderRouteWithOutletContext } from '../../shared/RenderRouteOutlet';
import Cards from './Cards';

const mockOutletContext = {
  isLoading: false,
};

const Mocktest = () => {
  return (
    <RenderRouteWithOutletContext context={mockOutletContext}>
      <Cards />
    </RenderRouteWithOutletContext>
  );
};

describe('Cards component', () => {
  it('Render', () => {
    // ARRANGE
    render(<Mocktest />);
    // ACT
    // EXPECT
    expect(screen.getByRole('')).toBeInTheDocument();
  });
});
