import { describe, expect, it } from 'vitest';
import inputReducer, { setInputValue } from './inputSlice';
import cardsReducer, { setCardsPerPage } from './cardsSlice';
import apiReducer, {
  setIsFetchingCards,
  setIsFetchingDetailed,
} from './apiSlice';

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
    });
  });

  it('should add new cardsPerPageValue width setCardsPerPage action', () => {
    const action = { type: setCardsPerPage.type, payload: 5 };
    const result = cardsReducer({ cardsPerPageValue: 10 }, action);
    expect(result.cardsPerPageValue).toBe(5);
  });
});

describe('Api slice', () => {
  it('should return default state width empty action', () => {
    const result = apiReducer(undefined, { type: '' });

    expect(result).toEqual({
      isFetchingCards: false,
      isFetchingDetailed: false,
    });
  });

  it('should add new isFetching value width action', () => {
    const action1 = { type: setIsFetchingCards.type, payload: true };
    const result1 = apiReducer(
      {
        isFetchingCards: false,
        isFetchingDetailed: false,
      },
      action1
    );
    expect(result1.isFetchingCards).toBe(true);

    const action2 = { type: setIsFetchingDetailed.type, payload: true };
    const result2 = apiReducer(
      {
        isFetchingCards: false,
        isFetchingDetailed: false,
      },
      action2
    );
    expect(result2.isFetchingDetailed).toBe(true);
  });
});
