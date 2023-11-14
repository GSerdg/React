import { createSlice } from '@reduxjs/toolkit';

export interface CardsPerPageState {
  cardsPerPageValue: number;
}

const initialState: CardsPerPageState = {
  cardsPerPageValue: 10,
};

export const cardsPerPageSlice = createSlice({
  name: 'cardsPerPage',
  initialState,
  reducers: {
    setCardsPerPage: (state, action) => {
      state.cardsPerPageValue = action.payload;
    },
  },
});

export const { setCardsPerPage } = cardsPerPageSlice.actions;
export default cardsPerPageSlice.reducer;
