import type { OrderRow } from "@/features/order/order-history/Table";
import i18n from "@/lib/i18n";
import apiClient from "@/services/api/apiClient";
import { getMessageFromError } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  PlaceOrderInput,
  PlaceOrderResponse,
  UpdateOrderPayload,
} from "./types";

export const orderPlaceThunk = createAsyncThunk(
  "/orders",
  async (action: PlaceOrderInput, { rejectWithValue, signal }) => {
    try {
      const res = await apiClient.post("/orders", action, { signal });
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return res.data.data as PlaceOrderResponse;
    } catch (error: unknown) {
      const message = getMessageFromError(error);
      return rejectWithValue(message);
    }
  },
);

export const getOrdersThunk = createAsyncThunk(
  "/orders",
  async (_, { rejectWithValue, signal }) => {
    try {
      const res = await apiClient.get("/orders", { signal });
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return res.data.data as PlaceOrderResponse[];
    } catch (error: unknown) {
      const message = getMessageFromError(error);
      return rejectWithValue(message);
    }
  },
);

export const orderCancelThunk = createAsyncThunk(
  "orders/cancel",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(`/orders/${orderId}/cancel`, {
        orderId: orderId,
      });
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return orderId;
    } catch (error: unknown) {
      return rejectWithValue(getMessageFromError(error));
    }
  },
);

export const orderUpdateThunk = createAsyncThunk(
  "orders/update",
  async (payload: UpdateOrderPayload, { rejectWithValue }) => {
    try {
      const { id, ...body } = payload;
      const res = await apiClient.patch(`/orders/${id}`, body);
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return res.data.data as OrderRow;
    } catch (error: unknown) {
      return rejectWithValue(getMessageFromError(error));
    }
  },
);
