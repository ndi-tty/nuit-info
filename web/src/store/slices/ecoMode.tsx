import { createSlice } from "@reduxjs/toolkit";

export interface YearState {
  isEcoMode: boolean;
}

const initialState: YearState = {
  isEcoMode: false,
};

const ecoModeSlice = createSlice({
  name: "ecoMode",
  initialState,
  reducers: {
    setEcoMode(state, action) {
      state.isEcoMode = action.payload;
    },
  },
});

export const { setEcoMode } = ecoModeSlice.actions;

export default ecoModeSlice.reducer;
