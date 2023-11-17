import { createSlice } from '@reduxjs/toolkit';

export interface ApiState {
  isFetchingCards: boolean;
  isFetchingDetailed: boolean;
}

const initialState: ApiState = {
  isFetchingCards: false,
  isFetchingDetailed: false,
};

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setIsFetchingCards: (state, action) => {
      state.isFetchingCards = action.payload;
    },
    setIsFetchingDetailed: (state, action) => {
      state.isFetchingDetailed = action.payload;
    },
  },
});

export const { setIsFetchingCards, setIsFetchingDetailed } = apiSlice.actions;
export default apiSlice.reducer;
