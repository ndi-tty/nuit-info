import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import yearCounter from "./slices/yearCounter";

const store = configureStore({
  reducer: {
    yearCounter: yearCounter,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
