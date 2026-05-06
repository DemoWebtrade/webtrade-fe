import type { RootState } from "@/store";

export const selectMarketStatus = (state: RootState) =>
  state.socket.marketStatus;
