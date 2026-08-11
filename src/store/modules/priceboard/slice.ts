import type { StockData } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { HeaderTableBaseConfig, PriceboardState } from "./types";

const initialState: PriceboardState = {
  scroll: false,
  export: false,

  stocks: {},
  symbols: [],

  stockDetail: null,
  symbolDetail: null,

  headerTableBaseConfig: JSON.parse(
    localStorage.getItem("headerTableBaseConfig") || "[]",
  ),
  stockSearch: "",
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

        if (state.stockDetail?.symbol === symbol) {
          Object.assign(state.stockDetail, partial);
        }
      }
    },

    // detail stock
    setSymbolStocksDetail(state, action: PayloadAction<string>) {
      state.symbolDetail = action.payload;
      if (state.symbols?.includes(action.payload))
        state.stockDetail = state.stocks[action.payload];
    },

    snapshotStockDetail(state, action: PayloadAction<StockData[]>) {
      state.stockDetail = action.payload?.[0];
    },

    batchUpdateStockDetail(state, action: PayloadAction<Partial<StockData>[]>) {
      if (
        !state.stockDetail ||
        state.symbols?.includes(state.stockDetail?.symbol)
      )
        return;

      const partial = action.payload.find(
        (p) => p.symbol === state.stockDetail?.symbol,
      );

      if (partial) {
        Object.assign(state.stockDetail, partial);
      }
    },

    clearStockDetail(state) {
      state.stockDetail = null;
      state.symbolDetail = null;
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

    setStockSearch(state, action: PayloadAction<string>) {
      state.stockSearch = action.payload;
    },
  },
});

export const {
  setStartScroll,
  setExport,
  batchUpdateStocks,
  snapshotStocks,
  clearStocks,
  setSymbolStocksDetail,
  snapshotStockDetail,
  batchUpdateStockDetail,
  clearStockDetail,
  setHeaderTableBaseConfig,
  setStockSearch,
} = priceboardSlice.actions;

export default priceboardSlice.reducer;
