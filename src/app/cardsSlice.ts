import { createSlice } from '@reduxjs/toolkit';

export interface CardsState {
  cardsPerPageValue: number;
}

const initialState: CardsState = {
  cardsPerPageValue: 10,
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardsPerPage: (state, action) => {
      state.cardsPerPageValue = action.payload;
    },
  },
});

export const { setCardsPerPage } = cardsSlice.actions;
export default cardsSlice.reducer;
