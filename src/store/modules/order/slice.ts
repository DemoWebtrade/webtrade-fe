import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderState } from "./types";

const initialState: OrderState = {
  openOrder: false,

  openFilter: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOpenOrder: (state, action: PayloadAction<boolean>) => {
      state.openOrder = action.payload;
    },

    setOpenFilter: (state, action: PayloadAction<boolean>) => {
      state.openFilter = action.payload;
    },
  },
});

export const { setOpenOrder, setOpenFilter } = orderSlice.actions;

export default orderSlice.reducer;
