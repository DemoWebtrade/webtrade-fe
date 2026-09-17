import i18n from "@/lib/i18n";
import apiClient from "@/services/api/apiClient";
import { getMessageFromError } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AssetSummary } from "./types";

export const assetSummaryThunk = createAsyncThunk(
  "portfolio/summary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/portfolio/summary");
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return res.data.data as AssetSummary;
    } catch (error: unknown) {
      const message = getMessageFromError(error);
      return rejectWithValue(message);
    }
  },
);
