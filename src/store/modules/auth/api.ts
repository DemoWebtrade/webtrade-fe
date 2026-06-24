import i18n from "@/lib/i18n";
import apiClient from "@/services/api/apiClient";
import { getMessageFromError } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AddBenAccountPayload,
  Beneficiari,
  LoginPayload,
  Profile,
  RegisterPayload,
  UpdateProfilePayload,
  User,
} from "./types";

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

export const getProfileThunk = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/auth/profile");
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return res.data.data as Profile;
    } catch (error: unknown) {
      const message = getMessageFromError(error);
      return rejectWithValue(message);
    }
  },
);

export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async (action: UpdateProfilePayload, { rejectWithValue }) => {
    try {
      const res = await apiClient.put("/auth/profile", action);
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return res.data.data as Profile;
    } catch (error: unknown) {
      const message = getMessageFromError(error);
      return rejectWithValue(message);
    }
  },
);

export const getBeneficiariesThunk = createAsyncThunk(
  "auth/getBeneficiaries",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/auth/beneficiaries");
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return res.data.data as Beneficiari[];
    } catch (error: unknown) {
      const message = getMessageFromError(error);
      return rejectWithValue(message);
    }
  },
);

export const createBeneficiariesThunk = createAsyncThunk(
  "auth/createBeneficiaries",
  async (action: AddBenAccountPayload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/auth/beneficiaries", action);
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return res.data.data as Beneficiari[];
    } catch (error: unknown) {
      const message = getMessageFromError(error);
      return rejectWithValue(message);
    }
  },
);

export const setDefaultBeneficiariesThunk = createAsyncThunk(
  "auth/setDefaultBeneficiaries",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(`/auth/beneficiaries/${id}/default`);
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return;
    } catch (error: unknown) {
      const message = getMessageFromError(error);
      return rejectWithValue(message);
    }
  },
);

export const deleteBeneficiariesThunk = createAsyncThunk(
  "auth/deleteBeneficiaries",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete(`/auth/beneficiaries/${id}`);
      if (res?.data?.code !== 1) {
        return rejectWithValue(res?.data?.message || i18n.t("api.error"));
      }
      return;
    } catch (error: unknown) {
      const message = getMessageFromError(error);
      return rejectWithValue(message);
    }
  },
);
