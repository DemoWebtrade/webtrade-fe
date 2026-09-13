import type { RootState } from "@/store";

export const selectOpenOrder = (state: RootState) => state.order.openOrder;
export const selectOpenFilter = (state: RootState) => state.order.openFilter;
export const selectLoadingCancelOrder = (state: RootState) =>
  state.order.loading.cancelOrder;
export const selectLoadingUpdateOrder = (state: RootState) =>
  state.order.loading.updateOrder;
export const selectLoadingPlaceOrder = (state: RootState) =>
  state.order.loading.placeOrder;
export const selectRefreshOrders = (state: RootState) =>
  state.order.refreshOrders;
