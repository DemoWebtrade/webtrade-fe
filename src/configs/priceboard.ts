import type { CellClassParams, CellStyle } from "ag-grid-community";

interface RowData {
  ceil: number;
  ref: number;
  floor: number;
  [key: string]: number;
}
export const coloredCellStyle = (
  params: CellClassParams<RowData, number>,
): CellStyle => {
  if (params.value == null || params.data == null) return {};

  let comparePrice: number | undefined;

  const NO_COLOR_COLS = ["totalVolume", "nnBuy", "nnSell", "nnRoom"];
  if (params.colDef?.field && NO_COLOR_COLS.includes(params.colDef.field)) {
    return {};
  }

  switch (params.colDef?.field) {
    case "buyVol3":
    case "buyPrice3":
      comparePrice = params.data.buyPrice3;
      break;
    case "buyVol2":
    case "buyPrice2":
      comparePrice = params.data.buyPrice2;
      break;
    case "buyVol1":
    case "buyPrice1":
      comparePrice = params.data.buyPrice1;
      break;
    case "sellVol1":
    case "sellPrice1":
      comparePrice = params.data.sellPrice1;
      break;
    case "sellVol2":
    case "sellPrice2":
      comparePrice = params.data.sellPrice2;
      break;
    case "sellVol3":
    case "sellPrice3":
      comparePrice = params.data.sellPrice3;
      break;
    case "matchVol":
    case "matchPrice":
    case "changePct":
    case "change":
    case "symbol":
      comparePrice = params.data.matchPrice;
      break;
    default:
      comparePrice = params.value;
      break;
  }

  if (comparePrice == null) return {};

  const { ref, ceil, floor } = params.data;

  if (comparePrice === ceil) return { color: "var(--purple-base)" };
  if (comparePrice === floor) return { color: "var(--blue-base)" };
  if (comparePrice > ref) return { color: "var(--green-base)" };
  if (comparePrice < ref) return { color: "var(--red-base)" };
  if (comparePrice === ref) return { color: "var(--yellow-base)" };

  return {};
};

export const PRICE_COLS = [
  "buyPrice3",
  "buyPrice2",
  "buyPrice1",
  "sellPrice1",
  "sellPrice2",
  "sellPrice3",
  "matchPrice",
  "change",
  "changePct",
  "symbol",
  "high",
  "low",
];

export const VOL_PRICE_COLS = [
  "buyVol3",
  "buyVol2",
  "buyVol1",
  "sellVol1",
  "sellVol2",
  "sellVol3",
  "matchVol",
];

export const VOL_COLS = ["totalVolume", "nnBuy", "nnSell", "nnRoom"];

export const VOL_TO_PRICE: Record<string, string> = {
  buyVol3: "buyPrice3",
  buyVol2: "buyPrice2",
  buyVol1: "buyPrice1",
  sellVol1: "sellPrice1",
  sellVol2: "sellPrice2",
  sellVol3: "sellPrice3",
  matchVol: "matchPrice",
};

export const FLASH_COLORS: Record<string, string> = {
  "cell-flash-up": "var(--green-active)",
  "cell-flash-down": "var(--red-active)",
  "cell-flash-ceil": "var(--purple-active)",
  "cell-flash-floor": "var(--blue-active)",
  "cell-flash-ref": "var(--yellow-active)",
  "cell-flash-volume": "var(--border-secondary)",
};

export const TEXT_COLORS: Record<string, string> = {
  "cell-flash-up": "var(--green-base)",
  "cell-flash-down": "var(--red-base)",
  "cell-flash-ceil": "var(--purple-base)",
  "cell-flash-floor": "var(--blue-base)",
  "cell-flash-ref": "var(--yellow-base)",
};

export const FLASH_CLASS_MAP: Record<string, string> = {
  "var(--green-active)": "cell-flashing-up",
  "var(--red-active)": "cell-flashing-down",
  "var(--purple-active)": "cell-flashing-ceil",
  "var(--blue-active)": "cell-flashing-floor",
  "var(--yellow-active)": "cell-flashing-ref",
  "var(--border-secondary)": "cell-flashing-volume",
};

export const HEADER_TABLE_BASE_CONFIG = [
  { index: 1, label: "symbol", field: "symbol", hide: false },
  { index: 2, label: "ceil", field: "ceil", hide: false },
  { index: 3, label: "ref", hide: false },
  { index: 4, label: "floor", field: "floor", hide: false },
  { index: 5, label: "p3", field: "buyPrice3", hide: false },
  { index: 6, label: "vol3", field: "buyVol3", hide: false },
  { index: 7, label: "p2", field: "buyPrice2", hide: false },
  { index: 8, label: "vol2", field: "buyVol2", hide: false },
  { index: 9, label: "p1", field: "buyPrice1", hide: false },
  { index: 10, label: "vol1", field: "buyVol1", hide: false },
  { index: 11, label: "price", field: "matchPrice", hide: false },
  { index: 12, label: "vol", field: "matchVol", hide: false },
  { index: 13, label: "+/-", field: "change", hide: false },
  { index: 14, label: "%", field: "changePct", hide: false },
  { index: 15, label: "p1", field: "sellPrice1", hide: false },
  { index: 16, label: "vol1", field: "sellVol1", hide: false },
  { index: 17, label: "p2", field: "sellPrice2", hide: false },
  { index: 18, label: "vol2", field: "sellVol2", hide: false },
  { index: 19, label: "p3", field: "sellPrice3", hide: false },
  { index: 20, label: "vol3", field: "sellVol3", hide: false },
  { index: 21, label: "high", field: "high", hide: false },
  { index: 22, label: "low", field: "low", hide: false },
  { index: 23, label: "total-vol", field: "totalVolume", hide: false },
  { index: 24, label: "fbuy", field: "nnBuy", hide: false },
  { index: 25, label: "fsell", field: "nnSell", hide: false },
  { index: 26, label: "room", field: "nnRoom", hide: false },
];
