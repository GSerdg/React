import { createSlice } from '@reduxjs/toolkit';

export interface FormState {
  value: FormObjectState[];
}
export interface FormObjectState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'femail';
  accept: true;
  image: string;
  country: string;
}

const initialState: FormState = {
  value: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
