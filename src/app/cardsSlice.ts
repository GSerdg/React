import { createSlice } from '@reduxjs/toolkit';
import { PeopleResult } from '../types/types';

export interface CardsState {
  cardsData: PeopleResult[] | undefined;
  cardsPerPageValue: number;
}

const initialState: CardsState = {
  cardsData: undefined,
  cardsPerPageValue: 10,
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
  },
});

export const { setCardsData, setCardsPerPage } = cardsSlice.actions;
export default cardsSlice.reducer;
