import type { RootState } from "@/store";
import type { StockData } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectScroll = (state: RootState) => state.priceboard.scroll;
export const selectExport = (state: RootState) => state.priceboard.export;

export const selectStocksMap = (state: RootState) => {
  return state.priceboard.stocks;
};
export const selectAllStocks = createSelector(selectStocksMap, (stocks) =>
  Object.values(stocks),
);
export const makeSelectStock = (symbol: string) =>
  createSelector(selectStocksMap, (stocks) => stocks[symbol]);

const selectPriceboard = (state: RootState) => state.priceboard;

export const selectStockList = createSelector(
  selectPriceboard,
  ({ stocks, symbols }): StockData[] =>
    symbols.map((sym) => stocks[sym]).filter(Boolean) as StockData[],
);

export const selectStock = (symbol: string) =>
  createSelector(
    selectPriceboard,
    ({ stocks }): StockData | undefined => stocks[symbol],
  );
