import type { RootState } from "@/store";
import type { StockData } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectScroll = (state: RootState) => state.priceboard.scroll;
export const selectExport = (state: RootState) => state.priceboard.export;

export const selectStocksMap = (state: RootState) => state.priceboard.stocks;
export const selectSymbols = (state: RootState) => state.priceboard.symbols;

export const selectRowData = createSelector(
  selectSymbols,
  selectStocksMap,
  (symbols, stocks): StockData[] => symbols.map((s) => stocks[s]),
);

export const selectHeaderTableBaseConfig = (state: RootState) =>
  state.priceboard.headerTableBaseConfig;
