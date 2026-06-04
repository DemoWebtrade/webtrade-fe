import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./api";
import type { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  token: null,

  loading: {
    login: false,
  },

  error: {
    login: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading.login = true;
        state.error.login = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);

        state.loading.login = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading.login = false;
        state.error.login = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
