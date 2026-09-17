import type { RootState } from "@/store";

export const selectAssetSummary = (state: RootState) =>
  state.asset.assetSummary;

export const selectLoadingAssetSummary = (state: RootState) =>
  state.asset.loading.assetSummary;
