import { createSlice } from '@reduxjs/toolkit';

export interface FormUncontrolledState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'femail';
  accept: true;
  country: string;
}

const initialState: FormUncontrolledState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: 'male',
  accept: true,
  country: '',
};

export const formUncontrolledSlice = createSlice({
  name: 'formUncontrolled',
  initialState,
  reducers: {
    setFormUncontrolledData: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setFormUncontrolledData } = formUncontrolledSlice.actions;
export default formUncontrolledSlice.reducer;
