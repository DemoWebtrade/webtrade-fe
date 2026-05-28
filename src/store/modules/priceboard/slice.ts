import type { StockData } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PriceboardState } from "./types";

const initialState: PriceboardState = {
  scroll: false,
  export: false,
  stocks: {},
  symbols: [],
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
        if (!symbol) continue;

        const existing = state.stocks[symbol];
        if (!existing) continue; // chưa có snapshot thì bỏ qua

        // Merge: chỉ overwrite field nào thực sự có trong partial
        state.stocks[symbol] = { ...existing, ...partial };
      }
    },
  },
});

export const {
  setStartScroll,
  setExport,
  batchUpdateStocks,
  snapshotStocks,
  clearStocks,
} = priceboardSlice.actions;

export default priceboardSlice.reducer;
