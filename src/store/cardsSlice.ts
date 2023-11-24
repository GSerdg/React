import { createSlice } from '@reduxjs/toolkit';

export interface CardsState {
  cardsPerPageValue: number;
  currentPage: number | undefined;
}

const initialState: CardsState = {
  cardsPerPageValue: 10,
  currentPage: 1,
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardsPerPage: (state, action) => {
      state.cardsPerPageValue = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCardsPerPage, setCurrentPage } = cardsSlice.actions;
export default cardsSlice.reducer;
