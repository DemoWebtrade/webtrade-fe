import { store } from "@/store";
import {
  batchUpdateStocks,
  clearStocks,
  snapshotStocks,
} from "@/store/modules/priceboard/slice";
import { setLatency, setMarketStatus } from "@/store/modules/socket/slice";
import type { StockData } from "@/types";
import { io, type Socket } from "socket.io-client";

const MARKET_SOCKET_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_MARKET_SOCKET_URL
    : "http://localhost:5001/market";

const marketWorker = new Worker(new URL("./market.woker.ts", import.meta.url), {
  type: "module",
});

marketWorker.onmessage = (e: MessageEvent) => {
  if (e.data.type !== "BATCH_READY") return;
  store.dispatch(batchUpdateStocks(e.data.payload));
};

let socket: Socket | null = null;
let latencyInterval: ReturnType<typeof setInterval> | null = null;
const pendingSubscriptions: string[] = [];
const pendingListeners = new Map<string, (data: unknown) => void>();

let pingFailCount = 0;

const MAX_PING_FAIL = 3; // 3 lần ping liên tiếp thất bại -> reconnect
const PING_INTERVAL = 5000; // đo mỗi 5s
const PING_TIMEOUT = 3000; // chờ tối đa 3s mỗi lần ping

// ── Latency ───────────────────────────────────────────────────────────────────

// Thêm hàm tryReconnect
let reconnectAttempt = 0;
const MAX_RECONNECT = 5;

const tryReconnect = () => {
  if (reconnectAttempt >= MAX_RECONNECT) {
    console.error("[Socket] Đã thử đủ lần, dừng kết nối lại");
    store.dispatch(setMarketStatus("failed"));
    store.dispatch(setLatency(null));
    reconnectAttempt = 0;
    return;
  }

  reconnectAttempt++;
  const delay = Math.min(1000 * reconnectAttempt, 5000); // tăng dần: 1s, 2s, 3s...
  console.log(
    `[Socket] Reconnect lần ${reconnectAttempt}/${MAX_RECONNECT} sau ${delay}ms`,
  );
  store.dispatch(setMarketStatus("reconnecting"));

  setTimeout(() => {
    if (socket?.connected) {
      reconnectAttempt = 0;
      startLatencyMeasure();
      return;
    }

    socket?.connect();

    const checkConnected = setTimeout(() => {
      if (!socket?.connected) {
        tryReconnect(); // thử lại
      }
    }, 3000);

    socket?.once("connect", () => {
      clearTimeout(checkConnected);
      reconnectAttempt = 0;
    });
  }, delay);
};

const startLatencyMeasure = () => {
  stopLatencyMeasure();
  pingFailCount = 0;

  const measure = () => {
    if (!socket?.connected) return;

    const start = performance.now();

    socket.timeout(PING_TIMEOUT).emit("latency_ping", (err: Error | null) => {
      const ms = Math.round(performance.now() - start);

      if (err) {
        pingFailCount++;
        console.warn(
          `[Latency] Ping thất bại (${pingFailCount}/${MAX_PING_FAIL})`,
        );

        if (pingFailCount >= MAX_PING_FAIL) {
          console.warn("[Latency] Quá nhiều lần thất bại → thử reconnect");
          stopLatencyMeasure();
          tryReconnect();
        }
        return;
      }

      pingFailCount = 0;
      store.dispatch(setLatency(ms));
    });
  };

  measure();
  latencyInterval = setInterval(measure, PING_INTERVAL);
};

const stopLatencyMeasure = () => {
  if (latencyInterval) {
    clearInterval(latencyInterval);
    latencyInterval = null;
  }
  store.dispatch(setLatency(null));
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const flushPending = () => {
  while (pendingSubscriptions.length > 0) {
    socket!.emit("subscribe", pendingSubscriptions.shift()!);
  }
  pendingListeners.forEach((cb, event) => socket!.on(event, cb));
};

// ── Core ──────────────────────────────────────────────────────────────────────

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
    startLatencyMeasure();
  });

  socket.on("disconnect", () => {
    store.dispatch(setMarketStatus("disconnected"));
    stopLatencyMeasure();
  });

  socket.io.on("reconnect", () => {
    store.dispatch(setMarketStatus("reconnect"));
    flushPending();
    startLatencyMeasure();
  });

  socket.on("connect_error", () => {
    store.dispatch(setMarketStatus("connect_error"));
    stopLatencyMeasure();
  });

  socket.on("marketUpdate", (data: Partial<StockData>) => {
    marketWorker.postMessage({ type: "TICK_BATCH", payload: data });
  });

  socket.on("marketSnapshot", (data: StockData[]) => {
    store.dispatch(snapshotStocks(data));
  });

  socket.connect();
  return socket;
};

const send = <T = unknown>(eventName: string, data: T): boolean => {
  if (!socket?.connected) {
    console.warn(
      `[Socket] Không thể gửi "${eventName}" vì socket chưa kết nối`,
    );
    return false;
  }

  try {
    const payload =
      typeof data === "object" && data !== null ? JSON.stringify(data) : data;
    socket.emit(eventName, payload);
    return true;
  } catch (error) {
    console.error(`[Socket] Lỗi khi gửi ${eventName}:`, error);
    return false;
  }
};

const close = () => {
  stopLatencyMeasure();
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

const unsubscribe = (topic: string) => {
  socket?.emit("unsubscribe", topic);
};

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
  send,
};
