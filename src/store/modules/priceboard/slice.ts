import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PriceboardState } from "./types";
import type { StockData } from "@/types";

const initialState: PriceboardState = {
  scroll: false,
  export: false,
  stocks: {},
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

    snapshotStocks: (state, action: PayloadAction<StockData[]>) => {
      for (const { symbol, ...fields } of action.payload) {
        if (!state.stocks[symbol]) {
          state.stocks[symbol] = { symbol, ...fields } as StockData;
        } else {
          Object.assign(state.stocks[symbol], fields);
        }
      }
    },

    batchUpdateStocks: (state, action: PayloadAction<StockData[]>) => {
      for (const tick of action.payload) {
        if (!state.stocks[tick.symbol]) return;
        Object.assign(state.stocks[tick.symbol], tick);
      }
    },
  },
});

export const { setStartScroll, setExport, batchUpdateStocks, snapshotStocks } =
  priceboardSlice.actions;

export default priceboardSlice.reducer;
