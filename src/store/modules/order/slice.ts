import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { orderCancelThunk, orderPlaceThunk, orderUpdateThunk } from "./api";
import type { OrderState } from "./types";

const initialState: OrderState = {
  openOrder: false,
  openFilter: false,

  refreshOrders: 0,

  loading: {
    placeOrder: false,
    updateOrder: false,
    cancelOrder: false,
  },

  error: {
    placeOrder: null,
    updateOrder: null,
    cancelOrder: null,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOpenOrder: (state, action: PayloadAction<boolean>) => {
      state.openOrder = action.payload;
    },

    setOpenFilter: (state, action: PayloadAction<boolean>) => {
      state.openFilter = action.payload;
    },

    consumeRefreshOrders: (state) => {
      state.refreshOrders = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderPlaceThunk.pending, (state) => {
        state.loading.placeOrder = true;
        state.error.placeOrder = null;
      })
      .addCase(orderPlaceThunk.fulfilled, (state) => {
        state.loading.placeOrder = false;
        state.refreshOrders += 1;
      })
      .addCase(orderPlaceThunk.rejected, (state, action) => {
        state.loading.placeOrder = false;
        state.error.placeOrder = action.payload as string;
      });

    builder
      .addCase(orderCancelThunk.pending, (state) => {
        state.loading.cancelOrder = true;
        state.error.cancelOrder = null;
      })
      .addCase(orderCancelThunk.fulfilled, (state) => {
        state.loading.cancelOrder = false;
      })
      .addCase(orderCancelThunk.rejected, (state, action) => {
        state.loading.cancelOrder = false;
        state.error.cancelOrder = action.payload as string;
      });

    builder
      .addCase(orderUpdateThunk.pending, (state) => {
        state.loading.updateOrder = true;
        state.error.updateOrder = null;
      })
      .addCase(orderUpdateThunk.fulfilled, (state) => {
        state.loading.updateOrder = false;
      })
      .addCase(orderUpdateThunk.rejected, (state, action) => {
        state.loading.updateOrder = false;
        state.error.updateOrder = action.payload as string;
      });
  },
});

export const { setOpenOrder, setOpenFilter, consumeRefreshOrders } =
  orderSlice.actions;

export default orderSlice.reducer;
