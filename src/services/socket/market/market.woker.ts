import type { StockData } from "@/types";

let buffer = new Map<string, Partial<StockData>>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;

const flush = () => {
  if (buffer.size === 0) return;

  self.postMessage({
    type: "BATCH_READY",
    payload: Array.from(buffer.values()),
  });

  buffer = new Map();
  flushTimer = null;
};

self.onmessage = (
  e: MessageEvent<{ type: string; payload: Partial<StockData> }>,
) => {
  if (e.data.type !== "TICK_BATCH") return;

  const tick = e.data.payload;

  if (!tick.symbol) return;

  const existing = buffer.get(tick.symbol);
  buffer.set(tick.symbol, existing ? { ...existing, ...tick } : tick);

  if (!flushTimer) {
    flushTimer = setTimeout(flush, 100);
  }
};
