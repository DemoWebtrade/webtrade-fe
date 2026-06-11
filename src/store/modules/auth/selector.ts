import type { RootState } from "@/store";

export const selectIsLogin = (state: RootState) => state.auth.isLogin;

export const selectUser = (state: RootState) => state.auth.user;
export const selectLoadingLogin = (state: RootState) =>
  state.auth.loading.login;
export const selectErrorLogin = (state: RootState) => state.auth.error.login;

export const selectToken = (state: RootState) => state.auth.token;

export const selectRegisterData = (state: RootState) => state.auth.registerData;
export const selectLoadingRegister = (state: RootState) =>
  state.auth.loading.register;

export const selectProfile = (state: RootState) => state.auth.profile;
export const selectLoadingProfile = (state: RootState) =>
  state.auth.loading.profile;
