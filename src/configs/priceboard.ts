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
  {
    id: "symbol",
    field: "symbol",
    hide: false,
    label: "symbol",
  },
  {
    id: "ceil",
    field: "ceil",
    hide: false,
    label: "ceil",
  },
  {
    id: "ref",
    field: "ref",
    hide: false,
    label: "ref",
  },
  {
    id: "floor",
    field: "floor",
    hide: false,
    label: "floor",
  },
  {
    id: "buyPrice3",
    field: "buyPrice3",
    hide: false,
    label: "p3",
  },
  {
    id: "buyVol3",
    field: "buyVol3",
    hide: false,
    label: "vol3",
  },
  {
    id: "buyPrice2",
    field: "buyPrice2",
    hide: false,
    label: "p2",
  },
  {
    id: "buyVol2",
    field: "buyVol2",
    hide: false,
    label: "vol2",
  },
  {
    id: "buyPrice1",
    field: "buyPrice1",
    hide: false,
    label: "p1",
  },
  {
    id: "buyVol1",
    field: "buyVol1",
    hide: false,
    label: "vol1",
  },
  {
    id: "matchPrice",
    field: "matchPrice",
    hide: false,
    label: "price",
  },
  {
    id: "matchVol",
    field: "matchVol",
    hide: false,
    label: "vol",
  },
  {
    id: "change",
    field: "change",
    hide: false,
    label: "+/-",
  },
  {
    id: "changePct",
    field: "changePct",
    hide: false,
    label: "%",
  },
  {
    id: "sellPrice1",
    field: "sellPrice1",
    hide: false,
    label: "p1",
  },
  {
    id: "sellVol1",
    field: "sellVol1",
    hide: false,
    label: "vol1",
  },
  {
    id: "sellPrice2",
    field: "sellPrice2",
    hide: false,
    label: "p2",
  },
  {
    id: "sellVol2",
    field: "sellVol2",
    hide: false,
    label: "vol2",
  },
  {
    id: "sellPrice3",
    field: "sellPrice3",
    hide: false,
    label: "p3",
  },
  {
    id: "sellVol3",
    field: "sellVol3",
    hide: false,
    label: "vol3",
  },
  {
    id: "high",
    field: "high",
    hide: false,
    label: "High",
  },
  {
    id: "low",
    field: "low",
    hide: false,
    label: "Low",
  },
  {
    id: "totalVolume",
    field: "totalVolume",
    hide: false,
    label: "Total Volume",
  },
  {
    id: "nnBuy",
    field: "nnBuy",
    hide: false,
    label: "NN Buy",
  },
  {
    id: "nnSell",
    field: "nnSell",
    hide: false,
    label: "NN Sell",
  },
  {
    id: "nnRoom",
    field: "nnRoom",
    hide: false,
    label: "NN Room",
  },
];
