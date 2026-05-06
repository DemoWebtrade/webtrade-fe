import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SocketState } from "./types";

const initialState: SocketState = {
  marketStatus: "",
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setMarketStatus: (state, action: PayloadAction<string>) => {
      state.marketStatus = action.payload;
    },
  },
});

export const { setMarketStatus } = socketSlice.actions;

export default socketSlice.reducer;
