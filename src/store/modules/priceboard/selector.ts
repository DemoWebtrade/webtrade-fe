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
  (symbols, stocks): StockData[] => symbols.map((s: string) => stocks[s]),
);

export const selectStockDetail = (state: RootState) =>
  state.priceboard.stockDetail;
export const selectSymbolDetail = (state: RootState) =>
  state.priceboard.symbolDetail;

export const selectHeaderTableBaseConfig = (state: RootState) =>
  state.priceboard.headerTableBaseConfig;

export const selectStockSearch = (state: RootState) =>
  state.priceboard.stockSearch;
