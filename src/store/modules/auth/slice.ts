import { createSlice } from "@reduxjs/toolkit";
import {
  getBeneficiariesThunk,
  getProfileThunk,
  loginThunk,
  registerThunk,
  updateProfileThunk,
} from "./api";
import type { AuthState } from "./types";

const initialState: AuthState = {
  isLogin: false,

  user: null,
  token: localStorage.getItem("token") || null,
  registerData: null,

  profile: null,

  typeUpdateProfile: null,

  beneficiaries: null,

  isOpenAddAccountBen: false,

  loading: {
    login: false,
    register: false,
    profile: false,
    updateProfile: false,
    beneficiaries: false,
  },

  error: {
    login: null,
    register: null,
    profile: null,
    updateProfile: null,
    beneficiaries: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },

    setRegisterData(state, action) {
      state.registerData = action.payload;
    },

    setTypeUpdateProfile(state, action) {
      state.typeUpdateProfile = action.payload;
    },

    setIsOpenAddAccountBen(state, action) {
      state.isOpenAddAccountBen = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading.login = true;
        state.error.login = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading.login = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading.login = false;
        state.error.login = action.payload as string;
      });

    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading.register = true;
        state.error.register = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading.register = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading.register = false;
        state.error.register = action.payload as string;
      });

    builder
      .addCase(getProfileThunk.pending, (state) => {
        state.loading.profile = true;
        state.error.profile = null;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.loading.profile = false;
        state.profile = action.payload;
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.loading.profile = false;
        state.error.profile = action.payload as string;
      });

    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading.updateProfile = true;
        state.error.updateProfile = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading.updateProfile = false;
        state.profile = action.payload;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading.updateProfile = false;
        state.error.updateProfile = action.payload as string;
      });

    builder
      .addCase(getBeneficiariesThunk.pending, (state) => {
        state.loading.beneficiaries = true;
        state.error.beneficiaries = null;
      })
      .addCase(getBeneficiariesThunk.fulfilled, (state, action) => {
        state.loading.beneficiaries = false;
        state.beneficiaries = action.payload;
      })
      .addCase(getBeneficiariesThunk.rejected, (state, action) => {
        state.loading.beneficiaries = false;
        state.error.beneficiaries = action.payload as string;
      });
  },
});

export const {
  logout,
  setRegisterData,
  setIsLogin,
  setTypeUpdateProfile,
  setIsOpenAddAccountBen,
} = authSlice.actions;

export default authSlice.reducer;
