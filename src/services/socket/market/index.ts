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
    console.log("on", event);

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
    console.log("connect");
    flushPending();
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });

  socket.on("reconnect", () => {
    console.log("reconnect");
    flushPending(); // re-register listeners sau reconnect
  });

  socket.on("connect_error", () => {
    console.log("connect_error");
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
