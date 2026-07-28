import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderState } from "./types";

const initialState: OrderState = {
  openOrder: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOpenOrder: (state, action: PayloadAction<boolean>) => {
      state.openOrder = action.payload;
    },
  },
});

export const { setOpenOrder } = orderSlice.actions;

export default orderSlice.reducer;
