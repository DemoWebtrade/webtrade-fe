import i18n from "@/lib/i18n";
import apiClient from "@/services/api/apiClient";
import { getMessageFromError } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginPayload, RegisterPayload, User } from "./types";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (action: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/auth/login", action);

      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }

      return res.data.data as { token: string; user: User };
    } catch (error: unknown) {
      const message = getMessageFromError(error);
      return rejectWithValue(message);
    }
  },
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (action: RegisterPayload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/auth/register", action);
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return res.data.data as { token: string; user: User };
    } catch (error: unknown) {
      const message = getMessageFromError(error);
      return rejectWithValue(message);
    }
  },
);
