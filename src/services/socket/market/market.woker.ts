import type { StockData } from "@/types";

self.onmessage = (e) => {
  if (e.data.type !== "TICK_BATCH") return;

  const batch: StockData[] = e.data.payload;

  //Lấy phần tử cuosi cùng của stock
  const lastest = new Map<string, StockData>();

  for (const tick of batch) {
    lastest.set(tick.symbol, tick);
  }

  self.postMessage({
    type: "BATCH_READY",
    payload: Array.from(lastest.values()),
  });
};
