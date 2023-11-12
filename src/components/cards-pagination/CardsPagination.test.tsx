import { MockedFunction, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import CardsPagination from './CardsPagination';
import navigateToPage from '../../shared/navigate';

vi.mock('../../shared/navigate');

const Mocktest = () => {
  return (
    <BrowserRouter>
      <CardsPagination
        currentPage={3}
        isNextPage={true}
        isPrevPage={true}
        isLoading={false}
      />
    </BrowserRouter>
  );
};

describe('Cards pagination', () => {
  it('render 2 button', () => {
    render(<Mocktest />);

    const button = screen.getAllByRole('button');

    expect(button.length).toBe(2);
    expect(button[0]).toHaveTextContent('<<');
    expect(button[1]).toHaveTextContent('>>');
  });

  it('Change URL Address', () => {
    navigateToPage as MockedFunction<typeof navigateToPage>;

    render(<Mocktest />);

    const nextBtn = screen.getByTestId('next');
    const prevBtn = screen.getByTestId('prev');

    fireEvent.click(nextBtn);
    expect(navigateToPage).toHaveBeenCalledTimes(1);
    fireEvent.click(nextBtn);
    expect(navigateToPage).toHaveBeenCalledTimes(2);
    fireEvent.click(prevBtn);
    expect(navigateToPage).toHaveBeenCalledTimes(3);
  });
});
