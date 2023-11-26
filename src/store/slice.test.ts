import { describe, expect, it } from 'vitest';
import inputReducer, { setInputValue } from './inputSlice';
import cardsReducer, { setCardsPerPage } from './cardsSlice';

describe('Input slice', () => {
  it('should return default state width empty action', () => {
    const result = inputReducer(undefined, { type: '' });
    expect(result).toEqual({ inputValue: '' });
  });

  it('should add new inputValue item width setInputValue action', () => {
    const action = { type: setInputValue.type, payload: 'Luke' };
    const result = inputReducer({ inputValue: '' }, action);
    expect(result.inputValue).toBe('Luke');
  });
});

describe('Cards slice', () => {
  it('should return default state width empty action', () => {
    const result = cardsReducer(undefined, { type: '' });
    expect(result).toEqual({
      cardsPerPageValue: 10,
      currentPage: 1,
    });
  });

  it('should add new cardsPerPageValue width setCardsPerPage action', () => {
    const action = { type: setCardsPerPage.type, payload: 5 };
    const result = cardsReducer(
      { cardsPerPageValue: 10, currentPage: 1 },
      action
    );
    expect(result.cardsPerPageValue).toBe(5);
  });
});
