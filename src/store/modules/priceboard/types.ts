import type { StockData } from "@/types";

export interface PriceboardState {
  scroll: boolean;
  export: boolean;
  stocks: Record<string, StockData>;
}
