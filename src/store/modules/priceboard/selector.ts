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

export const selectAllStocks = createSelector(selectStocksMap, (stocks) =>
  Object.values(stocks),
);
export const makeSelectStock = (symbol: string) =>
  createSelector(selectStocksMap, (stocks) => stocks[symbol]);

const selectPriceboard = (state: RootState) => state.priceboard;

export const selectStockList = createSelector(
  (state: RootState) => state.priceboard.stocks,
  (state: RootState) => state.priceboard.symbols,
  (stocks: Record<string, StockData>, symbols: string[]): StockData[] =>
    symbols.map((s) => stocks[s]),
);

export const selectStock = (symbol: string) =>
  createSelector(
    selectPriceboard,
    ({ stocks }): StockData | undefined => stocks[symbol],
  );
