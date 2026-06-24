import type { StockData } from "@/types";

export interface PriceboardState {
  scroll: boolean;
  export: boolean;
  stocks: Record<string, StockData>;
  symbols: string[];

  headerTableBaseConfig: HeaderTableBaseConfig[];
}

export type HeaderTableBaseConfig = {
  id: string;
  field: string;
  hide: boolean;
  label: string;
};
