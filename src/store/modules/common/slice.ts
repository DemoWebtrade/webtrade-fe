import { createSlice } from "@reduxjs/toolkit";
import type { CommonState } from "./types";

const innitState: CommonState = {
  tabMenu: "BOARD",

  isOpenMenu: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: innitState,
  reducers: {
    setTabMenu(state, action) {
      state.tabMenu = action.payload;
    },

    setIsOpenMenu(state, action) {
      state.isOpenMenu = action.payload;
    },
  },
});

export const { setTabMenu, setIsOpenMenu } = commonSlice.actions;

export default commonSlice.reducer;
