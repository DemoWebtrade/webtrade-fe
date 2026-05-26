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
  "cell-flash-up": "#00bf52",
  "cell-flash-down": "#f23645",
  "cell-flash-ceil": "#ff25ff",
  "cell-flash-floor": "#00b2ff",
  "cell-flash-ref": "#ffa300",
  "cell-flash-volume": "#5c5c5c",
};
