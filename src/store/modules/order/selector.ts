import type { RootState } from "@/store";

export const selectOpenOrder = (state: RootState) => state.order.openOrder;
export const selectOpenFilter = (state: RootState) => state.order.openFilter;
