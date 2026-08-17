import type { RootState } from "@/store";

export const selectTabMenu = (state: RootState) => state.common.tabMenu;

export const selectOpenMenu = (state: RootState) => state.common.isOpenMenu;
