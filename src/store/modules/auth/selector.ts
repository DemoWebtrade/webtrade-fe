import type { RootState } from "@/store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectLoadingLogin = (state: RootState) =>
  state.auth.loading.login;
export const selectErrorLogin = (state: RootState) => state.auth.error.login;

export const selectToken = (state: RootState) => state.auth.token;
