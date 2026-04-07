import type { RootState } from "@/store";

export const selectScroll = (state: RootState) => state.priceboard.scroll;
export const selectExport = (state: RootState) => state.priceboard.export;
