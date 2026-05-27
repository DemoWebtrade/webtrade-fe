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

  if (comparePrice === ceil) return { color: "#ff25ff" };
  if (comparePrice === floor) return { color: "#00b2ff" };
  if (comparePrice > ref) return { color: "#00ff00" };
  if (comparePrice < ref) return { color: "#ff3737" };
  if (comparePrice === ref) return { color: "#ffd900" };

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
  "cell-flash-up": "#00ff00",
  "cell-flash-down": "#ff3737",
  "cell-flash-ceil": "#ff25ff",
  "cell-flash-floor": "#00b2ff",
  "cell-flash-ref": "#ffd900",
  "cell-flash-volume": "#565759",
};
