import type { StockData } from "@/types";

export interface PriceboardState {
  scroll: boolean;
  export: boolean;
  stocks: Record<string, StockData>;
  symbols: string[];

  headerTableBaseConfig: HeaderTableBaseConfig[];
}

export type HeaderTableBaseConfig = {
  index: number;
  label: string;
  field: string;
  hide: boolean;
};
