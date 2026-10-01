import i18n from "@/lib/i18n";
import apiClient from "@/services/api/apiClient";
import type { IDatasource, IGetRowsParams } from "ag-grid-community";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function usePortfolio(filters: {
  userId?: string;
  page?: number;
  limit?: number;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const datasource = useMemo<IDatasource>(
    () => ({
      getRows: async (params: IGetRowsParams) => {
        const { startRow, endRow } = params;
        const limit = endRow - startRow;
        const page = Math.floor(startRow / limit) + 1;

        const isFirstPage = startRow === 0;
        if (isFirstPage) setIsLoading(true);

        try {
          const res = await apiClient.get("/portfolio", {
            params: {
              userId: filters.userId,
              page,
              limit,
            },
          });

          if (res?.data?.code !== 1) {
            toast.error(res?.data?.message || i18n.t("api.error"));
            params.failCallback();
            return;
          }

          const { items, total } = res.data.data;
          const lastRow = items.length < limit ? startRow + items.length : -1;

          params.successCallback(items, lastRow === -1 ? total : lastRow);
        } catch {
          toast.error(i18n.t("api.error"));
          params.failCallback();
        } finally {
          if (isFirstPage) setIsLoading(false);
        }
      },
    }),
    [filters.userId],
  );

  return { datasource, isLoading };
}
