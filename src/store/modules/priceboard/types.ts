import type { StockData } from "@/types";

export interface PriceboardState {
  scroll: boolean;
  export: boolean;
  stocks: Record<string, StockData>;
  symbols: string[];

  stockDetail: StockData | null;
  symbolDetail: string | null;

  stockSearch: string;

  headerTableBaseConfig: HeaderTableBaseConfig[];
}

export type HeaderTableBaseConfig = {
  index: number;
  label: string;
  field: string;
  hide: boolean;
};
