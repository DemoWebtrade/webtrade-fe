import { store } from "@/store";
import { setMarketStatus } from "@/store/modules/socket/slice";
import { io, Socket } from "socket.io-client";

const MARKET_SOCKET_URL = import.meta.env.VITE_MARKET_SOCKET_URL;

let socket: Socket | null = null;
const pendingSubscriptions: string[] = [];
const pendingListeners: Map<string, (data: unknown) => void> = new Map();

const flushPending = () => {
  // Flush emit events
  while (pendingSubscriptions.length > 0) {
    const event = pendingSubscriptions.shift()!;
    socket!.emit(event);
  }

  // Flush listeners
  pendingListeners.forEach((callback, event) => {
    socket!.on(event, callback);
  });
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
    console.log("disconnect");
  });

  socket.on("reconnect", () => {
    store.dispatch(setMarketStatus("reconnect"));

    flushPending(); // re-register listeners sau reconnect
  });

  socket.on("connect_error", () => {
    console.log("connect_error");
    store.dispatch(setMarketStatus("connect_error"));
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
    console.log("sub");

    socket.emit("subscribe", topic);
    return;
  }
  pendingSubscriptions.push(topic);
};

const unsubscribe = (topic: string) => {
  socket?.emit("unsubscribe", topic);
};

const on = <T>(event: string, callback: (data: T) => void): void => {
  if (socket?.connected) {
    socket.on(event, callback);
    return;
  }

  pendingListeners.set(event, callback as (data: unknown) => void);
};

const off = (event: string): void => {
  pendingListeners.delete(event);
  socket?.off(event);
};

const getMarketSocket = (): Socket | null => socket;

export const MarketSocket = {
  connect,
  close,
  subscribe,
  unsubscribe,
  on,
  off,
  getMarketSocket,
};
