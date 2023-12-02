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

export const formUncontrolledSlice = createSlice({
  name: 'formUncontrolled',
  initialState,
  reducers: {
    setFormUncontrolledData: (state, action) => {
      console.log(action.payload);
      state.value.push(action.payload);
    },
  },
});

export const { setFormUncontrolledData } = formUncontrolledSlice.actions;
export default formUncontrolledSlice.reducer;
