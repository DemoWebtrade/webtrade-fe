import { store } from "@/store";
import {
  batchUpdateStocks,
  clearStocks,
  snapshotStocks,
} from "@/store/modules/priceboard/slice";
import { setMarketStatus } from "@/store/modules/socket/slice";
import type { StockData } from "@/types";
import { io, type Socket } from "socket.io-client";

const MARKET_SOCKET_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_MARKET_SOCKET_URL
    : "http://localhost:5000/market";

const marketWorker = new Worker(new URL("./market.woker.ts", import.meta.url), {
  type: "module",
});

// Worker trả về Partial<StockData>[] đã dedupe
marketWorker.onmessage = (e: MessageEvent) => {
  if (e.data.type !== "BATCH_READY") return;

  store.dispatch(batchUpdateStocks(e.data.payload));
};

let socket: Socket | null = null;
const pendingSubscriptions: string[] = [];
const pendingListeners = new Map<string, (data: unknown) => void>();

const flushPending = () => {
  while (pendingSubscriptions.length > 0) {
    socket!.emit("subscribe", pendingSubscriptions.shift()!);
  }
  pendingListeners.forEach((cb, event) => socket!.on(event, cb));
};

const connect = () => {
  if (socket?.connected) return socket;

  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }

  socket = io(MARKET_SOCKET_URL, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  socket.on("connect", () => {
    store.dispatch(setMarketStatus("connected"));
    flushPending();
  });

  socket.on("disconnect", () => {
    store.dispatch(setMarketStatus("disconnected"));
  });

  socket.io.on("reconnect", () => {
    store.dispatch(setMarketStatus("reconnect"));
    flushPending();
  });

  socket.on("connect_error", () => {
    store.dispatch(setMarketStatus("connect_error"));
  });

  socket.on("marketUpdate", (data: Partial<StockData>) => {
    marketWorker.postMessage({ type: "TICK_BATCH", payload: data });
  });

  // ── marketSnapshot: nhận StockData[] đầy đủ ───────────────────────────
  socket.on("marketSnapshot", (data: StockData[]) => {
    store.dispatch(snapshotStocks(data));
  });

  socket.connect();
  return socket;
};

const close = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
  pendingListeners.clear();
  pendingSubscriptions.length = 0;
};

const subscribe = (topic: string) => {
  if (socket?.connected) {
    socket.emit("subscribe", topic);
    store.dispatch(clearStocks());
    return;
  }
  pendingSubscriptions.push(topic);
};

const unsubscribe = (topic: string) => socket?.emit("unsubscribe", topic);

const on = <T>(event: string, callback: (data: T) => void) => {
  if (socket?.connected) {
    socket.on(event, callback);
    return;
  }
  pendingListeners.set(event, callback as (data: unknown) => void);
};

const off = (event: string) => {
  pendingListeners.delete(event);
  socket?.off(event);
};

const getMarketSocket = () => socket;

export const MarketSocket = {
  connect,
  close,
  subscribe,
  unsubscribe,
  on,
  off,
  getMarketSocket,
};
