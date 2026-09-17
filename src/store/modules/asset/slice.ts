import { createSlice } from "@reduxjs/toolkit";
import { assetSummaryThunk } from "./api";
import type { AssetState } from "./types";

const initialState: AssetState = {
  assetSummary: null,
  loading: {
    assetSummary: false,
  },
  error: {
    assetSummary: null,
  },
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(assetSummaryThunk.pending, (state) => {
        state.loading.assetSummary = true;
      })
      .addCase(assetSummaryThunk.fulfilled, (state, action) => {
        state.loading.assetSummary = false;
        state.assetSummary = action.payload;
      })
      .addCase(assetSummaryThunk.rejected, (state, action) => {
        state.loading.assetSummary = false;
        state.error.assetSummary = action.payload as string;
      });
  },
});

export default assetSlice.reducer;
