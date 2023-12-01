import { createSlice } from '@reduxjs/toolkit';
import { countriesArray } from '../shared/countries';

export interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries: countriesArray,
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountry: (state, action) => {
      state.countries = action.payload;
    },
  },
});

// export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
