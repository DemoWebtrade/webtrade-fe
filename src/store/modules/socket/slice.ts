import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SocketState } from "./types";

const initialState: SocketState = {
  marketStatus: "",
  latency: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setMarketStatus: (state, action: PayloadAction<string>) => {
      state.marketStatus = action.payload;
    },
    setLatency: (state, action: PayloadAction<number | null>) => {
      state.latency = action.payload;
    },
  },
});

export const { setMarketStatus, setLatency } = socketSlice.actions;

export default socketSlice.reducer;
