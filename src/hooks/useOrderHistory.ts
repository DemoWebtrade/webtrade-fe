import i18n from "@/lib/i18n";
import apiClient from "@/services/api/apiClient";
import type { IDatasource, IGetRowsParams } from "ag-grid-community";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function useOrderHistory(filters: {
  userId?: string;
  symbol?: string;
  status?: string;
  side?: "buy" | "sell" | "all";
  page?: number;
  limit?: number;
}) {
  const [isLoading, setIsLoading] = useState(false);

  console.log("test");

  const datasource = useMemo<IDatasource>(
    () => ({
      getRows: async (params: IGetRowsParams) => {
        const { startRow, endRow } = params;
        const limit = endRow - startRow;
        const page = Math.floor(startRow / limit) + 1;

        const isFirstPage = startRow === 0;
        if (isFirstPage) setIsLoading(true);

        try {
          const res = await apiClient.get("/orders", {
            params: {
              userId: filters.userId,
              status: filters.status,
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
    [filters.userId, filters.status],
  );

  return { datasource, isLoading };
}
