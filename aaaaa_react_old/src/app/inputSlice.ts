import { createSlice } from '@reduxjs/toolkit';

export interface InputState {
  inputValue: string;
}

const initialState: InputState = {
  inputValue: localStorage.getItem('inputValue') || '',
};

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});

export const { setInputValue } = inputSlice.actions;
export default inputSlice.reducer;
