import type { RootState } from "@/store";
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
