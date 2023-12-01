import { createSlice } from '@reduxjs/toolkit';

/* export interface FormState {
  form: FormUncontrolledState[];
} */
export interface FormUncontrolledState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'femail';
  accept: true;
  country: string;
}

const initialState: FormUncontrolledState[] = [];

export const formUncontrolledSlice = createSlice({
  name: 'formUncontrolled',
  initialState,
  reducers: {
    setFormUncontrolledData: (state, action) => {
      console.log(state);
      console.log(action);
      state = [...state, action.payload];
      console.log(state);
    },
  },
});

export const { setFormUncontrolledData } = formUncontrolledSlice.actions;
export default formUncontrolledSlice.reducer;
