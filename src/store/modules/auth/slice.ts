import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "./api";
import type { AuthState } from "./types";

const initialState: AuthState = {
  isLogin: false,

  user: null,
  token: localStorage.getItem("token") || null,
  registerData: null,

  loading: {
    login: false,
    register: false,
  },

  error: {
    login: null,
    register: null,
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
  },
});

export const { logout, setRegisterData, setIsLogin } = authSlice.actions;

export default authSlice.reducer;
