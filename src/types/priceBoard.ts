export interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}

export interface StockData {
  symbol: string;
  ceil: number;
  ref: number;
  floor: number;
  buyPrice1: number;
  buyVol1: number;
  buyPrice2: number;
  buyVol2: number;
  buyPrice3: number;
  buyVol3: number;
  matchPrice: number;
  matchVol: number;
  change: number;
  changePct: number;
  sellPrice1: number;
  sellVol1: number;
  sellPrice2: number;
  sellVol2: number;
  sellPrice3: number;
  sellVol3: number;
  high: number;
  low: number;
  totalVolume: number;
  nnBuy: number;
  nnSell: number;
  nnRoom: number;
}

export type StockListItem = {
  isin?: string;
  exchange: string;
  code: string;
  name: string;
  symbol: string;
  fullName: string;
  clientName: string;
  clientNameEn: string;
  type: string;
  keywords: string[];

  [key: string]: string | string[] | number | boolean | undefined | null;
};
