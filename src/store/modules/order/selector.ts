import type { RootState } from "@/store";

export const selectOpenOrder = (state: RootState) => state.order.openOrder;
