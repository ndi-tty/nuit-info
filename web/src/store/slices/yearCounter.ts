import { createSlice } from "@reduxjs/toolkit";

export interface YearState {
  yearsCounter: number;
}

const initialState: YearState = {
  yearsCounter: 1980,
};

const yearsCounterSlice = createSlice({
  name: "yearCounter",
  initialState,
  reducers: {
    setCounter(state, action) {
      state.yearsCounter = action.payload;
    },
  },
});

export const { setCounter } = yearsCounterSlice.actions;

export default yearsCounterSlice.reducer;
