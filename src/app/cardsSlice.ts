import { createSlice } from '@reduxjs/toolkit';
import { PeopleResult } from '../types/types';

export interface CardsState {
  cardsData: PeopleResult[] | undefined;
  cardsPerPageValue: number;
  // isNextPage: boolean;
  // isPrevPage: boolean;
}

const initialState: CardsState = {
  cardsData: undefined,
  cardsPerPageValue: 10,
  // isNextPage: true,
  // isPrevPage: false,
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardsData: (state, action) => {
      state.cardsData = action.payload;
    },
    setCardsPerPage: (state, action) => {
      state.cardsPerPageValue = action.payload;
    },
    /*     setIsNextPage: (state, action) => {
      state.isNextPage = action.payload;
    },
    setIsPrevPage: (state, action) => {
      state.isPrevPage = action.payload;
    },
 */
  },
});

export const { setCardsData, setCardsPerPage } = cardsSlice.actions;
export default cardsSlice.reducer;
