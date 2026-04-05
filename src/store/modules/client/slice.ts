import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ClientState } from "./types";

const initialState: ClientState = {
  scroll: false,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setStartScroll: (state, action: PayloadAction<boolean>) => {
      state.scroll = action.payload;
    },
  },
});

export const { setStartScroll } = clientSlice.actions;

export default clientSlice.reducer;
