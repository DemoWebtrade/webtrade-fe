import type { RootState } from "@/store";

export const selectMarketStatus = (state: RootState) =>
  state.socket.marketStatus;

export const selectLatency = (state: RootState) => state.socket.latency;
