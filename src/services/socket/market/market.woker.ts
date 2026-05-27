import type { StockData } from "@/types";

self.onmessage = (e: MessageEvent) => {
  if (e.data.type !== "TICK_BATCH") return;

  const batch: Partial<StockData>[] = e.data.payload;

  // Với mỗi symbol, giữ lại item cuối cùng trong batch
  const latest = new Map<string, Partial<StockData>>();
  for (const tick of batch) {
    if (tick.symbol) {
      latest.set(tick.symbol, tick);
    }
  }

  self.postMessage({
    type: "BATCH_READY",
    payload: Array.from(latest.values()),
  });
};
