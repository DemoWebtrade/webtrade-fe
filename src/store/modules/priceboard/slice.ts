import type { StockData } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { HeaderTableBaseConfig, PriceboardState } from "./types";

const initialState: PriceboardState = {
  scroll: false,
  export: false,
  stocks: {},
  symbols: [],
  headerTableBaseConfig: JSON.parse(
    localStorage.getItem("headerTableBaseConfig") || "[]",
  ),
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

    clearStocks(state) {
      state.stocks = {};
      state.symbols = [];
    },

    snapshotStocks(state, action: PayloadAction<StockData[]>) {
      const stocks: Record<string, StockData> = {};
      const symbols: string[] = [];

      for (const row of action.payload) {
        stocks[row.symbol] = row;
        symbols.push(row.symbol);
      }

      state.stocks = stocks;
      state.symbols = symbols;
    },

    batchUpdateStocks(state, action: PayloadAction<Partial<StockData>[]>) {
      for (const partial of action.payload) {
        const { symbol } = partial;
        if (!symbol || !state.stocks[symbol]) continue;

        Object.assign(state.stocks[symbol], partial);
      }
    },

    setHeaderTableBaseConfig(
      state,
      action: PayloadAction<HeaderTableBaseConfig[]>,
    ) {
      state.headerTableBaseConfig = action.payload;
      localStorage.setItem(
        "headerTableBaseConfig",
        JSON.stringify(action.payload),
      );
    },
  },
});

export const {
  setStartScroll,
  setExport,
  batchUpdateStocks,
  snapshotStocks,
  clearStocks,
  setHeaderTableBaseConfig,
} = priceboardSlice.actions;

export default priceboardSlice.reducer;
