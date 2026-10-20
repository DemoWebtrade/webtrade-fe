import type { RootState } from "@/store";

export const selectProfile = (state: RootState) => state.client.profile;
export const selectLoadingProfile = (state: RootState) =>
  state.client.loading.profile;

export const selectLoadingUpdateProfile = (state: RootState) =>
  state.client.loading.updateProfile;

export const selectTypeUpdateProfile = (state: RootState) =>
  state.client.typeUpdateProfile;

export const selectListAccount = (state: RootState) => {
  return state.client.profile?.tradingAccounts || [];
};

export const selectBeneficiaries = (state: RootState) =>
  state.client.beneficiaries;
export const selectLoadingBeneficiaries = (state: RootState) =>
  state.client.loading.beneficiaries;

export const selectIsOpenAddAccountBen = (state: RootState) =>
  state.client.isOpenAddAccountBen;

export const selectLoadingAddAccountBen = (state: RootState) =>
  state.client.loading.addAccountBen;

export const selectIsOpenProfile = (state: RootState) =>
  state.client.isOpenProfile;
