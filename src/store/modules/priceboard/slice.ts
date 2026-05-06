import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PriceboardState } from "./types";

const initialState: PriceboardState = {
  scroll: false,
  export: false,
};

const priceboardSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setStartScroll: (state, action: PayloadAction<boolean>) => {
      state.scroll = action.payload;
    },
    setExport: (state, action: PayloadAction<boolean>) => {
      state.export = action.payload;
    },
  },
});

export const { setStartScroll, setExport } = priceboardSlice.actions;

export default priceboardSlice.reducer;
