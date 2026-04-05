import type { RootState } from "@/store";

export const selectScroll = (state: RootState) => state.client.scroll;
